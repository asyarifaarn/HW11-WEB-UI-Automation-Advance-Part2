import { By } from "selenium-webdriver";


class PageLogin {
    static inputUsername = await driver.findElement(By.css('[data-test="username"]'))
    static inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
    static inputbuttonLogin = await driver.findElement(By.className('submit-button btn_action'))
 
}
module.exports = PageLogin;
