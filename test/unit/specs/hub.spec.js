// @flow
import wh from '@/lib/C137'
import _ from 'lodash'
import { expect } from 'chai'

describe('Warehouse service', function () {
  var data = 'Δευτέρα - Σάββατο 09.00-17.00 Κυριακές & Αργίες Κλειστό'
  var testItem = {
    label: 'Δευτέρα - Σάββατο 09.00-17.00 Κυριακές & Αργίες Κλειστό',
    data: data
  }
  var newTestItem = {
    label: 'A new test name',
    data: data
  }
  var fakeItem = {
    label: 'A fake name',
    data: ''
  }
  var testHubKey = 'testHub'
  var newTestHubKey = 'testHubNew'
  var testKeyword = 'testKeyword1'
  var newTestKeyword = 'newTestKeyword1'
  var testId = '3acefc89f8d1665ef55d615fe6ed55e5cc1282a3994ef0c26eb11ab888ddbde0'
  var newTestId = '3941b238daab168b5b742ef81603cd2c71fb83aa75b0a8044cc414561d7bf81a'

  it('should create a hub', async function () {
    this.timeout(12000)
    try {
      await wh.hub.select(testHubKey, testKeyword)
      await wh.hub.delete(testHubKey)
    } catch (e) {
      console.log(e)
    }
    try {
      await wh.hub.select(newTestHubKey, newTestKeyword)
      await wh.hub.delete(newTestHubKey)
    } catch (e) {
      console.log(e)
    }
    let hub = await wh.hub.create(testHubKey, testKeyword)
    expect(hub.id).to.eq(testHubKey)
  })
  it('should get a list of hubs', async function () {
    await wh.hub.select(testHubKey, testKeyword)
    let hubs = await wh.hub.getAll()
    expect(hubs).to.be.an.instanceOf(Array)
  })
  it('should fail to create a duplicated hub', async function () {
    try {
      await wh.hub.create(testHubKey, testKeyword)
      throw new Error('Duplicated hub created')
    } catch (e) {
      return e
    }
  })
  // Items
  it('should create an item', async function () {
    this.timeout(12000)
    await wh.hub.select(testHubKey, testKeyword)
    let hub = await wh.session.getHub()
    await wh.item.delSome([testId, newTestId])
    let newItemId = await wh.item.create(testItem)
    expect(newItemId).to.eq('item:' + hub + ':' + testId)
    let items = await wh.item.getAll()
    expect(items.length).to.eq(1)
  })
  it('should get an item', async function () {
    let item = await wh.item.get(testId)
    expect(item.id).to.eq(testId)
  })
  it('should update an item', async function () {
    let otherItem = {}
    let hub = await wh.session.getHub()
    Object.assign(otherItem, newTestItem)
    otherItem.label = newTestItem.label
    otherItem.id = testId
    let newId = await wh.item.update(otherItem)
    expect(newId).to.eq('item:' + hub + ':' + newTestId)
  })
  it('should fail to get the updated item', async function () {
    let eq
    try {
      let items = await wh.item.getAll()
      eq = _.find(items, ['id', testId])
    } catch (e) {
      return e
    }
    expect(eq).to.eq(undefined)
  })
  it('should fail to get an item with a nonexistent key', async function () {
    let data
    try {
      data = await wh.item.get('FakeKey')
    } catch (e) {
      return e
    }
    expect(data).to.eq(undefined)
  })
  it('should fail to update a nonexistent item', async function () {
    let data
    try {
      data = await wh.item.update(fakeItem)
    } catch (e) {
      return e
    }
    expect(data).to.eq(undefined)
  })
  it('should fail to create duplicated items', async function () {
    let data
    try {
      data = await wh.item.create(newTestItem)
    } catch (e) {
      return e
    }
    expect(data).to.eq(undefined)
  })
  it('should remove an item', async function () {
    let newItems = await wh.item.delSome([newTestId])
    expect(newItems.map((x) => x.id).indexOf(newTestId)).to.eq(-1)
  })
  it('should remove items', async function () {
    await wh.hub.select(newTestHubKey, newTestKeyword)
    let newItems = await wh.item.delSome([testId, newTestId])
    expect(newItems.map((x) => x.id).indexOf(testId)).to.eq(-1)
    expect(newItems.map((x) => x.id).indexOf(newTestId)).to.eq(-1)
  })
  it('should update a hub', async function () {
    let now = Date.now()
    await wh.hub.select(testHubKey, testKeyword)
    await wh.hub.update(testHubKey, newTestHubKey + now, newTestKeyword)
    let hubs = await wh.hub.getAll()
    expect(hubs.map((x) => x.id).indexOf(newTestHubKey + now)).to.not.be.eq(-1)
    expect(hubs.map((x) => x.id).indexOf(testHubKey)).to.eq(-1)
  })
  it('should create a hub with previously used id', async function () {
    let hub = await wh.hub.create(testHubKey, testKeyword)
    expect(hub.id).to.eq(testHubKey)
  })
  it('should fail to update a nonexistent hub', async function () {
    let data
    try {
      await wh.hub.update('fakeHub', newTestHubKey)
    } catch (e) {
      return e
    }
    expect(data).to.eq(undefined)
  })
})
