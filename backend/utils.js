const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePasswordToHash(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

exports.hashPassword = hashPassword;
exports.comparePasswordToHash = comparePasswordToHash;
