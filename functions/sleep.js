/**
 * Function    :   Sleep
 *
 * Description :   Delays the execution of the next line of code
 *
 * Parameters  :   Int - Milliseconds of delay (leave input blank to get a
 *                 random delay between 0 and maxWaitTime)
 *
 * Returns     :   Int - Milliseconds delayedx
 */

const maxWaitTime = 40000; //ms

const sleepOn = true; //Turns all sleeping off

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const runSleep = async (timeIn) => {
  let delay;
  if (timeIn) {
    delay = timeIn;
  } else {
    delay = sleepOn ? Math.random() * maxWaitTime : 0;
  }

  await sleep(delay);
  return delay;
};

module.exports = runSleep;
