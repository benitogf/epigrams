import { describe, it, expect } from 'vitest'
import wh from './index'

describe('Warehouse service', function () {
  const testHubKey = 'testHub'
  const testKeyword = 'testKeyword1'

  it('should have hub methods', () => {
    expect(wh.hub.create).toBeInstanceOf(Function)
    expect(wh.hub.select).toBeInstanceOf(Function)
    expect(wh.hub.getAll).toBeInstanceOf(Function)
    expect(wh.hub.update).toBeInstanceOf(Function)
    expect(wh.hub.delete).toBeInstanceOf(Function)
    expect(wh.hub.upsert).toBeInstanceOf(Function)
  })

  it('should have item methods', () => {
    expect(wh.item.create).toBeInstanceOf(Function)
    expect(wh.item.get).toBeInstanceOf(Function)
    expect(wh.item.getAll).toBeInstanceOf(Function)
    expect(wh.item.update).toBeInstanceOf(Function)
    expect(wh.item.delSome).toBeInstanceOf(Function)
  })

  it('should have session methods', () => {
    expect(wh.session.setKeyword).toBeInstanceOf(Function)
    expect(wh.session.get).toBeInstanceOf(Function)
    expect(wh.session.getHub).toBeInstanceOf(Function)
    expect(wh.session.clearKeyword).toBeInstanceOf(Function)
    expect(wh.session.pack).toBeInstanceOf(Function)
    expect(wh.session.unpack).toBeInstanceOf(Function)
    expect(wh.session.hash).toBeInstanceOf(Function)
  })

  it('should create a hub entry in database', async function () {
    const key = ['hub', testHubKey]
    await wh.set(key, { id: testHubKey })
    const result = await wh.get(key)
    expect(result.id).toBe(testHubKey)
  })
})
