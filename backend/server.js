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
// If there is a match, the response is { success: true }, if there is no match then the respnse is { success: false }
app.post("/api/login", async(req, res) => {
    console.log("hej");
    const loginCredentials = req.body;

    const userExists = await db.checkIfUserExists(loginCredentials);
    let result = { success: false };

    if (userExists > 0) {
        result.success = true;
    }

    res.json(result);
});

app.get("/api/:username", (req, res) => {
    let username = req.params.username;
    let playLists = db.getPlaylistByUser(username)
    res.json(playLists)
})

app.listen(8000, () => {
    console.log("Server started on port 8000");
});