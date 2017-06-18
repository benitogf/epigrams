// @flow
import { Item } from '@/lib/c137/item'
import { session } from '@/lib/c137/session'

const hub = {
  set (hub) {
    return this._set(['hub', hub.id], this.session.compress(hub))
  },

  async getAll () {
    let keys = ['hub']
    let hubs = await this._getAll(keys)
    var result = []
    hubs.forEach((hub) => {
      result.push(this.session.uncompress(hub.data))
    })
    return result
  },

  select (key, keyword) {
    this.session.setKeyword(keyword, key)
    return this.item.getAll()
  },

  async create (key, keyword) {
    var now = Date.now() / 1000
    var hub = {
      id: key,
      created: now,
      updated: now
    }
    var keys = ['hub', key]
    await this._free(keys)
    await this.hub.set(hub)
    this.session.setKeyword(keyword, key)
    return hub
  },

  async update (key, newKey, newKeyword) {
    const selectedHub = this.session.get()
    if (session && selectedHub.id === key) {
      await this._free(['hub', newKey])
      await this._exist(['hub', key])
      let data = await this._exist(['hub', key])
      let items = await this.item.getAll()
      await this._delAll(['item', key])
      await this._del(['hub', key])
      let hub = this.session.uncompress(data)
      hub.id = newKey
      hub.updated = Date.now() / 1000
      await this.hub.set(hub)
      var keyword = newKeyword || selectedHub.keyword
      this.session.setKeyword(keyword, newKey)
      await this.item.setMany(items)
      this.session.clearKeyword()
      return newKey
    } else {
      return new Promise((resolve, reject) => reject(new Error('UPDATE_HUB_NOT_SELECTED')))
    }
  },

  async upsert (key, keyword) {
    try {
      return await this.hub.select(key, keyword)
    } catch (e) {
      return await this.hub.create(key, keyword)
    }
  },

  async delete (id) {
    const hub = this.session.getHub()
    if (hub === id) {
      await this._delAll(['item', hub])
      await this._del(['hub', id])
      let hubs = await this.hub.getAll()
      this.session.clearKeyword()
      return hubs
    } else {
      return new Promise((resolve, reject) => reject(new Error('DELETE_HUB_NOT_SELECTED')))
    }
  }
}

class Hub extends Item {
  constructor (opt) {
    super(opt)
    this.hub = {}
    this.session = session
    Object.keys(hub).forEach((method) => {
      this.hub[method] = hub[method].bind(this)
    })
  }
}

export { Hub }
