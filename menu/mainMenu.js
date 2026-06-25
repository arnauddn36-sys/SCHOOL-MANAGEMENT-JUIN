// IMPORTS



// fonction utilitaire pour poser des questions dans le terminal
import { ask } from "../utils/ask.js";

// services étudiants (CRUD étudiants)
import {
    addStudent, listStudents, getStudentById, updateStudent, deleteStudent
} from "../services/studentService.js";

// services enseignants (CRUD enseignants)
import {
    addTeacher, listTeachers, getTeacherById, updateTeacher, deleteTeacher
} from "../services/teacherService.js";

// services matières (CRUD matières)
import {
    addSubject, listSubjects, getSubjectById, updateSubject, deleteSubject
} from "../services/subjectService.js";

// services notes (CRUD notes)
import {
    addGrade, listGrades, getGradeById, updateGrade, deleteGrade
} from "../services/gradeService.js";

// services statistiques (calculs globaux)
import {
    getGeneralAverage, getBestStudent, countAbsences
} from "../services/statsService.js";


// MAIN MENU

// affiche le menu principal selon le rôle utilisateur
export async function showMainMenu(user) {

    // nettoie le terminal
    console.clear();

    // affiche les infos utilisateur connecté
    console.log(`
SCHOOL MANAGEMENT

User: ${user.name} (${user.role})
    `);

    // tableau des options du menu principal
    const options = [];

    // accès étudiants pour tous les rôles
    options.push("1 - Étudiants");

    // accès matières, notes, absences pour tous sauf filtrage interne
    options.push("3 - Matières");
    options.push("4 - Notes");
    options.push("5 - Absences");

    // options réservées admin
    if (user.role === "admin") {
        options.push("2 - Enseignants");
        options.push("6 - Statistiques");
    }

    // option quitter
    options.push("0 - Quitter");

    // affiche les options
    console.log(options.join("\n"));

    // récupère le choix utilisateur
    const choice = await ask("\nChoix : ");

    // envoie vers le routeur principal
    handleMainMenu(choice, user);
}


// MENU ÉTUDIANTS

// affiche le menu étudiants
async function showStudentMenu(user) {

    console.log(`
ÉTUDIANTS
1 - Ajouter
2 - Lister
3 - Voir par ID
4 - Modifier
5 - Supprimer
0 - Retour
    `);

    // récupère choix utilisateur
    const choice = await ask("Choix : ");

    // route vers gestion étudiants
    handleStudentMenu(choice, user);
}


// gère les actions du menu étudiants
async function handleStudentMenu(choice, user){

    // bloque teacher et student sur modification des étudiants
    if (
        (user.role === "teacher" || user.role === "student") &&
        ["1", "4", "5"].includes(choice)
    ) {
        console.log("Accès refusé (lecture seule)");
        return showStudentMenu(user);
    }

    // gestion des actions étudiants
    switch (choice.trim()) {

        case "1": {
            // ajout étudiant
            const m = await ask("Matricule: ");
            const n = await ask("Nom: ");
            const p = await ask("Prénom: ");
            const a = await ask("Âge: ");
            const c = await ask("Classe: ");
            addStudent(m, n, p, Number(a), c);
            break;
        }

        case "2":
            // liste étudiants
            listStudents();
            break;

        case "3": {
            // recherche étudiant par ID
            const id = await ask("ID: ");
            getStudentById(Number(id));
            break;
        }

        case "4": {
            // modification étudiant
            const id = await ask("ID: ");
            const m = await ask("Matricule: ");
            const n = await ask("Nom: ");
            const p = await ask("Prénom: ");
            const a = await ask("Âge: ");
            const c = await ask("Classe: ");
            updateStudent(Number(id), m, n, p, Number(a), c);
            break;
        }

        case "5": {
            // suppression étudiant
            const id = await ask("ID: ");
            deleteStudent(Number(id));
            break;
        }

        case "0":
            // retour menu principal
            return showMainMenu(user);
    }

    // recharge menu étudiants
    return showStudentMenu(user);
}


// MENU ENSEIGNANTS

// affiche menu enseignants
async function showTeacherMenu(user) {

    console.log(`
TEACHER
1 - Ajouter
2 - Lister
3 - Voir par ID
4 - Modifier
5 - Supprimer
0 - Retour
`);

    const choice = await ask("Choix : ");

    // route enseignants
    return handleTeacherMenu(choice, user);
}


// gestion menu enseignants
async function handleTeacherMenu(choice, user) {

    switch (choice.trim()) {

        case "1": {
            // ajout enseignant
            const n = await ask("Nom: ");
            const m = await ask("Matière: ");
            addTeacher(n, m);
            break;
        }

        case "2":
            // liste enseignants
            listTeachers();
            break;

        case "3": {
            // recherche enseignant
            const id = await ask("ID: ");
            getTeacherById(Number(id));
            break;
        }

        case "4": {
            // modification enseignant
            const id = await ask("ID: ");
            const n = await ask("Nom: ");
            const m = await ask("Matière: ");
            updateTeacher(Number(id), n, m);
            break;
        }

        case "5": {
            // suppression enseignant
            const id = await ask("ID: ");
            deleteTeacher(Number(id));
            break;
        }

        case "0":
            // retour menu principal
            return showMainMenu(user);
    }

    return showTeacherMenu(user);
}


