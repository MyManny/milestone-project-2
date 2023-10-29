const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
console.log("DB_STRING:", process.env.DB_STRING);

class StableClient {
    constructor() {
        if (StableClient.instance) {
            return StableClient.instance;
        }

        this._client = this.createDbClient();

        StableClient.instance = this;
    }

    createDbClient() {
        const client = new Client({
            connectionString: process.env.DB_STRING,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        client.on("error", async (err) => {
            if (err.message.includes("terminated unexpectedly")) {
                console.error("DB connection terminated unexpectedly, reconnecting...");
                await this.end();
                await this.connect();
            } else {
                console.error("Unexpected error on PG client:", err);
            }
        });

        return client;
    }

    isConnected() {
        return this._client && this._client._connected;
    }

    async connect() {
        // If the client is not connected, then connect
        console.log("call to connect");
        if (!this.isConnected()) {
            console.log("not connected, connecting");
            if (!this._client) {
                console.log("no client, creating client");
                this._client = this.createDbClient();
            }
            await this._client.connect();
        }
    }

    async query(...args) {
        await this.connect(); // Ensure connection before querying
        return this._client.query(...args);
    }

    async end() {
        console.log("call to end connection");
        if (this.isConnected()) {
            console.log("connected, ending connection");
            await this._client.end();
            this._client = null;
        }
    }
}

const client = new StableClient();

module.exports = client;