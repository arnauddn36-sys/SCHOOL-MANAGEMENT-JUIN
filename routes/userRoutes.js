// routes/userRoutes.js


import express from "express";


import {
    getUsers,
    getUser,
    createUser,
    editUser,
    removeUser
} from "../controllers/userController.js";


const router = express.Router();



// Récupérer tous les utilisateurs

router.get("/", getUsers);



// Récupérer un utilisateur par ID

router.get("/:id", getUser);



// Ajouter un utilisateur

router.post("/", createUser);



// Modifier un utilisateur

router.put("/:id", editUser);



// Supprimer un utilisateur

router.delete("/:id", removeUser);



export default router;