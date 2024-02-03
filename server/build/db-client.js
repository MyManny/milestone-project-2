"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class StableClient {
    constructor() {
        this._client = null;
        this._client = this.createDbClient();
    }
    createDbClient() {
        const client = new pg_1.Client({
            connectionString: process.env.DB_STRING,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        client.on("error", (err) => __awaiter(this, void 0, void 0, function* () {
            if (err.message.includes("terminated unexpectedly")) {
                console.error("DB connection terminated unexpectedly, reconnecting...");
                yield this.end();
                yield this.connect();
            }
            else {
                console.error("Unexpected error on PG client:", err);
            }
        }));
        return client;
    }
    static getInstance() {
        if (!StableClient.instance) {
            StableClient.instance = new StableClient();
        }
        return StableClient.instance;
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._client) {
                yield ((_a = this._client) === null || _a === void 0 ? void 0 : _a.connect());
            }
        });
    }
    query(queryText, values) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            return (_a = this._client) === null || _a === void 0 ? void 0 : _a.query(queryText, values);
        });
    }
    end() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this._client) {
                yield ((_a = this._client) === null || _a === void 0 ? void 0 : _a.end());
            }
        });
    }
}
StableClient.instance = null;
