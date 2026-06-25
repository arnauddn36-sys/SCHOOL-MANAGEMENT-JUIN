import db from "../db/database.js";

//CETTE FONCTION PERMET DE RECHERCHER UN ENSEIGNANT PAR SON ID

export function getTeacherById(id) {
    const teacher = db
        .prepare("SELECT * FROM teachers WHERE id = ?")
        .get(id);

    if (!teacher) {
        console.log(`Aucun enseignant trouvé avec l'ID ${id}`);
        return;
    }

    console.table(teacher);
}

//CETTE FONCTION EST MON OUTIL POUR SUPPRIMER UN ENSEIGNANT

export function deleteTeacher(id) {
    const result = db
        .prepare("DELETE FROM teachers WHERE id = ?")
        .run(id);

    if (result.changes === 0) {
        console.log(`ID ${id} non trouvé.`);
    } else {
        console.log("Enseignant supprimé avec succès.");
    }
}

//CETTE FONCTION ME PERMET DE MODIFIER UN ENSEIGNANT

export function updateTeacher(id, nom, matiere) {
    const result = db
        .prepare(`
            UPDATE teachers
            SET nom = ?, matiere = ?
            WHERE id = ?
        `)
        .run(nom, matiere, id);

    if (result.changes === 0) {
        console.log(`Aucun enseignant trouvé avec l'ID ${id}`);
    } else {
        console.log("Enseignant mis à jour avec succès.");
    }
}   

//CETTE FONCTION ME PERMET D'AJOUTER UN ENSEIGNANT

export function addTeacher(nom, matiere) {
    const result = db
        .prepare(`
            INSERT INTO teachers(nom, matiere)
            VALUES(?, ?)
        `)
        .run(nom, matiere);

    if (result.changes === 0) {
        console.log("Erreur lors de l'ajout de l'enseignant.");
    } else {
        console.log("Enseignant ajouté avec succès.");
    }
}

//CETTE FONCTION ME PERMET DE LISTER TOUS LES ENSEIGNANTS

export function listTeachers() {
    const teachers = db.prepare("SELECT * FROM teachers").all();

    if (teachers.length === 0) {
        console.log("Aucun enseignant trouvé.");
        return;
    }

    console.table(teachers);
}

