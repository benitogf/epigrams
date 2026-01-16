import 'fake-indexeddb/auto'
import jsonpack from 'jsonpack'
import aes from 'browserify-aes'
import createHash from 'sha.js'
import { beforeEach } from 'vitest'

const workerSession = {
  encrypt(txt, pwd) {
    try {
      let cipher = aes.createCipher('aes-256-cbc', pwd)
      let result = cipher.update(txt, 'utf8', 'base64')
      result += cipher.final('base64')
      return result
    } catch (e) {
      return false
    }
  },
  decrypt(enc, pwd) {
    try {
      let decipher = aes.createDecipher('aes-256-cbc', pwd)
      let result = decipher.update(enc, 'base64', 'utf8') + decipher.final('utf8')
      return result
    } catch (e) {
      return false
    }
  },
  compress(data) {
    return jsonpack.pack(data)
  },
  uncompress(data) {
    return jsonpack.unpack(data)
  },
  hash(key) {
    let sha = createHash('sha256')
    return sha.update(key, 'utf8').digest('hex')
  },
  pack(data, keyword) {
    return workerSession.encrypt(workerSession.compress(data), keyword)
  },
  unpack(data, keyword) {
    let dec = workerSession.decrypt(data, keyword)
    if (!dec) return false
    return workerSession.uncompress(dec)
  }
}

class MockWorker {
  constructor() {
    this.onmessage = null
  }
  postMessage(msg) {
    const args = workerSession.uncompress(msg)
    let workerResult = null
    try {
      workerResult = workerSession[args.action](args.data, args.password)
    } catch (e) {
      console.error('Worker error:', e)
    }
    const callback = this.onmessage
    if (callback) {
      Promise.resolve().then(() => {
        callback({ data: { result: workerResult, id: args.now } })
      })
    } else {
      console.error('MockWorker: onmessage not set, action:', args.action)
    }
  }
  terminate() {}
}

global.Worker = MockWorker

beforeEach(() => {
  window.sessionWorker = new MockWorker()
  window.sessionStorage.clear()
})
