// @flow
import { By } from 'selenium-webdriver'
import BasePage from './BasePage'

const TITLE = By.css('.md-card-header .md-subhead')

export default class LoginPage extends BasePage {

  async isLoaded () {
    await this.waitForDisplayed(TITLE)
  }

  async getTitle () {
    return this.getText(TITLE)
  }
}
