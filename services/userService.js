
import db from "../db/database.js";

export function addUser(nom, prenom, password, role) {
    const existingUser = db.prepare(`
        SELECT *
        FROM users
        WHERE password = ?
    `).get(password);

    if (existingUser) {
        console.log("Ce mot de passe est déjà utilisé.");
        return;
    }

    db.prepare(`
        INSERT INTO users (nom, prenom, password, role)
        VALUES (?, ?, ?, ?)
    `).run(nom, prenom, password, role);

    console.log(" Utilisateur ajouté.");
}
   


export function getUserById(id) {
    const user = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(id);

    if (!user) {
        console.log(`Aucun utilisateur trouvé avec l'ID ${id}`);
        return;
    }

    return user;
}

export function listUsers() {
    const users = db.prepare(`
        SELECT * FROM users
    `).all();

    if (users.length === 0) {
        console.log("Aucun utilisateur trouvé.");
        return;
    }

    console.table(users);
}



export function updateUser(
    id,
    nom,
    prenom,
    password,
    role
) {
    const result = db.prepare(`
        UPDATE users
        SET nom = ?, prenom = ?, password = ?, role = ?
        WHERE id = ?
    `).run(
        nom,
        prenom,
        password,
        role,
        id
    );

    if (result.changes === 0) {
        console.log(`Aucun utilisateur trouvé avec l'ID ${id}`);
    } else {
        console.log("Utilisateur modifié avec succès.");
    }
}

export function deleteUser(id) {
    const result = db.prepare(`
        DELETE FROM users
        WHERE id = ?
    `).run(id);

    if (result.changes === 0) {
        console.log(`Aucun utilisateur trouvé avec l'ID ${id}`);
    } else {
        console.log("Utilisateur supprimé avec succès.");
    }
}

// Recherche utilisateur pour la connexion
export function findUserByLogin(nom, prenom, password) {

    const user = db.prepare(`
        SELECT *
        FROM users
        WHERE nom = ?
        AND prenom = ?
        AND password = ?
    `).get(
        nom,
        prenom,
        password
    );


    return user;

}