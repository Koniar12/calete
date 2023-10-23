const { Builder, By, Key, until } = require('selenium-webdriver');

// Create a new instance of the WebDriver
const driver = new Builder()
  .forBrowser('chrome') // You can change 'chrome' to 'firefox' or other supported browsers
  .build();


const linklist = ['https://www.etoro.com/markets/nvda']

async function getPrice(url) {
  try {
    // Navigate to the website
    await driver.get(url); // Replace with the URL of the website you want to interact with

    // Wait for a specific element to be visible (change the selector accordingly)
    await driver.wait(until.elementLocated(By.className('header-info-stats-content ng-star-inserted')), 100000); // Replace 'buttonId' with the actual element ID or other suitable selector

    // Click the button
    let price = await driver.findElement(By.className('header-info-stats-content ng-star-inserted')).getText();

    return price;
    // You can add more interactions or assertions here
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function getName(url) {
  try {
    // Navigate to the website
    await driver.get(url); // Replace with the URL of the website you want to interact with

    // Wait for a specific element to be visible (change the selector accordingly)
    await driver.wait(until.elementLocated(By.className('mobile-instrument-name-fullname')), 100000); // Replace 'buttonId' with the actual element ID or other suitable selector

    // Click the button
    let name = await driver.findElement(By.className('mobile-instrument-name-fullname')).getText();

    return name;
    // You can add more interactions or assertions here
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const fs = require('fs');

async function writePrice() {
  for (let i = 0; i < linklist.length; i++) {
    let price = await getPrice(linklist[i]);
    let filename = await getName(linklist[i]);
    let filePath = `./${filename}.txt`;
    await fs.writeFile(filePath, price, (err) => {
      if (err) throw err;
      console.log(`Data was written to ${filePath}`);
  });
  }
  await driver.quit();
}

/*function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let shouldStop = false;

  async function endlessLoopWithSleep() {
    while (!shouldStop) {
      // Your code here
      writePrice();
      // Sleep for 1000 milliseconds (1 second)
      await sleep(30000);
    }
    console.log('Loop stopped.');
  }

  //endlessLoopWithSleep();

  setTimeout(() => {
    shouldStop = true;
  }, 300000);*/

/* async function processLinks() {
   for (const link of linklist) {
     const value = await getPrice(link);
     if (value !== null) {
       console.log(`Value from ${link}: ${value}`);
     } else {
       console.log(`Failed to retrieve value from ${link}`);
     }
   }
 }
 
 // Call the function to process the links
 processLinks(); */

writePrice();