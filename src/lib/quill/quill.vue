<template>
  <div class="vue-quill">
    <h3 class="status" v-bind:class="{
      active: status !== ''
    }">{{ status }}</h3>
    <div class="ui attached segment"
      ref="quill"
      @click.prevent="focusEditor">
    </div>
  </div>
</template>
<script>
// @flow
import _ from 'lodash'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { ImageDrop } from '@/lib/quill/formats/image-drop'
import wh from '@/lib/C137'
import spinners from 'cli-spinners'
const freq = 80

function loaderStart (self) {
  let loadSeq = spinners.dots12.frames
  let frame = 0
  if (!self.loading) {
    self.loading = setInterval(() => {
      self.status = loadSeq[frame]
      if (frame < loadSeq.length) {
        frame++
      } else {
        frame = 0
      }
    }, freq)
  }
  return self.loading
}

function loaderStop (self) {
  clearInterval(self.loading)
  self.status = ''
  self.loading = null
}

function debounce (inner, ms = 0) {
  let timer = null
  let resolves = []
  // https://stackoverflow.com/a/35228455

  return function (...args) {
    // Run the function after a certain amount of time
    clearTimeout(timer)
    timer = setTimeout(() => {
      // Get the result of the inner function, then apply it
      // to the resolve function of
      // each promise that has been created since the last
      // time the inner function was run
      let result = inner(...args)
      resolves.forEach(r => r(result))
      resolves = []
    }, ms)

    return new Promise((resolve) => resolves.push(resolve))
  }
}

async function getDelta (label) {
  try {
    let id = await wh.session.hash(label)
    let content = await wh.item.get(id) // read
    let index = 0
    var images = []
    for (let dt of content.data.ops) {
      let img = dt.insert.image
      if (img && img.indexOf('data:image') === -1) {
        let id = img
        images.push(id)
        let image
        try {
          image = await wh.item.get(id)
        } catch (e) {
          image = { data: '' }
        }
        content.data.ops[index].insert.image = image.data
      }
      index++
    }
    return { content, images }
  } catch (e) {
    return {}
  }
}

async function saveDelta (label, data) {
  let index = 0
  let images = []
  for (let dt of data.ops) {
    let img = dt.insert.image
    if (img && img.indexOf('data:image') === 0) {
      let id = await wh.session.hash(label + 'img' + img)
      try {
        await wh.item.create({ id, data: img })
        images.push(id)
        data.ops[index].insert.image = id
      } catch (e) {
        data.ops.slice(index, 1)
      }
    }
    index++
  }
  await wh.item.set({ label, data }) // write
  return images
}

async function updateTrash (label, images) {
  let store
  let trash
  try {
    let id = await wh.session.hash(label + ':images')
    store = await wh.item.get(id)
    trash = store.data.filter((nf) => images.indexOf(nf) === -1)
  } catch (e) {
    store = { data: images }
    trash = []
  }
  await wh.item.set({
    label: label + ':images',
    data: images.concat(trash)
  })
}

async function clean (label, images) {
  let id = await wh.session.hash(label + ':images')
  try {
    let trash = []
    let store = await wh.item.get(id)
    for (let img of store.data) {
      if (images.indexOf(img) === -1) {
        trash.push(img)
      }
    }
    await wh.item.delSome(trash)
    await wh.item.set({ id, data: images })
  } catch (e) {
    await wh.item.set({ id, data: [] })
  }
}

export default {
  props: {
    formats: {
      type: Array,
      default () {
        return []
      }
    },
    output: {
      default: 'delta'
    },
    config: {
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      editor: {},
      status: '/',
      defaultConfig: {
        modules: {
          imageDrop: true,
          toolbar: [
            [{ list: 'ordered' }, { list: 'bullet' }, { align: [false, 'center', 'right', 'justify'] }],
            ['bold', 'italic', 'underline'],
            ['image']
          ]
        },
        theme: 'snow'
      }
    }
  },
  async mounted () {
    loaderStart(this)
    await wh.hub.upsert('public', 'public') // init
    Quill.register('modules/imageDrop', ImageDrop)
    this.editor = new Quill(this.$refs.quill,
      _.defaultsDeep(this.config, this.defaultConfig))
    let label = this.$el.id
    let delta = await getDelta(label)
    let content = delta.content
    let images = delta.images
    if (content) {
      this.editor.setContents(content.data)
    } else {
      this.editor.setContents('')
    }
    await clean(label, images)
    loaderStop(this)
    let update = debounce(async (delta, source) => {
      loaderStart(this)
      let label = this.$el.id
      let data = this.editor.getContents()
      let images = await saveDelta(label, data)
      updateTrash(label, images)
      loaderStop(this)
    }, freq * 15)
    this.editor.on('text-change', update)
  },

  methods: {
    focusEditor (e) {
      if (e && e.srcElement) {
        let classList = e.srcElement.classList
        let isSegment = false
        classList.forEach((className) => {
          if (className === 'segment') {
            isSegment = true
            return
          }
        })

        if (!isSegment) return
      }

      this.editor.focus()
    }
  }
}
</script>

<style lang="scss">
@media print {
  p {
    orphans: 4;
  }
  .ql-toolbar, .ql-toolbar * {
    display: none !important;
  }
  .ql-container, .ql-editor {
    height: auto;
    overflow: hidden;
    page-break-inside: auto;
    page-break-after: always;
    white-space: pre-wrap;
  }
}
.vue-quill {
  height: auto;
  min-height: 100%;
  padding: 50px;
  padding: 0;
  height: inherit;
  .ql-toolbar {
    position: fixed;
    z-index: 4;
    width: 100%;
  }
  .ql-container {
    border: none;
    padding-top: 41px;
  }
  .ql-toolbar {
    border: none;
    box-shadow: 0px 1.6px 1.6px rgba(221, 221, 221, 0.71);
  }
  .ql-editor {
    font-size: 18px;
    overflow-y: scroll;
    padding: 12px 15px 70px 15px !important;
    &::-webkit-scrollbar-track {
      background-color: #FFFFFF;
    }

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #FFFFFF;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #EFEFEF;
    }
  }
}
.status {
  &.active {
    background-color: white;
    color: black;
  }
  padding-top: 5px;
  position: fixed;
  top: 0;
  width: 60px;
  height: 35px;
  color: white;
  background-color: transparent;
  margin: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}
</style>
