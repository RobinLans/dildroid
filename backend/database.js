// import the database module
const sqlite = require("better-sqlite3");
const { hashPassword, comparePasswordToHash } = require("./utils");
// create a connection to the database
const conn = sqlite("database.db");

// to protect our database from SQL injections
// we handle all communication with 'Prepare Statements'

// all() is only for SELECT queries
// all() returns an array with all the rows
function all(query, params = {}) {
  // prepare statement

  const stmt = conn.prepare(query);

  return stmt.all(params);
}

// run() is used when a query does a change in the database
// INSERT, UPDATE, DELETE
function run(query, params = {}) {
  // prepare statement
  const stmt = conn.prepare(query);
  return stmt.run(params);
}

module.exports = {
  async checkIfUserExists(credentials) {
    const user = all(
      `SELECT * FROM Users WHERE email = '${credentials.email}'`
    );
    //Only need to check user[0] due to unique constraint on email.
    const checkCredentials = await comparePasswordToHash(
      credentials.password,
      user[0].password
    );
    return checkCredentials;
  },
  async registerUser(user) {
    user.password = await hashPassword(user.password);

    const query =
      "INSERT INTO Users(name, email, password) VALUES(:name, :email, :password)";

    return run(query, user);
  },
  getPlaylists(userId) {
    return all(`SELECT * FROM Playlist WHERE user_id = ${userId}`);
  },
  getPlaylistSongs(id) {
    return all(`SELECT * FROM Playlist_songs WHERE playlist_id = ${id}`);
  },

  getPlaylistByUser(username) {
    console.log(username);
    const query =
      all(`SELECT Playlist_songs.title, Playlist_songs.videoId, Playlist_songs.artist, Playlist_songs.duration, Playlist.name 
    FROM Playlist_songs
    INNER JOIN Playlist ON Playlist_songs.playlist_id = Playlist.id
    INNER JOIN Users ON Playlist.user_id = Users.id
    WHERE Users.id = '${username}'`);
    console.log(query);
    return query;
  },

  addPlaylist(playlist) {
    const query = `INSERT INTO Playlist(name, user_id)
    VALUES(:name, :userId)`;

    return run(query, playlist);
  },

  addSong(song) {
    const query = `INSERT INTO Playlist_songs(playlist_id, title, videoId, artist, duration)
    VALUES(:playlistId, :title, :videoId, :artist, :duration)`;

    return run(query, song);
  },
};
