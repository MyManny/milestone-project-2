const client = require("./db-client");

async function listTodosForUser(token) {
    const result = await client.query(
        `
            SELECT "Todo".id, "Todo".name, "Todo".completed 
            FROM "Todo"
            JOIN "User" ON "Todo".user_id = "User".id 
            WHERE "User".token = $1
            ORDER BY "Todo".id
        `,
        [token]
    );
    return result.rows;
}

async function createTodoForUser(token, name) {
    const result = await client.query(
        `
            INSERT INTO "Todo" (name, user_id)
            SELECT $1, "User".id FROM "User" WHERE "User".token = $2
            RETURNING "Todo".id, "Todo".name, "Todo".completed
        `,
        [name, token]
    );
    return result.rows[0]; // Return the newly created Todo item
}

async function updateTodoItem(token, todoId, updatedName, updatedCompleted) {
    const result = await client.query(
        `
            UPDATE "Todo"
            SET name = $1, completed = $2
            FROM "User"
            WHERE "Todo".id = $3
            AND "User".token = $4
            AND "Todo".user_id = "User".id
            RETURNING "Todo".id, "Todo".name, "Todo".completed
        `,
        [updatedName, updatedCompleted, todoId, token]
    );
    return result.rows[0]; // Return the updated Todo item
}

async function deleteTodoItem(token, todoId) {
    await client.query(
        `
            DELETE FROM "Todo"
            USING "User"
            WHERE "Todo".id = $1 
            AND "User".token = $2 
            AND "Todo".user_id = "User".id
        `,
        [todoId, token]
    );
    // No return value, you can check if deletion was successful by counting affected rows if needed
}

module.exports = {
    listTodosForUser,
    createTodoForUser,
    updateTodoItem,
    deleteTodoItem,
};