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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../src/user");
const todo_1 = require("../src/todo");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send({
        message: "Hello Developers!",
        secret: process.env.NOT_SO_SECRET,
    });
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userId = yield (0, user_1.registerUser)(username, password);
        res.send({
            message: "User registered successfully!",
            userId,
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Error registering user!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
}));
app.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = yield (0, user_1.loginUser)(username, password);
        res.send({
            message: "User logged in successfully!",
            token,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).send({
                message: "Error logging in user!",
                error: err.message,
            });
        }
        else {
            res.status(400).send({
                message: "Unknown error logging in user!",
            });
        }
    }
}));
app.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        yield (0, user_1.logoutUser)(token);
        res.send({
            message: "User logged out successfully!",
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Error logging out user!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
}));
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
        const todos = yield (0, todo_1.listTodosForUser)(token);
        res.send({
            message: "Todos retrieved successfully!",
            todos,
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Error retrieving todos!",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}));
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]) || "";
        const { title, name } = req.body;
        const todo = yield (0, todo_1.createTodoForUser)(token, title, name);
        res.send({
            message: "Todo created successfully!",
            todo,
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Error creating todo!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
}));
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const token = ((_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1]) || "";
        const { id } = req.params;
        const { name, title, completed } = req.body;
        const todo = yield (0, todo_1.updateTodoItem)(token, id, name, title, completed);
        res.send({
            message: "Todo updated successfully!",
            todo,
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Error updating todo!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
}));
app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const token = ((_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(" ")[1]) || "";
        const { id } = req.params;
        yield (0, todo_1.deleteTodoItem)(token, id);
        res.send({
            message: "Todo deleted successfully!",
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Error deleting todo!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
