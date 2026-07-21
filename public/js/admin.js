// ==========================
// Récupération des éléments
// ==========================


const content = document.getElementById("content");


const logoutButton = document.getElementById("logout");


const usersButton = document.getElementById("users");

const studentsButton = document.getElementById("students");

const teachersButton = document.getElementById("teachers");

const subjectsButton = document.getElementById("subjects");

const gradesButton = document.getElementById("grades");

const absencesButton = document.getElementById("absences");

const statsButton = document.getElementById("stats");





// ==========================
// Fonction affichage contenu
// ==========================


function showContent(title, message) {


    content.innerHTML = `

        <h2>
            ${title}
        </h2>


        <p>
            ${message}
        </p>

    `;


}







// ==========================
// Gestion des boutons
// ==========================









studentsButton.addEventListener("click", () => {


    showContent(
        "Gestion élèves",
        "Ici nous allons gérer les élèves."
    );


});





teachersButton.addEventListener("click", () => {


    showContent(
        "Gestion professeurs",
        "Ici nous allons gérer les professeurs."
    );


});





subjectsButton.addEventListener("click", () => {


    showContent(
        "Gestion matières",
        "Ici nous allons gérer les matières."
    );


});





gradesButton.addEventListener("click", () => {


    showContent(
        "Gestion notes",
        "Ici nous allons gérer les notes."
    );


});





absencesButton.addEventListener("click", () => {


    showContent(
        "Gestion absences",
        "Ici nous allons gérer les absences."
    );


});





statsButton.addEventListener("click", () => {


    showContent(
        "Statistiques",
        "Ici nous afficherons les statistiques."
    );


});







// ==========================
// Déconnexion
// ==========================


logoutButton.addEventListener("click", () => {


    window.location.href = "/html/index.html";


});