// MENU MATIÈRES

// affiche menu matières
async function showSubjectMenu(user) {

    console.log(`
MATIÈRES
1 - Ajouter
2 - Lister
3 - Voir par ID
4 - Modifier
5 - Supprimer
0 - Retour
`);

    const choice = await ask("Choix : ");

    handleSubjectMenu(choice, user);
}


// gestion matières
async function handleSubjectMenu(choice, user) {

    switch (choice.trim()) {

        case "1": {
            // ajout matière
            const nom = await ask("Nom matière: ");
            const teacherId = await ask("ID enseignant: ");
            addSubject(nom, Number(teacherId));
            break;
        }

        case "2":
            // liste matières
            listSubjects();
            break;

        case "3": {
            // recherche matière
            const id = await ask("ID: ");
            getSubjectById(Number(id));
            break;
        }

        case "4": {
            // modification matière
            const id = await ask("ID: ");
            const nom = await ask("Nom: ");
            const teacherId = await ask("ID enseignant: ");
            updateSubject(Number(id), nom, Number(teacherId));
            break;
        }

        case "5": {
            // suppression matière
            const id = await ask("ID: ");
            deleteSubject(Number(id));
            break;
        }

        case "0":
            return showMainMenu(user);
    }

    return showSubjectMenu(user);
}



// MENU NOTES


// affiche menu notes
async function showGradeMenu(user) {

    console.log(`
NOTES
1 - Ajouter
2 - Lister
3 - Voir par ID
4 - Modifier
5 - Supprimer
0 - Retour
`);

    const choice = await ask("Choix : ");

    handleGradeMenu(choice, user);
}


// gestion notes
async function handleGradeMenu(choice, user) {

    switch (choice.trim()) {

        case "1": {
            // ajout note
            const studentId = await ask("ID étudiant: ");
            const subjectId = await ask("ID matière: ");
            const note = await ask("Note: ");
            addGrade(Number(studentId), Number(subjectId), Number(note));
            break;
        }

        case "2":
            // liste notes
            listGrades();
            break;

        case "3": {
            // recherche note
            const id = await ask("ID note: ");
            getGradeById(Number(id));
            break;
        }

        case "4": {
            // modification note
            const id = await ask("ID: ");
            const studentId = await ask("ID étudiant: ");
            const subjectId = await ask("ID matière: ");
            const note = await ask("Note: ");
            updateGrade(Number(id), Number(studentId), Number(subjectId), Number(note));
            break;
        }

        case "5": {
            // suppression note
            const id = await ask("ID: ");
            deleteGrade(Number(id));
            break;
        }

        case "0":
            return showMainMenu(user);
    }

    return showGradeMenu(user);
}


// ======================================================
// MENU STATISTIQUES
// ======================================================

// affiche menu statistiques
async function showStatsMenu(user) {

    console.log(`
STATISTIQUES
1 - Moyenne générale
2 - Meilleur élève
3 - Total absences
0 - Retour
`);

    const choice = await ask("Choix : ");

    handleStatsMenu(choice, user);
}


// gestion stats
function handleStatsMenu(choice, user) {

    switch (choice.trim()) {

        case "1":
            console.log(getGeneralAverage());
            break;

        case "2":
            console.log(getBestStudent());
            break;

        case "3":
            console.log(countAbsences());
            break;

        case "0":
            return showMainMenu(user);
    }

    return showStatsMenu(user);
}


// ======================================================
// ROUTEUR PRINCIPAL
// ======================================================

// gère la navigation principale selon le rôle
function handleMainMenu(choice, user) {

    const role = user.role;

    switch (choice.trim()) {

        case "1":
            // accès étudiants (tous rôles)
            return showStudentMenu(user);

        case "2":
            // enseignants (admin uniquement)
            if (role !== "admin") {
                console.log("Accès refusé");
                return showMainMenu(user);
            }
            return showTeacherMenu(user);

        case "3":
            // matières (admin + teacher)
            if (!["admin", "teacher"].includes(role)) {
                console.log("Accès refusé");
                return showMainMenu(user);
            }
            return showSubjectMenu(user);

        case "4":
            // notes (admin + teacher)
            if (!["admin", "teacher"].includes(role)) {
                console.log("Accès refusé");
                return showMainMenu(user);
            }
            return showGradeMenu(user);

        case "5":
            // absences (admin + teacher)
            if (!["admin", "teacher"].includes(role)) {
                console.log("Accès refusé");
                return showMainMenu(user);
            }
            return showStatsMenu(user);

        case "6":
            // statistiques (admin uniquement)
            if (role !== "admin") {
                console.log("Accès refusé");
                return showMainMenu(user);
            }
            return showStatsMenu(user);

        case "0":
            // fermeture application
            console.log("Déconnexion...");
            return process.exit();

        default:
            // choix invalide
            console.log("Choix invalide");
            return showMainMenu(user);
    }
}