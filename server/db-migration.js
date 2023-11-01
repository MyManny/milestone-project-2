const client = require("./db-client");

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

async function createTables() {
    try {
        // Create User table
        await client.query(createUserTableQuery);
        console.log('"User" table created successfully.');

        // Create Todo table
        await client.query(createTodoTableQuery);
        console.log('"Todo" table created successfully.');
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        await client.end();
    }
}

createTables();