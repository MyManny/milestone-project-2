const client = require("./db-client");

client.query("SELECT * FROM your_table")

export async function listTodosForUser(token: string) {
    const result = await client.query(
        `
            SELECT "Todo".id, "Todo".title, "Todo".name, "Todo".completed 
            FROM "Todo"
            JOIN "User" ON "Todo".user_id = "User".id 
            WHERE "User".token = $1
            ORDER BY "Todo".id
        `,
        [token]
    );
    return result.rows;
}

export async function createTodoForUser(token: string, title: string, name: string) {
    const result = await client.query(
        `
            INSERT INTO "Todo" (title, name, user_id)
            SELECT $1, $2, "User".id FROM "User" WHERE "User".token = $3
            RETURNING "Todo".id,"Todo".title, "Todo".name, "Todo".completed
        `,
        [title, name, token]
    );
    return result.rows[0]; // Return the newly created Todo item
}

export async function updateTodoItem(token: string, todoId: string, updatedTitle: string, updatedName: string, updatedCompleted: boolean) {
    const result = await client.query(
        `
            UPDATE "Todo"
            SET name = $1, title=$2, completed = $3
            FROM "User"
            WHERE "Todo".id = $4
            AND "User".token = $5
            AND "Todo".user_id = "User".id
            RETURNING "Todo".id, "Todo".title, "Todo".name, "Todo".completed
        `,
        [updatedName, updatedTitle, updatedCompleted, todoId, token]
    );
    return result.rows[0]; // Return the updated Todo item
}

export async function deleteTodoItem(token: string, todoId: string) {
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