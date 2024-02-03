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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_client_1 = __importDefault(require("./db-client"));
const stableClient = require("./db-client");
stableClient.query("SELECT * FROM your_table");
const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) DEFAULT NULL
);
`;
const createTodoTableQuery = `
CREATE TABLE IF NOT EXISTS "Todo" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "User"(id),
    title VARCHAR(255) NOT NULL DEFAULT '',
    name VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
);`;
//create table for title connected to, created table with mult fields for listed items
//
// const createTodoTableQuery = `
// CREATE TABLE IF NOT EXISTS "Todo" (
//     event_id SERIAL PRIMARY KEY, 
//     user_id INTEGER REFERENCES "User"(id),
//     name VARCHAR(255) NOT NULL,
//     completed BOOLEAN DEFAULT false      
//     event_title VARCHAR(255) NOT NULL, 
//     event_description TEXT,            
//     event_date DATE NOT NULL,          
//     event_time TIME NOT NULL,          
//     created_at TIMESTAMPTZ DEFAULT NOW, 
//     updated_at TIMESTAMPTZ DEFAULT NOW 
// );
// `;
//create table title, description, date, time 
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create User table
            yield db_client_1.default.query(createUserTableQuery);
            console.log('"User" table created successfully.');
            // Create Todo table
            yield db_client_1.default.query(createTodoTableQuery);
            console.log('"Todo" table created successfully.');
        }
        catch (err) {
            console.error("Error creating tables:", err);
        }
        finally {
            yield db_client_1.default.end();
        }
    });
}
createTables();
