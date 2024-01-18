import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerUser, loginUser, logoutUser } from "../src/user";
import { listTodosForUser, createTodoForUser, updateTodoItem, deleteTodoItem } from "../src/todo";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "Hello Developers!",
        secret: process.env.NOT_SO_SECRET,
    });
});

app.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const userId = await registerUser(username, password);
        res.send({
            message: "User registered successfully!",
            userId,
        });
    } catch (err) {
        res.status(400).send({
            message: "Error registering user!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
});

app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const token = await loginUser(username, password);
        res.send({
            message: "User logged in successfully!",
            token,
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).send({
                message: "Error logging in user!",
                error: err.message,
            });
        } else {
            res.status(400).send({
                message: "Unknown error logging in user!",
            });
        }
    }
});

app.post("/logout", async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        await logoutUser(token);
        res.send({
            message: "User logged out successfully!",
        });
    } catch (err) {
        res.status(400).send({
            message: "Error logging out user!",
            error: err instanceof Error ? err.message : "Unknown error" 
        });
    }
});

app.get("/todos", async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || "";
        const todos = await listTodosForUser(token);
        res.send({
            message: "Todos retrieved successfully!",
            todos,
        });
    } catch (err: any) {
        res.status(400).send({
            message: "Error retrieving todos!",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
});

app.post("/todos", async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || "";
        const { title, name } = req.body;
        const todo = await createTodoForUser(token, title, name);
        res.send({
            message: "Todo created successfully!",
            todo,
        });
    } catch (err) {
        res.status(400).send({
            message: "Error creating todo!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
});

app.put("/todos/:id", async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || "";
        const { id } = req.params;
        const { name, title, completed } = req.body;
        const todo = await updateTodoItem(token, id, name, title, completed);
        res.send({
            message: "Todo updated successfully!",
            todo,
        });
    } catch (err) {
        res.status(400).send({
            message: "Error updating todo!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || "";
        const { id } = req.params;
        await deleteTodoItem(token, id);
        res.send({
            message: "Todo deleted successfully!",
        });
    } catch (err) {
        res.status(400).send({
            message: "Error deleting todo!",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
