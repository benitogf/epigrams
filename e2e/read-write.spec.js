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

  test('paste an image inserts it once', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(CONTENT)).toBeVisible({ timeout: 10000 })
    await page.locator(CONTENT).click()

    await page.evaluate(async (selector) => {
      // 1x1 png
      const b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
      const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
      const dt = new DataTransfer()
      dt.items.add(new File([bytes], 'pixel.png', { type: 'image/png' }))
      // firefox empties clipboardData on synthetic ClipboardEvents
      const evt = new Event('paste', { bubbles: true, cancelable: true })
      Object.defineProperty(evt, 'clipboardData', { value: dt })
      document.querySelector(selector).dispatchEvent(evt)
    }, CONTENT)

    await expect(page.locator(`${CONTENT} img`)).toHaveCount(1)
    await page.waitForTimeout(500)
    await expect(page.locator(`${CONTENT} img`)).toHaveCount(1)
  })

  test('paste text drops its colors but keeps formatting', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(CONTENT)).toBeVisible({ timeout: 10000 })
    await page.locator(CONTENT).click()

    await page.evaluate((selector) => {
      const dt = new DataTransfer()
      dt.setData('text/html', '<p><b style="color: #fff; background-color: #fff">pasted</b></p>')
      dt.setData('text/plain', 'pasted')
      // firefox empties clipboardData on synthetic ClipboardEvents
      const evt = new Event('paste', { bubbles: true, cancelable: true })
      Object.defineProperty(evt, 'clipboardData', { value: dt })
      document.querySelector(selector).dispatchEvent(evt)
    }, CONTENT)

    const pasted = page.locator(`${CONTENT} strong`, { hasText: 'pasted' })
    await expect(pasted).toHaveCount(1)
    await expect(pasted).not.toHaveAttribute('style', /color/)
  })

  test('toolbar has text and background color pickers', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(CONTENT)).toBeVisible({ timeout: 10000 })
    await expect(page.locator('.ql-toolbar span.ql-color')).toBeVisible()
    await expect(page.locator('.ql-toolbar span.ql-background')).toBeVisible()
    await expect(page.locator('.ql-toolbar button.ql-clean')).toBeVisible()
  })
})
