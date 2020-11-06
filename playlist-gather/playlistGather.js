const spotifyPlaylistAPI = require("../spotify_API/getPlaylistData");
const createConnection = require("../database/createConnection");
const insertIntoDB = require("./insertIntoDB");
const sleep = require("../functions/sleep");
const randomizeArray = require("../functions/randomizeArray");

const playlistGather = async () => {
  let con, query;
  let status = { ok: "OK", error: "ERROR" };

  try {
    ({ con, query } = await createConnection());
    let playlists = await query("SELECT * FROM playlists");
    let previousScrapeId = await query(
      "SELECT scrape_id FROM playlist_data ORDER BY id DESC LIMIT 1"
    );
    con.end();

    previousScrapeId = previousScrapeId[0].scrape_id;
    console.log(previousScrapeId);
    const scrapeId = previousScrapeId ? previousScrapeId + 1 : 1;
    console.log(scrapeId);

    await sleep(500);

    playlists = randomizeArray(playlists);

    console.log(playlists);

    for (let i = 0; i < playlists.length; i++) {
      const info = playlists[i];
      const id = info.spotify_playlist_id;
      console.log(id);
      const currentData = await spotifyPlaylistAPI(id);
      console.log(currentData);
      await insertIntoDB(info, currentData, scrapeId);
      await sleep(2000);
    }

    status = status.ok;
  } catch {
    status = status.error;
  }

  return status;
};

module.exports = playlistGather;
