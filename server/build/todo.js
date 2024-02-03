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
exports.deleteTodoItem = exports.updateTodoItem = exports.createTodoForUser = exports.listTodosForUser = void 0;
const client = require("./db-client");
client.query("SELECT * FROM your_table");
function listTodosForUser(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query(`
            SELECT "Todo".id, "Todo".title, "Todo".name, "Todo".completed 
            FROM "Todo"
            JOIN "User" ON "Todo".user_id = "User".id 
            WHERE "User".token = $1
            ORDER BY "Todo".id
        `, [token]);
        return result.rows;
    });
}
exports.listTodosForUser = listTodosForUser;
function createTodoForUser(token, title, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query(`
            INSERT INTO "Todo" (title, name, user_id)
            SELECT $1, $2, "User".id FROM "User" WHERE "User".token = $3
            RETURNING "Todo".id,"Todo".title, "Todo".name, "Todo".completed
        `, [title, name, token]);
        return result.rows[0]; // Return the newly created Todo item
    });
}
exports.createTodoForUser = createTodoForUser;
function updateTodoItem(token, todoId, updatedTitle, updatedName, updatedCompleted) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query(`
            UPDATE "Todo"
            SET name = $1, title=$2, completed = $3
            FROM "User"
            WHERE "Todo".id = $4
            AND "User".token = $5
            AND "Todo".user_id = "User".id
            RETURNING "Todo".id, "Todo".title, "Todo".name, "Todo".completed
        `, [updatedName, updatedTitle, updatedCompleted, todoId, token]);
        return result.rows[0]; // Return the updated Todo item
    });
}
exports.updateTodoItem = updateTodoItem;
function deleteTodoItem(token, todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query(`
            DELETE FROM "Todo"
            USING "User"
            WHERE "Todo".id = $1 
            AND "User".token = $2 
            AND "Todo".user_id = "User".id
        `, [todoId, token]);
        // No return value, you can check if deletion was successful by counting affected rows if needed
    });
}
exports.deleteTodoItem = deleteTodoItem;
module.exports = {
    listTodosForUser,
    createTodoForUser,
    updateTodoItem,
    deleteTodoItem,
};
