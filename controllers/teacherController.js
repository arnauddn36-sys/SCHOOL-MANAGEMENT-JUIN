// controllers/teacherController.js


import {

    listTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    assignSubject,
    listSubjects

} from "../services/teacherService.js";





// ==========================
// Afficher les professeurs
// ==========================

export function getTeachers(req, res) {


    try {


        const teachers = listTeachers();


        res.json(teachers);



    } catch(error) {


        console.error(
            "Erreur récupération professeurs :",
            error
        );


        res.status(500).json({

            message: "Erreur serveur"

        });


    }


}







// ==========================
// Ajouter un professeur
// ==========================

export function createTeacher(req, res) {


    try {


        const {

            nom,
            prenom

        } = req.body;




        if(!nom || !prenom){


            return res.status(400).json({

                message:"Nom et prénom obligatoires"

            });


        }




        addTeacher(
            nom,
            prenom
        );



        res.json({

            message:"Professeur ajouté avec succès"

        });



    }catch(error){


        console.error(
            "Erreur ajout professeur :",
            error
        );


        res.status(500).json({

            message:"Erreur serveur"

        });


    }


}







// ==========================
// Modifier un professeur
// ==========================

export function editTeacher(req,res){


    try{


        const id = req.params.id;


        const {

            nom,
            prenom

        } = req.body;



        updateTeacher(
            id,
            nom,
            prenom
        );



        res.json({

            message:"Professeur modifié"

        });



    }catch(error){


        console.error(error);


        res.status(500).json({

            message:"Erreur serveur"

        });


    }


}







// ==========================
// Supprimer un professeur
// ==========================

export function removeTeacher(req,res){


    try{


        const id = req.params.id;



        deleteTeacher(id);



        res.json({

            message:"Professeur supprimé"

        });



    }catch(error){


        console.error(error);


        res.status(500).json({

            message:"Erreur serveur"

        });


    }


}







// ==========================
// Assigner une matière
// ==========================

export function assignTeacherSubject(req,res){


    try{


        const {

            teacherId,
            subjectId

        } = req.body;




        assignSubject(
            teacherId,
            subjectId
        );




        res.json({

            message:"Matière attribuée au professeur"

        });



    }catch(error){


        console.error(error);


        res.status(500).json({

            message:"Erreur serveur"

        });


    }


}







// Liste des matières

export function getSubjects(req,res){


    try{


        const subjects = listSubjects();


        res.json(subjects);



    }catch(error){


        console.error(error);


        res.status(500).json({

            message:"Erreur serveur"

        });


    }


}