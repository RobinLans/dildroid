const db = require("./database");
const jwt = require("jsonwebtoken");
const express = require("express");
const { hashPassword, comparePasswordToHash } = require("./utils");
const app = express();

app.use(express.json());

app.post("/api/register-user/", async (req, res) => {
  let user = req.body;
  let result = { success: false };
  let insert = await db.registerUser(user);
  user.id = insert.lastInsertRowid;
  if (insert) {
    result.success = true;
    result.message = "User registered";
  } else {
    result.message = "User already exists";
  }

  res.json(result);
});

// If there is a match, the response is { success: true }, if there is no match then the respnse is { success: false }
app.post("/api/login", async (req, res) => {
  const loginCredentials = req.body;

  const userInfo = await db.checkIfUserExists(loginCredentials);

  //Only need to check user[0] due to unique constraint on email.
  const checkCredentials = await comparePasswordToHash(
    loginCredentials.password,
    userInfo[0].password
  );

  let result = { success: false };
  if (checkCredentials) {
    const userId = userInfo[0].id;
    const token = jwt.sign({ id: userId }, "a1b1c1", { expiresIn: "7 days" });

    result.success = true;
    result.token = token;
  }

  res.json(result);
});

//Add a new playlist to a specific user
app.post("/api/add-playlist", (req, res) => {
  const playlistToAdd = req.body;

  const addPlaylistToDb = db.addPlaylist(playlistToAdd);

  let result = { success: false };

  if (addPlaylistToDb) {
    result.success = true;
  }

  res.json(result);
});

//Add a song to a specific playlist
app.post("/api/add-song", (req, res) => {
  const songToAdd = req.body;
  console.log(songToAdd);

  const addSongToPlaylist = db.addSong(songToAdd);

  let result = { success: false };

  if (addSongToPlaylist) {
    result.success = true;
  }

  res.json(result);
});

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

//Get a specific playlist based on id
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

app.post("/api/loggedin", async (req, res) => {
  console.log(req.headers);
  const token = req.headers.auth_token;

  let result = { loggedIn: false };

  const tokenVerified = jwt.verify(token, "a1b1c1");

  console.log(tokenVerified);

  if (tokenVerified) {
    result.loggedIn = true;
  }

  res.json(result);
});

// app.get("/api/users-playlist/:username", (req, res) => {
//   let userId = req.params.username;
//   console.log(username);
//   let playLists = db.getPlaylistSongs(userId);
//   // let playLists = db.getPlaylistByUser(userId);
//   res.json(playLists);
// });

app.listen(8111, () => {
  console.log("Server started on port 8111");
});
