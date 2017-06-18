// @flow
import { expect } from 'chai'
import wh from '@/lib/C137'

describe('C137', () => {
  it('should have a version [1]', () => {
    expect(wh.version).to.eq(1)
  })
  it('should create a db', async () => {
    expect(wh._get).to.be.an.instanceOf(Function)
  })
  it('should set', async () => {
    let key = ['item', '1']
    var keys = await wh._set(key, { store: 'local' })
    expect(keys).to.eq(key.join(':'))
  })
  it('should get', async () => {
    var item = await wh._get(['item', '1'])
    expect(item.store).to.eq('local')
  })
})
