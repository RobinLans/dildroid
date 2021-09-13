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
    console.log(checkCredentials, "cred");
    return checkCredentials;
  },
  async registerUser(user) {
    user.password = await hashPassword(user.password);

    const query =
      "INSERT INTO Users(name, email, password) VALUES(:name, :email, :password)";

    return run(query, user);
  },
};
