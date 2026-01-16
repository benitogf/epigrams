import { registerSW } from 'virtual:pwa-register'

if (import.meta.env.PROD) {
  registerSW({
    onNeedRefresh() {
      console.log('New or updated content is available.')
      window.location.reload()
    },
    onOfflineReady() {
      console.log('Content is now available offline!')
    },
    onRegisteredSW(swUrl, r) {
      console.log('Service worker registered:', swUrl)
    },
    onRegisterError(error) {
      console.error('Error during service worker registration:', error)
    },
  })
}
