import { test, expect } from '@playwright/test'

const CONTENT = '.ql-editor'
const STATUS = 'h3.status'
const something = 'Hello, World!'

test.describe('e2e Tests', () => {
  test('write something and persist', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator(CONTENT)).toBeVisible({ timeout: 10000 })
    
    await page.locator(CONTENT).click()
    await page.locator(CONTENT).pressSequentially(something, { delay: 50 })
    
    await page.waitForTimeout(2000)
    
    await page.reload()
    
    await expect(page.locator(CONTENT)).toBeVisible({ timeout: 10000 })
    
    await page.waitForTimeout(1000)
    
    const content = await page.locator(CONTENT).innerText()
    expect(content.trim()).toContain(something)
  })
})
