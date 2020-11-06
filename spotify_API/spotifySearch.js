const request = require("request-promise");

const client_id = "d53c8e915602484fa12122bef8434b43"; //  client id
const client_secret = "90cdb11cf8a24233ac22225728c3bac3"; //  secret

const spotifySearch = async (playlistName) => {
  //Convert artist name to URL compatible format
  playlistName = playlistName.replace(/ /g, "%20");

  /**
   * Make authorization call using client id and client secret
   * Returns access token
   */

  let name;
  let url;

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
        "https://api.spotify.com/v1/search?q=" +
        playlistName +
        "&type=playlist&limit=5",
      headers: { Authorization: "Bearer " + access_token },
      json: true,
    };

    const searchAPI = await request.get(searchCall, function () {});
    name = searchAPI.playlists.items[0].name;
    url = searchAPI.playlists.items[0].external_urls.spotify;
  } catch (e) {
    console.log("SP_ERROR: COULD NOT AUTHORIZE SPOTIFY API");
    console.log(e.message);
  }

  return { name, url };
};

module.exports = spotifySearch;
