let webdriver = require('selenium-webdriver');

test('Simple Google Test', () => {

  let driver;

  driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

  driver.get('https://neomkt-test.now.sh').then(() => {});

});
