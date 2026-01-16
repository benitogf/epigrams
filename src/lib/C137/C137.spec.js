import { describe, it, expect } from 'vitest'
import wh from './index'

describe('C137', () => {
  it('should have a version [1]', () => {
    expect(wh.version).toBe(1)
  })

  it('should create a db', async () => {
    expect(wh.get).toBeInstanceOf(Function)
  })

  it('should set', async () => {
    let key = ['item', '1']
    var keys = await wh.set(key, { store: 'local' })
    expect(keys).toBe(key.join(':'))
  })

  it('should get', async () => {
    var item = await wh.get(['item', '1'])
    expect(item.store).toBe('local')
  })
})
