//Getting Todays Date

const getTodaysDate = () => {
  var date = new Date();

  date.setMinutes(date.getMinutes() - 240);

  todaysDate = date.toISOString();

  return todaysDate;
};

module.exports = getTodaysDate;
