const db = require("./database");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/register-user/", (req, res) => {
  let user = req.body;

  let insert = db.registerUser(user);
  user.id = insert.lastInsertRowid;
  res.json(user);
});
// Gets login credentials in the body and then checks if those credentials matches with any credentials in the database.
// If there is a match, the response is { success: true }, if there is no match then the response is { success: false }
app.post("/api/login", async (req, res) => {
  console.log("hej");
  const loginCredentials = req.body;

  const userExists = await db.checkIfUserExists(loginCredentials);
  let result = { success: false };

  if (userExists > 0) {
    result.success = true;
  }

  res.json(result);
});

//Add a new playlist to a specific user
app.post("/api/add-playlist", (req, res) => {});

//Add a song to a specific playlist
app.post("/api/add-song", (req, res) => {});

//Get all playlists for a specific user
app.get("/api/users-playlist/:id", (req, res) => {
  const userId = req.params.id;

  const playlists = db.getPlaylists(userId);

  let result = { success: false };
  if (playlists) {
    result.success = true;
    result.playlists = playlists;
  }

  res.json(result);
});

app.get("/api/playlist/:id", (req, res) => {
  const playlistId = req.params.id;

  const songs = db.getPlaylistSongs(playlistId);

  let result = { success: false };
  if (songs) {
    result.success = true;
    result.songs = songs;
  }

  res.json(result);
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
