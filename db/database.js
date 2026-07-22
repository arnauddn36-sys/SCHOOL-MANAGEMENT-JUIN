import Database from "better-sqlite3";

const db = new Database("database.db");

db.pragma("foreign_keys = ON");



// ==========================
// RESET DATABASE DEVELOPPEMENT
// ==========================

db.exec(`
DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS absences;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;
`);




// ==========================
// TABLE USERS
// ==========================

db.exec(`
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    password TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL
);
`);


const insertUsers = db.prepare(`
INSERT INTO users(nom, prenom, password, role)
VALUES (?, ?, ?, ?)
`);


insertUsers.run(
    "Den",
    "Arnaud",
    "0123",
    "admin"
);


insertUsers.run(
    "Bob",
    "LeBon",
    "1234",
    "teacher"
);


insertUsers.run(
    "Jean",
    "Martin",
    "0000",
    "student"
);





// TABLE STUDENTS


db.exec(`
CREATE TABLE students(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    matricule TEXT UNIQUE NOT NULL,

    nom TEXT NOT NULL,

    prenom TEXT NOT NULL,

    age INTEGER NOT NULL,

    classe TEXT NOT NULL

);
`);




const insertStudents = db.prepare(`
INSERT INTO students(
    matricule,
    nom,
    prenom,
    age,
    classe
)
VALUES (?, ?, ?, ?, ?)
`);



insertStudents.run(
    "MAT-2026-021",
    "Kouadio",
    "Menelick",
    18,
    "1er A1"
);



insertStudents.run(
    "MAT-2026-022",
    "Diallo",
    "Amoin",
    19,
    "1er A1"
);





// TABLE TEACHERS


db.exec(`
CREATE TABLE teachers(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nom TEXT NOT NULL,

    prenom TEXT NOT NULL

);
`);




const insertTeachers = db.prepare(`
INSERT INTO teachers(
    nom,
    prenom
)
VALUES (?, ?)
`);




insertTeachers.run(
    "IRIE",
    "BI"
);



insertTeachers.run(
    "DRAMANE",
    "SCHELLA"
);







// TABLE SUBJECTS


db.exec(`
CREATE TABLE subjects(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nom TEXT NOT NULL UNIQUE,

    teacher_id INTEGER,

    FOREIGN KEY (teacher_id)
    REFERENCES teachers(id)

);
`);




const insertSubjects = db.prepare(`
INSERT INTO subjects(
    nom,
    teacher_id
)
VALUES (?, ?)
`);




insertSubjects.run(
    "Mathématiques",
    1
);



insertSubjects.run(
    "Français",
    2
);







// TABLE GRADES


db.exec(`
CREATE TABLE grades(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    student_id INTEGER NOT NULL,

    subject_id INTEGER NOT NULL,

    note REAL NOT NULL,


    FOREIGN KEY(student_id)
    REFERENCES students(id),


    FOREIGN KEY(subject_id)
    REFERENCES subjects(id)

);
`);




const insertGrades = db.prepare(`
INSERT INTO grades(
    student_id,
    subject_id,
    note
)
VALUES (?, ?, ?)
`);




insertGrades.run(
    1,
    1,
    15.5
);



insertGrades.run(
    2,
    2,
    16
);







// ==========================
// TABLE ABSENCES
// ==========================


db.exec(`
CREATE TABLE absences(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    student_id INTEGER NOT NULL,

    date TEXT NOT NULL,

    status TEXT NOT NULL,


    FOREIGN KEY(student_id)
    REFERENCES students(id)

);
`);





const insertAbsences = db.prepare(`
INSERT INTO absences(
    student_id,
    date,
    status
)
VALUES (?, ?, ?)
`);




const nowDate = new Date()
.toISOString()
.split("T")[0];



insertAbsences.run(
    1,
    nowDate,
    "Justifié"
);



insertAbsences.run(
    2,
    nowDate,
    "Non-justifié"
);






// ==========================
// TEST JOIN
// ==========================


const queryGrades = db.prepare(`
SELECT

    students.nom,

    students.prenom,

    subjects.nom AS matiere,

    grades.note


FROM grades


JOIN students

ON grades.student_id = students.id


JOIN subjects

ON grades.subject_id = subjects.id

`);




// EXPORT

export default db;