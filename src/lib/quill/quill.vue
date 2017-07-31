<template>
  <div v-on:quill="reload" class="vue-quill">
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
import Vue from 'vue'
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
    },
    id: {
      type: String,
      default: 'root'
    }
  },
  data () {
    return {
      editor: {},
      status: '',
      defaultConfig: {
        modules: {
          imageDrop: true,
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code']
          ]
        },
        theme: 'snow'
      }
    }
  },
  watch: {
    async id () {
      Vue.nextTick(async () => {
        await this.reload()
      })
    }
  },
  async mounted () {
    Quill.register('modules/imageDrop', ImageDrop)
    this.editor = new Quill(this.$refs.quill,
      _.defaultsDeep(this.config, this.defaultConfig))
    await this.reload()
  },
  methods: {
    async reload () {
      loaderStart(this)
      await wh.hub.upsert('public', 'public') // init
      let label = this.id
      let delta = await wh.delta.get(label)
      let content = delta.content
      let images = delta.images
      if (content) {
        this.editor.setContents(content.data)
      } else {
        this.editor.setContents('')
      }
      await wh.delta.clean(label, images)
      loaderStop(this)
      let update = debounce(async (delta, source) => {
        loaderStart(this)
        try {
          let label = this.id
          let data = this.editor.getContents()
          let images = await wh.delta.set(label, data)
          wh.delta.update(label, images)
        } catch (e) {
          await wh.delta.set(label, { data: '' })
        }
        loaderStop(this)
      }, freq * 15)
      this.editor.on('text-change', update)
    },
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
.vue-quill {
  height: auto;
  min-height: 100%;
  padding: 50px;
  padding: 0;
  height: inherit;
  padding: 10px 0px;
  width: 100%;
  .ql-editor {
    font-size: 18px;
    overflow-y: auto;
    padding: 12px 15px 70px 15px !important;
  }
}
.status {
  &.active {
    background-color: black;
    color: white;
  }
  padding-top: 5px;
  position: fixed;
  top: 0;
  width: 60px;
  height: 37px;
  color: white;
  background-color: transparent;
  margin: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}
</style>
