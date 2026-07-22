// routes/teacherRoutes.js


import express from "express";


import {

    getTeachers,
    createTeacher,
    editTeacher,
    removeTeacher,
    assignTeacherSubject,
    getSubjects

} from "../controllers/teacherController.js";



const router = express.Router();





// Liste des professeurs

router.get(
    "/",
    getTeachers
);





// Ajouter un professeur

router.post(
    "/",
    createTeacher
);





// Modifier un professeur

router.put(
    "/:id",
    editTeacher
);





// Supprimer un professeur

router.delete(
    "/:id",
    removeTeacher
);






// Récupérer les matières

router.get(
    "/subjects/list",
    getSubjects
);






// Attribuer une matière

router.put(
    "/assign-subject",
    assignTeacherSubject
);





export default router;