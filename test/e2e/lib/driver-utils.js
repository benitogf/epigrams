// @flow
const baseUrl = 'http://localhost:9000'

export default {
  async goToHome (driver: WebDriverClass): Promise<void> {
    return driver.get(baseUrl)
  }
}
