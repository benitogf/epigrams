// @flow
import wh from '@/lib/C137'
import { expect } from 'chai'

describe('Warehouse service', function () {
  var content = 'ふっかつ　あきる　すぶり　はやい　つける　まゆげ　たんさん　みんぞく　ねほりはほり　せまい　たいまつばな　ひはん'
  var testItem = {
    name: 'A test name',
    content: content
  }
  var newTestItem = {
    name: 'A new test name',
    content: content
  }
  var fakeItem = {
    name: 'A fake name',
    content: ''
  }
  var testHubKey = 'testHub'
  var newTestHubKey = 'testHubNew'
  var testKeyword = 'testKeyword1'
  var newTestKeyword = 'newTestKeyword1'
  var testId = '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b'
  var newTestId = '3941b238daab168b5b742ef81603cd2c71fb83aa75b0a8044cc414561d7bf81a'

  it('should delete test hub', async function () {
    let hubs = await wh.hub.getAll()
    let hubIds = hubs.map((x) => x.id)
    if (hubIds.indexOf(testHubKey) !== -1) {
      await wh.hub.select(testHubKey, testKeyword)
      await wh.hub.delete(testHubKey)
    }
  })
  it('should delete other test hub', async function () {
    let hubs = await wh.hub.getAll()
    let hubIds = hubs.map((x) => x.id)
    if (hubIds.indexOf(newTestHubKey) !== -1) {
      await wh.hub.select(newTestHubKey, newTestKeyword)
      await wh.hub.delete(newTestHubKey)
    }
  })
  it('should create a hub', async function () {
    let hub = await wh.hub.create(testHubKey, testKeyword)
    expect(hub.id).to.eq(testHubKey)
  })
  it('should get a list of hubs', async function () {
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
    await wh.hub.select(testHubKey, testKeyword)
    let hub = wh.session.getHub()
    await wh.item.delSome([testId, newTestId])
    let newItemId = await wh.item.create(testItem)
    expect(newItemId).to.eq('item:' + hub + ':' + testId)
    let items = await wh.item.getAll()
    expect(items.length).to.eq(1)
  })
  it('should get an item', async function () {
    let item = await wh.item.get(testItem.name)
    expect(item.id).to.eq(testId)
  })
  it('should update an item', async function () {
    let otherItem = {}
    let hub = wh.session.getHub()
    Object.assign(otherItem, newTestItem)
    otherItem.id = testId
    let newId = await wh.item.update(otherItem)
    expect(newId).to.eq('item:' + hub + ':' + newTestId)
  })
  it('should fail to get an item with a nonexistent key', async function () {
    try {
      let data = await wh.item.get('FakeKey')
      return new Error('got nonexistent item key data: ' + data)
    } catch (e) {
      return e
    }
  })
  it('should fail to update a nonexistent item', async function () {
    try {
      await wh.item.update(fakeItem)
      return new Error('updated nonexistent item')
    } catch (e) {
      return e
    }
  })
  it('should fail to create duplicated items', async function () {
    try {
      await wh.item.create(newTestItem)
      return new Error('created duplicated item')
    } catch (e) {
      return e
    }
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
    await wh.hub.select(testHubKey, testKeyword)
    await wh.hub.update(testHubKey, newTestHubKey, newTestKeyword)
    let hubs = await wh.hub.getAll()
    expect(hubs.map((x) => x.id).indexOf(newTestHubKey)).to.not.be.eq(-1)
    expect(hubs.map((x) => x.id).indexOf(testHubKey)).to.eq(-1)
  })
  it('should create a hub with previously used id', async function () {
    let hub = await wh.hub.create(testHubKey, testKeyword)
    expect(hub.id).to.eq(testHubKey)
  })
  it('should fail to update a nonexistent hub', async function () {
    try {
      await wh.hub.update('fakeHub', newTestHubKey)
      return new Error('nonexistent hub updated')
    } catch (e) {
      return e
    }
  })
  it('should delete test hub', async function () {
    let hubs = await wh.hub.getAll()
    let hubIds = hubs.map((x) => x.id)
    if (hubIds.indexOf(testHubKey) !== -1) {
      await wh.hub.select(testHubKey, testKeyword)
      await wh.hub.delete(testHubKey)
    }
  })
  it('should delete other test hub', async function () {
    let hubs = await wh.hub.getAll()
    let hubIds = hubs.map((x) => x.id)
    if (hubIds.indexOf(newTestHubKey) !== -1) {
      await wh.hub.select(newTestHubKey, newTestKeyword)
      await wh.hub.delete(newTestHubKey)
    }
  })
})
