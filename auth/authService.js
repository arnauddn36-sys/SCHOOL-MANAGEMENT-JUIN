import db from "../db/database.js";

export function login(name, password) {
    return db.prepare(`
        SELECT id, name, role
        FROM users
        WHERE name = ? AND password = ?
    `).get(name, password);
}