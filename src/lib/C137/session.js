// @flow

import jsonpack from 'jsonpack'

const session = {
  async setKeyword (keyword, id) {
    let data = { keyword, id }
    let pack = await session.pack(data, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
    window.sessionStorage.setItem('hub', pack)
    return
  },

  async getHub () {
    let pack = window.sessionStorage.getItem('hub')
    if (pack) {
      let hub = await session.unpack(pack, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
      return hub.id
    } else {
      return false
    }
  },

  async get () {
    let pack = window.sessionStorage.getItem('hub')
    if (pack) {
      let hub = await session.unpack(pack, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
      return hub
    } else {
      return false
    }
  },

  clearKeyword (cb) {
    window.sessionStorage.removeItem('hub')
    if (cb) {
      cb()
    }
  },

  pack (data, password) {
    return session.execute('pack', data, password)
  },

  unpack (data, password) {
    return session.execute('unpack', data, password)
  },

  hash (data) {
    return session.execute('hash', data)
  },

  compress (data) {
    return jsonpack.pack(data)
  },

  uncompress (data) {
    return jsonpack.unpack(data)
  },

  execute (action, data, password) {
    return new Promise(function (resolve, reject) {
      let now = Date.now()
      let bounce = setTimeout(reject, 20000)
      window.sessionWorker.onmessage = (e) => {
        if (e.data.id === now) {
          delete window.sessionWorker.onmessage
          clearTimeout(bounce)
          resolve(e.data.result)
        }
      }
      window.sessionWorker.postMessage(session.compress({
        action,
        password,
        now,
        data
      }))
    })
  }
}

export { session }
