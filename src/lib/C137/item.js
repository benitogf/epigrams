// @flow
import { C137 } from '@/lib/C137/C137'

const item = {
  async set (item) {
    const selectedHub = this.session.get()
    if (selectedHub) {
      if (!item.id) {
        item.id = this.session.hash(item.name)
      }
      return await this._set(['item', selectedHub.id, item.id], this.session.pack(item, selectedHub.keyword))
    } else {
      return new Promise((resolve, reject) => reject(new Error('SET_ITEM_NOT_SELECTED')))
    }
  },

  async setMany (items) {
    const selectedHub = this.session.get()
    if (selectedHub) {
      var newItems = this.item.pack(items, selectedHub)
      return await this._setMany(newItems)
    } else {
      return new Promise((resolve, reject) => reject(new Error('SET_ITEMS_NOT_SELECTED')))
    }
  },

  async create (item) {
    const selectedHub = this.session.get()
    if (selectedHub) {
      var now = Date.now() / 1000
      item.id = this.session.hash(item.name)
      item.created = now
      item.updated = now
      var keys = ['item', selectedHub.id, item.id]
      await this._free(keys)
      return this.item.set(item)
    } else {
      return new Promise((resolve, reject) => reject(new Error('CREATE_ITEM_NOT_SELECTED')))
    }
  },

  async update (item) {
    const selectedHub = this.session.get()
    if (selectedHub) {
      var keys = ['item', selectedHub.id, item.id]
      await this._exist(keys)
      var now = Date.now() / 1000
      item.id = this.session.hash(item.name)
      item.updated = now
      return this.item.set(item)
    } else {
      return new Promise((resolve, reject) => reject(new Error('UPDATE_ITEM_NOT_SELECTED')))
    }
  },

  async upsert (item) {
    try {
      return await this.item.create(item)
    } catch (e) {
      return await this.item.set(item)
    }
  },

  delSome (ids) {
    const selectedHub = this.session.get()
    if (selectedHub) {
      var toDel = []
      ids.forEach(function (id) {
        toDel.push('item:' + selectedHub.id + ':' + id)
      })
      return this._delSome(toDel)
    } else {
      return new Promise(function (resolve, reject) { reject(new Error('DELETE_ITEMS_NOT_SELECTED')) })
    }
  },

  async get (name) {
    const selectedHub = this.session.get()
    if (selectedHub) {
      var keys = ['item', selectedHub.id, this.session.hash(name)]
      try {
        let data = await this._get(keys)
        var dec = this.session.unpack(data, selectedHub.keyword)
        return dec
      } catch (e) {
        throw e
      }
    } else {
      throw new Error('GET_ITEM_NOT_SELECTED')
    }
  },

  async getAll () {
    const selectedHub = this.session.get()
    if (selectedHub) {
      var keys = ['item', selectedHub.id]
      let items = await this._getAll(keys)
      try {
        return this.item.unpack(items, selectedHub)
      } catch (e) {
        this.session.clearKeyword()
        return new Error('ITEMS_READ_FAIL')
      }
    } else {
      return new Error('GET_ITEMS_NOT_SELECTED')
    }
  },

  pack (items, hub) {
    var result = []
    items.forEach((item) => {
      result.push({
        id: ['item', hub.id, item.id].join(':'),
        data: this.session.pack(item, hub.keyword)
      })
    })
    return result
  },

  unpack (items, hub) {
    var result = []
    items.forEach((item) => {
      let unpack = this.session.unpack(item.data, hub.keyword)
      if (unpack && result) {
        result.push(unpack)
      } else {
        result = false
      }
    })
    return result
  }
}

class Item extends C137 {
  constructor (opt) {
    super(opt)
    this.item = {}
    Object.keys(item).forEach((method) => {
      this.item[method] = item[method].bind(this)
    })
  }
}

export { Item }
