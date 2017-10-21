// @flow
import { By } from 'selenium-webdriver'
import BasePage from './BasePage'

const CONTENT = By.css('.ql-editor')
const STATUS = By.css('h3.status')
const EMPTY = ''
const LOADING = '⢀⠀'

export default class HomePage extends BasePage {

  async isLoaded () {
    await this.waitForDisplayed(CONTENT)
  }

  async getEditorText () {
    return this.getText(CONTENT)
  }

  async setEditorText(text) {
    return this.sendKeys(CONTENT, text)
  }

  async reload() {
    return this.refresh(CONTENT)
  }

  async statusClear() {
    return this.waitForTextToBe(STATUS, EMPTY)
  }

  async statusLoading() {
    return this.waitForTextToBe(STATUS, LOADING)
  }

}
