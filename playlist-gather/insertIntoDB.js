const createConnection = require("../database/createConnection");
const getDateAndTime = require("../functions/getDateAndTime");

const insertIntoDB = async (info, currentData, scrapeId) => {
  let con, query;
  ({ con, query } = await createConnection());
  await query(
    "INSERT INTO playlist_data (date, scrape_id, playlist_id, name, followers, description, image_url, owner, num_of_tracks, tracks_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      getDateAndTime(),
      scrapeId,
      info.id,
      info.name,
      currentData.followers,
      currentData.description,
      currentData.image_url,
      currentData.owner,
      currentData.numOfTracks,
      JSON.stringify(currentData.tracks),
    ]
  );
  con.end();
};

module.exports = insertIntoDB;
