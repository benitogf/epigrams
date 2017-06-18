// @flow
import jsonpack from 'jsonpack'
import aes from 'browserify-aes'
import createHash from 'sha.js'
import lz from 'lz-string'

const session = {
  setKeyword (keyword, key, cb) {
    let comp = jsonpack.pack({
      id: key,
      keyword: keyword
    })
    let crypt = session.encrypt(comp, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
    window.sessionStorage.setItem('hub', crypt)
    if (cb) {
      cb()
    }
  },

  getHub () {
    let crypt = window.sessionStorage.getItem('hub')
    if (crypt) {
      let comp = session.decrypt(crypt, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
      let hub = jsonpack.unpack(comp)
      return hub.id
    } else {
      return false
    }
  },

  get () {
    let crypt = window.sessionStorage.getItem('hub')
    if (crypt) {
      let comp = session.decrypt(crypt, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
      let hub = jsonpack.unpack(comp)
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

  encrypt (txt, pwd) {
    try {
      let cipher = aes.createCipher('aes-256-cbc', pwd)
      let result = cipher.update(txt, 'utf8', 'base64')
      result += cipher.final('base64')
      return result
    } catch (e) {
      return false
    }
  },

  decrypt (enc, pwd) {
    try {
      let decipher = aes.createDecipher('aes-256-cbc', pwd)
      let result = decipher.update(enc, 'base64', 'utf8') + decipher.final('utf8')
      return result
    } catch (e) {
      return false
    }
  },

  compress (data) {
    return lz.compressToUTF16(jsonpack.pack(data))
  },

  uncompress (data) {
    return jsonpack.unpack(lz.decompressFromUTF16(data))
  },

  hash (key) {
    let sha = createHash('sha256')
    return sha.update(key, 'utf8').digest('hex')
  },

  pack (data, keyword) {
    return session.encrypt(session.compress(data), keyword)
  },

  unpack (data, keyword) {
    return session.uncompress(session.decrypt(data, keyword))
  }
}

export { session }
