import db from "../db/database.js";

export function getBestStudent() {
    const result = db.prepare(`
        SELECT 
            students.id,
            students.nom,
            AVG(grades.note) AS moyenne
        FROM students
        JOIN grades ON students.id = grades.student_id
        GROUP BY students.id
        ORDER BY moyenne DESC
        LIMIT 1
    `).get();

    return result;
}

export function getGeneralAverage() {
    const result = db.prepare(`
        SELECT AVG(note) AS moyenne_generale
        FROM grades
    `).get();

    return result.moyenne_generale;
}

export function countAbsences() {
    const result = db.prepare(`
        SELECT COUNT(*) AS total_absences
        FROM absences
    `).get();

    return result.total_absences;
}