const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
console.log("DB_STRING:", process.env.DB_STRING);

const client = new Client({
    connectionString: process.env.DB_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function connect() {
    await client.connect();
    console.log("DB connected successfully.");
}

// Connect immediately upon import
connect().catch((err) => console.error("Failed to connect to DB:", err));

module.exports = client;