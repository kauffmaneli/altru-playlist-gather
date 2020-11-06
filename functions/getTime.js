const getDateAndTIme = require("./getDateAndTime");

const getTime = () => {
  const date = getDateAndTIme();
  const hoursAndMinutes = date.slice(11, 16);
  let hours = Number(hoursAndMinutes.slice(0, 2));
  const minutes = hoursAndMinutes.slice(3, 5);

  let AMorPM;
  const AM = "AM";
  const PM = "PM";

  if (hours > 12) {
    hours = hours - 12;
    AMorPM = PM;
  } else if (hours == 0) {
    hours = 12;
    AMorPM = AM;
  } else if (hours == 12) {
    AMorPM = PM;
  } else {
    AMorPM = AM;
  }

  return `${hours}:${minutes} ${AMorPM}`;
};

module.exports = getTime;
