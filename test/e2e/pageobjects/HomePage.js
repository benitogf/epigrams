// @flow
import { By } from 'selenium-webdriver'
import BasePage from './BasePage'

const CONTENT = By.css('.ql-editor')

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

}
