import db from "../db/database.js";

export function addSubject(nom, teacher_id){
    db.prepare(`
        INSERT INTO subjects(nom, teacher_id)
        VALUES(?, ?)
    `).run(nom, teacher_id);
    console.log("Matière ajoutée avec succès");
}

export function listSubjects(){
    const subjects = db.prepare("SELECT * FROM subjects").all();
    
    console.table(subjects);
}

export function getSubjectById(id){
    const subject = db
        .prepare("SELECT * FROM subjects WHERE id = ?")
        .get(id);   
        
    if (!subject) {
        console.log(`Aucune matière trouvée avec l'ID ${id}`)
        return;
    }
    console.table(subject);
}
export function updateSubject(id, nom, teacher_id){
    db.prepare(`
        UPDATE subjects
        SET nom = ?, teacher_id = ?
        WHERE id = ?
    `).run(nom, teacher_id, id);
    console.log("Matière mise à jour avec succès"); 
}
         
export function deleteSubject(id){
    db.prepare(`
        DELETE FROM subjects WHERE id = ?
    `).run(id); 
    console.log("Matière supprimée avec succès");
}   




