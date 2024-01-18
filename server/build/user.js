"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt = require("bcrypt");
const crypto = __importStar(require("crypto"));
const client = require("./db-client");
const saltRounds = 10;
function registerUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Hash the password
        const hashedPassword = yield bcrypt.hash(password, saltRounds);
        // Insert the user into the database
        const result = yield client.query('INSERT INTO "User" (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword]);
        return result.rows[0].id; // Return the newly created user ID
    });
}
exports.registerUser = registerUser;
function loginUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query('SELECT id, password FROM "User" WHERE username = $1', [
            username,
        ]);
        const user = result.rows[0];
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        // Generate a random token and store it
        const token = crypto.randomBytes(64).toString("hex");
        yield client.query('UPDATE "User" SET token = $1 WHERE id = $2', [token, user.id]);
        return token; // Return the token for the client to use
    });
}
exports.loginUser = loginUser;
function logoutUser(token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query('UPDATE "User" SET token = NULL WHERE token = $1', [token]);
    });
}
exports.logoutUser = logoutUser;
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
