const request = require("request-promise");

const client_id = "d53c8e915602484fa12122bef8434b43"; // My client id
const client_secret = "90cdb11cf8a24233ac22225728c3bac3"; // My secret

/**
 * Calls Spotify APIs
 * Authentication information is managed on
 * Spotify developer account
 */
const getGenres = async (artistID) => {
  let access_token;
  let isError = false;
  let artistData;
  let genres = [];

  const data = {};

  while (true) {
    if (artistID == null) {
      break;
    }

    //Make authorization call using client id and client secret
    //Returns access token
    try {
      const AT = await request.post({
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        form: {
          grant_type: "client_credentials",
        },
        json: true,
      });

      access_token = AT.access_token;
    } catch {
      console.log("SP_API_ERROR: COULD NOT AUTHORIZE SPOTIFY API");
      isError = true;
      break;
    }

    //Playlist Call
    try {
      artistData = await request.get({
        url: "https://api.spotify.com/v1/artists/" + artistID,
        headers: { Authorization: "Bearer " + access_token },
        json: true,
      });
    } catch {
      console.log("SP_API_NOTICE: IVALID ARTIST ID");
      break;
    }

    genres = artistData.genres;
    break;
  }

  return genres;
};
module.exports = getGenres;
