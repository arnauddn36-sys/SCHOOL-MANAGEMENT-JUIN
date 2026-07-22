import db from "../db/database.js";



// ==========================
// Ajouter un professeur
// ==========================

export function addTeacher(nom, prenom) {


    const result = db.prepare(`
        INSERT INTO teachers(nom, prenom)
        VALUES (?, ?)
    `).run(
        nom,
        prenom
    );


    return result.lastInsertRowid;

}





// ==========================
// Récupérer un professeur par ID
// ==========================

export function getTeacherById(id) {


    const teacher = db.prepare(`
        SELECT *
        FROM teachers
        WHERE id = ?
    `).get(id);



    return teacher;

}





// ==========================
// Lister les professeurs
// ==========================

export function listTeachers() {


    const teachers = db.prepare(`

        SELECT
            teachers.id,
            teachers.nom,
            teachers.prenom,
            subjects.nom AS matiere

        FROM teachers

        LEFT JOIN subjects

        ON teachers.id = subjects.teacher_id

    `).all();



    return teachers;

}





// ==========================
// Modifier un professeur
// ==========================

export function updateTeacher(id, nom, prenom) {


    const result = db.prepare(`

        UPDATE teachers

        SET 
            nom = ?,
            prenom = ?

        WHERE id = ?

    `).run(
        nom,
        prenom,
        id
    );



    return result.changes;

}





// ==========================
// Supprimer un professeur
// ==========================

export function deleteTeacher(id) {


    // Retirer d'abord l'association matière

    db.prepare(`

        UPDATE subjects

        SET teacher_id = NULL

        WHERE teacher_id = ?

    `).run(id);




    const result = db.prepare(`

        DELETE FROM teachers

        WHERE id = ?

    `).run(id);



    return result.changes;

}





// ==========================
// Assigner une matière
// ==========================

export function assignSubject(teacherId, subjectId) {


    const result = db.prepare(`

        UPDATE subjects

        SET teacher_id = ?

        WHERE id = ?

    `).run(
        teacherId,
        subjectId
    );



    return result.changes;

}





// ==========================
// Liste des matières
// ==========================

export function listSubjects() {


    return db.prepare(`

        SELECT *

        FROM subjects

    `).all();

}