const checkForNewArtists = require("./artist-gather/checkForNewArtists");
const getartistID = require("./spotify_API/getArtistId");
const getGenres = require("./spotify_API/getGenres");
const sleep = require("./functions/sleep");
const fs = require("fs");

const run = async () => {
  let out;
  const newArtists = await checkForNewArtists();

  const genreList = [];

  for (let i = 0; i < newArtists.length; i++) {
    const artistName = newArtists[i];
    const artistID = await getartistID(artistName);
    await sleep(1000);
    const genres = await getGenres(artistID);

    console.log(artistName, genres);
    await sleep(1000);

    for (let j = 0; j < genres.length; j++) {
      const genre = genres[j];
      if (!genreList.includes(genre)) {
        genreList.push(genre);
      }
    }

    console.log(genreList);
    console.log(i + " / " + newArtists.length);
    out = JSON.stringify(genreList);

    fs.writeFileSync("./genres.json", out);
  }
};

run();
