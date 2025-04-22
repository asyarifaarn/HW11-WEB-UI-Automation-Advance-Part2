import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import chrome from 'selenium-webdriver/chrome.js';

import fs from 'fs';
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import page_login from '../../..pages/page_login.js';


describe('Google Search Test', function () {
    let driver;
    it.only('Visit SauceDemo dan cek page title', async function () {
        let options = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').build();
  
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        let ss_full = await driver.takeScreenshot();
        fs.writerFileSync("full_screenshot.png", Buffer.from(ss_full, "base64"));
        
        let inputUsernamePOM = await driver.findElement(page_login.inputUsername)
        let ss_inputusername = await inputUsernamePOM.takeScreenshot();
        fs.writerFileSync("inputusername.png", Buffer.from(ss_inputusername, "base64"));

        driver.quit();
    })

    it('Login Success', async function () {
        let options = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();
        console.log("test case chrome")

        
        assert.strictEqual(title, 'Swag Labs');
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputUsernamePOM = await driver.findElement(page_login.inputUsername)
        
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let inputPasswordPOM= await driver.findElement(page_login.inputPassword)

        let inputbuttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        let inputbuttonLoginPOM = await driver.findElement(page_login.inputbuttonLogin)
        
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await inputbuttonLogin.click()

        
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            3000
        );
        await buttonCart.isDisplayed()

        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText();
        assert.strictEqual(logotext, 'Swag Labs')


        await driver.sleep(3000);
        await driver.quit();

    });

    
});



