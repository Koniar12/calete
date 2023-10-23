const { Builder, By, Key, until } = require('selenium-webdriver');

const driver = new Builder()
  .forBrowser('chrome') 
  .build();


const linklist = ['https://www.marketwatch.com/investing/stock/nvda', 'https://www.marketwatch.com/investing/stock/aapl', 'https://www.marketwatch.com/investing/stock/msft', 'https://www.marketwatch.com/investing/stock/intc', 'https://www.marketwatch.com/investing/stock/tsla']

async function getPrice(url) {
  try {
    await driver.get(url); 

    await driver.wait(until.elementLocated(By.className('intraday__price ')), 100000); 

    let price = await driver.findElement(By.className('intraday__price ')).getText();

    return price;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function getName(url) {
  try {
    await driver.get(url); 

    await driver.wait(until.elementLocated(By.className('company__name')), 100000);

    let name = await driver.findElement(By.className('company__name')).getText();

    return name;
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const fs = require('fs');

async function writePrice() {
  for (let i = 0; i < linklist.length; i++) {
    let price1 = await getPrice(linklist[i]);

    let price = price1.substring(2);

    let filename = await getName(linklist[i]);

    let filePath = `./${filename}.txt`;

    await fs.appendFile(filePath, '\n' + price, (err) => {
      if (err) throw err;
      console.log('${price} was appended to the ${filePath}');
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