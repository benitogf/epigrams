// @flow
const indexedDB = {
  _get: async function (keys) {
    let db = await this.__operate()
    let result = await db.items.where('id').equals(keys.join(':')).toArray()
    if (result[0]) {
      return result[0].data
    } else {
      throw new Error('GET_FAIL')
    }
  },
  _getAll: async function (keys) {
    let db = await this.__operate()
    let result = await db.items.filter(function (item) {
      return item.id.indexOf(keys.join(':') + ':') === 0
    }).toArray()
    if (result) {
      return result
    } else {
      throw new Error('GET_ALL_FAIL')
    }
  },
  _set: async function (keys, data) {
    let db = await this.__operate()
    return await db.items.put({ id: keys.join(':'), data: data })
  },
  _setMany: async function (data) {
    let db = await this.__operate()
    return await db.items.bulkPut(data)
  },
  _del: async function (keys, key) {
    let db = await this.__operate()
    await db.items.where('id').equals(keys.join(':')).delete()
    return key
  },
  _delSome: async function (keys) {
    let db = await this.__operate()
    await db.items.filter(function (item) {
      return keys.indexOf(item.id) !== -1
    }).delete()
    return keys
  },
  _delAll: async function (keys) {
    let db = await this.__operate()
    await db.items.filter(function (item) {
      return item.id.indexOf(keys.join(':') + ':') === 0
    }).delete()
    return keys
  },
  _free: async function (keys) {
    let db = await this.__operate()
    let result = await db.items.where('id')
      .equals(keys.join(':'))
      .toArray()
    if (result.length === 0) {
      return keys
    } else {
      throw new Error('IS_NOT_FREE')
    }
  },
  _exist: async function (keys) {
    let db = await this.__operate()
    let result = await db.items.where('id')
      .equals(keys.join(':'))
      .toArray()
    if (result.length > 0) {
      return result[0].data
    } else {
      throw new Error('DOES_NOT_EXIST')
    }
  },
  __operate: async function () {
    if (!this.db.isOpen()) {
      return await this.db.open()
    } else {
      return new Promise(resolve => resolve(this.db))
    }
  }
}

export { indexedDB }
