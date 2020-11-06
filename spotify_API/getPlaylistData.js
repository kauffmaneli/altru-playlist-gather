const request = require("request-promise");

const client_id = "d53c8e915602484fa12122bef8434b43"; // My client id
const client_secret = "90cdb11cf8a24233ac22225728c3bac3"; // My secret

/**
 * Calls Spotify APIs
 * Authentication information is managed on
 * Spotify developer account
 */
const getSpotifyAPI = async (playlistID) => {
  let access_token;
  let playlistAPI;
  let isError = false;

  const data = {};

  while (true) {
    if (playlistID == null) {
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
      playlistAPI = await request.get({
        url: "https://api.spotify.com/v1/playlists/" + playlistID,
        headers: { Authorization: "Bearer " + access_token },
        json: true,
      });
    } catch {
      console.log("SP_API_NOTICE: IVALID ARTIST ID");
      break;
    }

    data.followers = playlistAPI.followers.total;
    data.description = playlistAPI.description;
    data.image_url = playlistAPI.images[0].url;
    data.owner = playlistAPI.owner.display_name;
    data.numOfTracks = playlistAPI.tracks.total;
    data.tracks = [];

    for (let i = 0; i < playlistAPI.tracks.items.length; i++) {
      const track = playlistAPI.tracks.items[i];

      if (track.track) {
        const artists = [];
        for (let j = 0; j < track.track.artists.length; j++) {
          const artist = track.track.artists[j];
          artists.push(artist.name);
        }

        data.tracks.push({
          name: track.track.name,
          artists: artists,
          releaseDate: track.track.album.release_date,
          popularity: track.track.popularity,
          dateAdded: track.added_at,
        });
      }
    }

    break;
  }

  return data;
};

module.exports = getSpotifyAPI;
