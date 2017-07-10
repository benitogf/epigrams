// @flow
import jsonpack from 'jsonpack'
import aes from 'browserify-aes'
import createHash from 'sha.js'
const session = {
  // dice (keys, data) {
  //   let exceed = data.length > 10000
  //   let step = exceed ? 10000 : data.length
  //   let ops = []
  //   let eos = false
  //   let i = 0
  //   let result = []
  //   while (!eos) {
  //     eos = (i + step) >= data.length
  //     let next = eos ? data.length : i + step
  //     ops.push(data.slice(i, next))
  //     i += step
  //   }
  //   ops.forEach((chunk, i) => {
  //     result.push({ id: keys.join(':') + ':' + i, data: chunk })
  //   })
  //   return result
  // },
  //
  // undice (query) {
  //   let result = []
  //   let sorted = query.map((chunk) => {
  //     return chunk.id
  //   })
  //   sorted.sort((a, b) => {
  //     return parseInt(a.split(':').pop()) - parseInt(b.split(':').pop())
  //   })
  //   sorted.forEach((id) => {
  //     query.forEach((chunk) => {
  //       if (chunk.id === id) {
  //         result.push(chunk.data)
  //       }
  //     })
  //   })
  //   return result.join()
  // },

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
    return jsonpack.pack(data)
  },

  uncompress (data) {
    return jsonpack.unpack(data)
  },

  hash (key) {
    let sha = createHash('sha256')
    return sha.update(key, 'utf8').digest('hex')
  },

  pack (data, keyword) {
    return session.encrypt(session.compress(data), keyword)
  },

  unpack (data, keyword) {
    let dec = session.decrypt(data, keyword)
    return session.uncompress(dec)
  }
}

global.onmessage = function (e) {
  var args = session.uncompress(e.data)
  var workerResult = null
  try {
    workerResult = session[args.action](args.data, args.password)
  } catch (e) {
    throw e
  }

  postMessage({ result: workerResult, id: args.now })
}
