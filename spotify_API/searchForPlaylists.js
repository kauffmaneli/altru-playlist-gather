const spotifySearch = require("./spotifySearch");
const createConnection = require("../database/createConnection");

const playlists = {
  hiphop: [
    "RapCaviar",
    "Get Turnt",
    "Most Necessary",
    "CST",
    "Feelin' Myself",
    "Internet People",
    "Off The Strength",
    "B.A.E.",
    "Hip-Hop Drive",
    "Clout Culture",
    "Mellow Bars",
    "Tear Drop",
    "Alternative Hip Hop",
    "Choice Edit",
  ],
  electronic: [
    "Mint",
    "Housewerk",
    "Happy Beats",
    "Bass Arcade",
    "Brain Food",
    "Dance Hits",
    "Chill Tracks",
    "Hype",
    "New Friday Cratediggers",
    "Fresh Finds: Basement",
    "Tiki Torch",
    "Metropolis",
    "Shuffle Syndrome",
    "Swag House",
  ],
  pop: [
    "Today's Top Hits",
    "Pop Rising",
    "Pumped Pop",
    "Mega Hit Mix",
    "Tean Beats",
    "Soft Pop Hits",
    "Just Good Music",
    "Hot Rhythmic",
    "Guilty Pleasures",
    "Pop Party",
    "Bedroom Pop",
    "Indie Pop",
    "Modern Soft Pop",
    "Pop Sauce",
  ],
};

const searchForPlaylists = async () => {
  finals = [];
  for (genre in playlists) {
    for (let i = 0; i < playlists[genre].length; i++) {
      const data = await spotifySearch(playlists[genre][i]);
      data.url = data.url.slice(34, data.url.length);

      console.log(playlists[genre][i], data);
      name = data.name;
      url = data.url;

      const { con, query } = await createConnection();
      await query(
        "INSERT INTO playlists (name, spotify_playlist_id, genre) VALUES (?, ?, ?)",
        [name, url, genre]
      );
      con.end();
    }
  }
};

searchForPlaylists();
