import db from "../db/database.js";

export function addUser(name, role) {
    const result = db
        .prepare(`
            INSERT INTO users(name, role)
            VALUES(?, ?)
        `)
        .run(name, role);

    if (result.changes === 0) {
        console.log("Échec de l'ajout de l'utilisateur.");
    } else {
        console.log("Utilisateur ajouté avec succès.");
    }

    console.table(User());
}
   


export function getUserById(id) {
    const user = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(id);

    if (!user) {
        console.log(`Aucun utilisateur trouvé avec l'ID ${id}`);
        return;
    }

    
}

export function listUsers() {
    const users = db.prepare("SELECT * FROM users").all();
    //console.table(users);
}       



export function updateUser(id, name, role) {
    const result = db
        .prepare(`
            UPDATE users
            SET name = ?, role = ?
            WHERE id = ?
        `)
        .run(name, role, id);

    if (result.changes === 0) {
        console.log(`Aucun utilisateur trouvé avec l'ID ${id}`);
    } else {
        console.log("Utilisateur mis à jour avec succès.");
    }
    

}

export function deleteUser(id) {
    const result = db
        .prepare("DELETE FROM users WHERE id = ?")
        .run(id);

    if (result.changes === 0) {
        console.log(`Aucun utilisateur trouvé avec l'ID ${id}`);
    } else {
        console.log("Utilisateur supprimé avec succès.");
    }

}   
