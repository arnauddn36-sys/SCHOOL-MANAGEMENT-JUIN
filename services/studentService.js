import db from "../db/database.js";

//FONCTIONALITE POUR LES ETUDIANTS


// CETTE FONCTION EST MON OUTIL POUR AJOUTER UN ETUDIANT

const insertStudent = db.prepare(`
    INSERT OR IGNORE INTO students(matricule, nom, prenom, age, classe)
    VALUES(?, ?, ?, ?, ?)
`);

export function addStudent(matricule, nom, prenom, age, classe) {

   
    const result = insertStudent.run(matricule, nom, prenom, age, classe);


    if (result.changes === 0) {
        console.log(` Matricule ${matricule} déjà existant — insertion ignorée.`);
    } else {
      
        console.log(` Élève ajouté avec succès (id : ${result.lastInsertRowid})`);
    }
}

// CETTE FONCTION EST MON OUTIL POUR SUPPRIMER UN ETUDIANT (PAR id)

export function deleteStudent(id) {
    const result = db
        .prepare("DELETE FROM students WHERE id = ?")
        .run(id);

    if (result.changes === 0) {
        console.log(`ID ${id} non trouvé.`);
    } else {
        console.log("Élève supprimé avec succès.");
    }
}

//CETTE FONCTION EST POUR AFFICHER UN ETUDIANT PAR SON ID

export function getStudentById(id) {
    const student = db
        .prepare("SELECT * FROM students WHERE id = ?")
        .get(id);

    if (!student) {
        console.log(`Aucun étudiant trouvé avec l'ID ${id}`);
        return;
    }

    console.table(student);
}

//CETTE FONCTION  ME PERMET DE LISTER TOUS LES ÉTUDIANTS

export function listStudents() {
    const students = db.prepare("SELECT * FROM students").all();
    console.table(students);


if (students.length === 0) {
    console.log("Aucun étudiant trouvé.");   
    return;
}
            
}

//CETTE FONCTION ME PERMET DE MODIFIER UN ETUDIANT
export function updateStudent(id, matricule, nom, prenom, age, classe) {
    const result = db
        .prepare(`
            UPDATE students
            SET matricule = ?, nom = ?, prenom = ?, age = ?, classe = ?
            WHERE id = ?
        `)
        .run(matricule, nom, prenom, age, classe, id);

    if (result.changes === 0) {
        console.log(`Aucun étudiant trouvé avec l'ID ${id}`);
    } else {
        console.log("Élève mis à jour avec succès.");
    }
}



// FONCTIONALITE POUR LES ENSEIGNANTS


// CETTE FONCTION EST MON OUTIL POUR AJOUTER UN ENSEIGNANT

export function addteacher(nom, matiere) {
    const result = insertTeachers.run(nom, matiere);

    if (result.changes === 0) {
        console.log(`Enseignant ${nom} déjà existant — insertion ignorée.`);
    } else {
        console.log(`Enseignant ajouté avec succès (id : ${result.lastInsertRowid})`);
    }
}

