import db from "../db/database.js";



export function addAbsence(student_id, date, status) {
    db.prepare(`
        INSERT INTO absences (student_id, date, status)
        VALUES (?, ?, ?)
    `).run(student_id, date, status);

    console.log("Absence ajoutée");
}

export function listAbsences() {
    const absences = db.prepare(`
        SELECT * FROM absences
    `).all();

    console.table(absences);
}

export function getAbsenceById(id) {
    const absence = db.prepare(`
        SELECT * FROM absences WHERE id = ?
    `).get(id);

    if (!absence) {
        console.log("Absence introuvable");
        return;
    }

    console.table(absence);
}

export function deleteAbsence(id) {
    const result = db.prepare(`
        DELETE FROM absences WHERE id = ?
    `).run(id);

    if (result.changes === 0) {
        console.log("Absence introuvable");
        return;
    }

    console.log("Absence supprimée");
}



export function updateAbsence(id, student_id, date, status) {
    const result = db.prepare(`
        UPDATE absences
        SET student_id = ?, date = ?, status = ?
        WHERE id = ?
    `).run(student_id, date, status, id);

    if (result.changes === 0) {
        console.log("Absence introuvable");
        return;
    }

    console.log("Absence mise à jour avec succès");
}