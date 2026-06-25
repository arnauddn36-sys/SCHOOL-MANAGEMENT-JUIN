import db from "../db/database.js";

export function addGrade(student_id, subject_id, note){
    db.prepare(`
        INSERT INTO grades (student_id, subject_id, note)
        VALUES (?, ?, ?)
    `).run(student_id, subject_id, note);

    console.log("Note ajoutée avec succès.");
}

export function listGrades() {
    const grades = db.prepare("SELECT * FROM grades").all();

    console.table(grades);
}

export function getGradeById(id) {
    const grade = db.prepare(
        "SELECT * FROM grades WHERE id = ?"
    ).get(id);

    if (!grade) {
        console.log("Note introuvable");
        return;
    }

    console.table(grade);
}

export function deleteGrade(id) {
    const result = db.prepare(
        "DELETE FROM grades WHERE id = ?"
    ).run(id);

    if (result.changes === 0) {
        console.log("Note introuvable");
        return;
    }

    console.log("Note supprimée avec succès");
}

export function updateGrade(id, student_id, subject_id, note) {
    const result = db.prepare(`
        UPDATE grades
        SET student_id = ?, subject_id = ?, note = ?
        WHERE id = ?
    `).run(student_id, subject_id, note, id);

    if (result.changes === 0) {
        console.log("Note introuvable");
        return;
    }

    console.log("Note mise à jour avec succès");
}
