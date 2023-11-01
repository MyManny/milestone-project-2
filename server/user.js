const bcrypt = require("bcrypt");
const crypto = require("crypto");
const client = require("./db-client");

const saltRounds = 10;

async function registerUser(username, password) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const result = await client.query(
        'INSERT INTO "User" (username, password) VALUES ($1, $2) RETURNING id',
        [username, hashedPassword]
    );

    return result.rows[0].id; // Return the newly created user ID
}

async function loginUser(username, password) {
    const result = await client.query('SELECT id, password FROM "User" WHERE username = $1', [
        username,
    ]);

    const user = result.rows[0];
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    // Generate a random token and store it
    const token = crypto.randomBytes(64).toString("hex");
    await client.query('UPDATE "User" SET token = $1 WHERE id = $2', [token, user.id]);

    return token; // Return the token for the client to use
}

async function logoutUser(token) {
    await client.query('UPDATE "User" SET token = NULL WHERE token = $1', [token]);
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};