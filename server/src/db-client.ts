import { Client } from "pg";

class StableClient {
    static query(createUserTableQuery: string) {
        throw new Error("Method not implemented.");
    }
    static end() {
        throw new Error("Method not implemented.");
    }
    private static instance: StableClient | null = null;
    private _client: Client | null = null;

    isConnected() {
        return !!this._client && this._client.connect;
    }

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

        client.on("error", async (err: { message: string | string[]; }) => {
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

    async connect() {
        if (!this.isConnected()) {
            if (!this._client) {
                this._client = this.createDbClient();
            }
            await this._client.connect();
        }
    }

    async query(queryText: string, values?: any[]) {
        await this.connect();
        return this._client?.query(queryText, values);
    }
    
    async end() {
        if (this.isConnected()) {
            await this._client?.end();
            this._client = null;
        }
    }
}

export default StableClient;
