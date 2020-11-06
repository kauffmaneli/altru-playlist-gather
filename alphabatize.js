const fs = require("fs");

const run = async () => {
  const list = JSON.parse(fs.readFileSync("./genres.json"));
  const sortedList = list.sort((a, b) => {
    return a.localeCompare(b);
  });

  console.log(sortedList);

  fs.writeFileSync("./genresAlphabatized.json", JSON.stringify(sortedList));
};

run();
