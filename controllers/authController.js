// controllers/authController.js

import { findUserByLogin } from "../services/userService.js";


// ===============================
// CONNEXION UTILISATEUR
// ===============================

export function login(req, res) {


    try {


        const { nom, prenom, password } = req.body;



        // Vérifier les champs
        if (!nom || !prenom || !password) {

            return res.status(400).send(
                "Veuillez remplir tous les champs"
            );

        }



        // Recherche utilisateur via userService
        const user = findUserByLogin(
            nom,
            prenom,
            password
        );



        // Si utilisateur introuvable
        if (!user) {

            return res.status(401).send(
                "Nom, prénom ou mot de passe incorrect"
            );

        }



        // Redirection selon le rôle

        switch (user.role) {


            case "admin":

                return res.redirect(
                    "/html/admin.html"
                );



            case "teacher":

                return res.redirect(
                    "/html/teacher.html"
                );



            case "student":

                return res.redirect(
                    "/html/student.html"
                );



            default:

                return res.status(403).send(
                    "Rôle utilisateur inconnu"
                );

        }



    } catch (error) {


        console.error(
            "Erreur connexion :",
            error
        );


        return res.status(500).send(
            "Erreur serveur"
        );


    }

}