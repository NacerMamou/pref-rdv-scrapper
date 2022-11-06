const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const { exec } = require('child_process');

const PONTOISE_RDV_URL = "https://www.val-doise.gouv.fr/booking/create/23749";

describe('prefecture homepage', function() {


  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
  });

  afterEach( () => {
    browser.restart();
  });

  it('should connect to prefecture site', async () => {
      mainFunction()
  });

});


async function mainFunction() {
  try {

    rdvNotFound = true;

    while(rdvNotFound) {

    browser.ignoreSynchronization = true;
    browser.sleep(10000);

    // await browser.get('https://www.yvelines.gouv.fr/booking/create/20024/0');
    await browser.get(PONTOISE_RDV_URL);
    
    browser.sleep(10000);

    await element(by.id('condition')).sendKeys(protractor.Key.SPACE);
    await element(by.name('nextButton')).click();

    browser.sleep(20000);

    let text = await element(by.id('FormBookingCreate')).getText();

    if(!text.includes("Il n'existe plus de plage horaire")) {
      rdvNotFound = false;
      runAudio();
      browser.sleep(8000000);
    }

    browser.sleep(20000);
  }

    expect(rdvNotFound).toBeFalsy();

    }

    catch(e) {
      console.log(e);
      browser.sleep(10000);
      mainFunction();
    }
}

function runAudio() {
  exec("play.bat", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
