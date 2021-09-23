// import the database module
const sqlite = require("better-sqlite3");
const { hashPassword } = require("./utils");
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
    return stmt.run(params)
}

module.exports = {
    async checkIfUserExists(credentials) {
        const user = all(
            `SELECT * FROM Users WHERE email = '${credentials.email}'`
        );

        return user;
    },
    async registerUser(user) {
        const checkUser = await this.checkIfUserExists(user)
        if (checkUser[0] && checkUser[0].email === user.email) {
            console.log('Already exist')
            return false
        }

        user.password = await hashPassword(user.password);
        const query =
            "INSERT INTO Users(name, email, password) VALUES(:name, :email, :password)";

        return run(query, user);
    },
    getPlaylists(userId) {
		return all(`SELECT * FROM Playlist LEFT JOIN Followed ON Playlist.id = Followed.playlistId WHERE Playlist.user_id = ${userId} OR Followed.userId = ${userId}`);

    },
    getPlaylistSongs(id) {
        return all(`SELECT * FROM Playlist_songs WHERE playlist_id = ${id}`);
    },

    addPlaylist(playlist) {
        const query = `INSERT INTO Playlist(name, user_id)
    VALUES(:name, :userId)`;

        return run(query, playlist);
    },

	addFollowed(playlist) {
        const query = `INSERT INTO Followed(userId, playlistId)
    VALUES(:userId, :playlistId)`;

        return run(query, playlist);
    },

    addSong(song) {
        const query = `INSERT INTO Playlist_songs(playlist_id, title, videoId, artist, duration)
    VALUES(:playlistId, :title, :videoId, :artist, :duration)`;

        return run(query, song);
    },
};