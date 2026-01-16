import { useRef, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { ImageDrop } from '../lib/quill/formats/image-drop'
import wh from '../lib/C137'
import spinners from 'cli-spinners'

const freq = 80

Quill.register({
  'modules/imageDrop': ImageDrop
})

function debounce(inner, ms = 0) {
  let timer = null
  let resolves = []

  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      let result = inner(...args)
      resolves.forEach(r => r(result))
      resolves = []
    }, ms)

    return new Promise((resolve) => resolves.push(resolve))
  }
}

async function getDelta(label) {
  try {
    let id = await wh.session.hash(label)
    let content = await wh.item.get(id)
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

async function saveDelta(label, data) {
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
  await wh.item.set({ label, data })
  return images
}

async function updateTrash(label, images) {
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

async function clean(label, images) {
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

const printIcon = '<svg version="1.1" x="0px" y="0px" width="24px"height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g><g><g><path d="M19,8H5c-1.7,0-3,1.3-3,3v6h4v4h12v-4h4v-6C22,9.3,20.7,8,19,8z M16,19H8v-5h8V19z M19,12c-0.6,0-1-0.4-1-1s0.4-1,1-1c0.6,0,1,0.4,1,1S19.6,12,19,12z M18,3H6v4h12V3z" class="ql-fill"/></g><rect fill="none" width="24" height="24"/></g></g></svg>'

function QuillEditor({ id }) {
  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const loadingRef = useRef(null)
  const [status, setStatus] = useState('/')

  useEffect(() => {
    let mounted = true

    const loaderStart = () => {
      const loadSeq = spinners.dots12.frames
      let frame = 0
      if (!loadingRef.current) {
        loadingRef.current = setInterval(() => {
          if (mounted) {
            setStatus(loadSeq[frame])
            frame = frame < loadSeq.length - 1 ? frame + 1 : 0
          }
        }, freq)
      }
    }

    const loaderStop = () => {
      setTimeout(() => {
        if (loadingRef.current) {
          clearInterval(loadingRef.current)
          loadingRef.current = null
        }
        if (mounted) {
          setStatus('')
        }
      }, 600)
    }

    const initEditor = async () => {
      loaderStart()
      
      await wh.hub.upsert('public', 'public')
      
      const quill = new Quill(editorRef.current, {
        modules: {
          imageDrop: true,
          toolbar: {
            container: [
              [{ list: 'ordered' }, { list: 'bullet' }, { align: [false, 'center', 'right', 'justify'] }],
              ['bold', 'italic', 'underline'],
              ['image', 'print']
            ],
            handlers: {
              print() {
                window.print()
              }
            }
          }
        },
        theme: 'snow'
      })

      quillRef.current = quill

      const toolbarPrint = document.querySelectorAll('.ql-toolbar .ql-print')[0]
      if (toolbarPrint && toolbarPrint.innerHTML === '') {
        toolbarPrint.innerHTML = printIcon
      }

      const delta = await getDelta(id)
      const content = delta.content
      const images = delta.images || []

      if (content) {
        quill.setContents(content.data)
      } else {
        quill.setContents('')
      }

      await clean(id, images)
      loaderStop()

      const update = debounce(async () => {
        loaderStart()
        const data = quill.getContents()
        const savedImages = await saveDelta(id, data)
        updateTrash(id, savedImages)
        loaderStop()
      }, freq * 15)

      quill.on('text-change', update)
    }

    initEditor()

    return () => {
      mounted = false
      if (loadingRef.current) {
        clearInterval(loadingRef.current)
      }
    }
  }, [id])

  return (
    <div className="vue-quill">
      <h3 className={`status ${status !== '' ? 'active' : ''}`}>{status}</h3>
      <div ref={editorRef}></div>
    </div>
  )
}

export default QuillEditor
