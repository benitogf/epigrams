<template>
  <div class="vue-quill">
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
import GrammarlyInline from '@/lib/quill/formats/GrammarlyInline'
import { ImageDrop } from '@/lib/quill/formats/image-drop'
import wh from '@/lib/C137'

export default {
  model: {
    prop: 'content'
  },
  props: {
    content: {},
    formats: {
      type: Array,
      default () {
        return []
      }
    },
    keyBindings: {
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
      defaultConfig: {
        modules: {
          imageDrop: true,
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ]
        },
        theme: 'snow'
      }
    }
  },
  async mounted () {
    // const key = ['public', this.$el.id]
    await wh.hub.upsert('public', 'public')
    if (this.keyBindings.length) {
      this.defaultConfig.modules.keyboard = {
        bindings: this.keyBindings.map((binding) => {
          if (binding.remove) return false
          return {
            key: binding.key,
            metaKey: true,
            handler: binding.method.bind(this)
          }
        })
      }
    }

    Quill.register(GrammarlyInline)
    Quill.register('modules/imageDrop', ImageDrop)
    this.editor = new Quill(this.$refs.quill, _.defaultsDeep(this.config, this.defaultConfig))

    if (this.content && this.content !== '') {
      if (this.output !== 'delta') {
        this.editor.pasteHTML(this.content)
      } else {
        this.editor.setContents(this.content)
      }
    } else {
      let content = ''
      try {
        content = await wh.item.get(this.$el.id)
        this.editor.setContents(content.data)
      } catch (e) {
        this.editor.setContents('')
      }
    }

    this.editor.on('text-change', async (delta, source) => {
      this.$emit('text-change', this.editor, delta, source)
      try {
        let data = {
          name: this.$el.id,
          data: this.editor.getContents()
        }
        await wh.item.set(data)
      } catch (e) {
        console.log(e)
      }
      this.$emit('input', this.output !== 'delta' ? this.editor.root.innerHTML : this.editor.getContents())
    })

    this.editor.on('selection-change', (range) => {
      this.$emit('selection-change', this.editor, range)
    })
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
      // this.editor.setSelection(this.editor.getLength() - 1, this.editor.getLength())
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-quill {
  height: inherit;
}
</style>
