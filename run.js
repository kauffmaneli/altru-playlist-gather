const sleep = require("./functions/sleep");
const getTime = require("./functions/getTime");
const playlistGather = require("./playlist-gather/playlistGather");

const run = async () => {
  while (true) {
    const time = getTime();
    if (time.slice(4, 5) == 0) {
      console.log(time); //Log the time every ten mins
    }

    if (time == "12:00 AM") {
      await playlistGather();
    }

    await sleep(60000);
  }
};

run();
