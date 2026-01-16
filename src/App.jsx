import { useState, useEffect } from 'react'
import QuillEditor from './components/QuillEditor.jsx'

function App() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div 
      className={`slide-fade-enter ${visible ? 'slide-fade-enter-active' : ''}`}
      style={{ height: '100%' }}
    >
      <QuillEditor id="wei" />
    </div>
  )
}

export default App
