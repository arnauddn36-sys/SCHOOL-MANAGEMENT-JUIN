// server.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";


// Création du serveur Express
const app = express();




// Gestion du chemin du projet
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Permet de récupérer les données des formulaires HTML
app.use(express.urlencoded({ extended: true }));


// Permet de recevoir des données JSON
app.use(express.json());



// Rend le dossier public accessible
// Exemple : public/html/index.html devient /html/index.html
app.use(express.static(path.join(__dirname, "public")));




// ROUTES


// Routes d'authentification
app.use("/api/auth", authRoutes);


app.use("/api/users", userRoutes);

// Route de test
app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public/html/index.html")
    );

});



// Lancement du serveur
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur démarré avec succès !`);
    console.log(`PC : http://localhost:${PORT}`);
});