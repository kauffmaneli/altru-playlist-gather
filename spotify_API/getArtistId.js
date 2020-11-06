const request = require("request-promise");

const client_id = "d53c8e915602484fa12122bef8434b43"; //  client id
const client_secret = "90cdb11cf8a24233ac22225728c3bac3"; //  secret

const spotifySearch = async (artistName) => {
  let artistID = null;
  //Convert artist name to URL compatible format
  artistName = artistName.replace(/ /g, "%20");

  /**
   * Make authorization call using client id and client secret
   * Returns access token
   */
  try {
    const authorizationCall = {
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
    };

    const AT = await request.post(authorizationCall, function () {});
    const access_token = AT.access_token;

    /**
     * Search call
     */
    const searchCall = {
      url:
        "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist&limit=5",
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };

    const searchAPI = await request.get(searchCall, function () {});
    artistID = searchAPI.artists.items[0].id;
  } catch {
    console.log("SP_ERROR: COULD NOT AUTHORIZE SPOTIFY API");

    artistID = null;
  }

  return artistID;
};

module.exports = spotifySearch;
