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





teachersButton.addEventListener(
    "click",
    function(){

        loadTeachers();

    }
);



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





// Statistiques

statsButton.addEventListener(
    "click",
    loadStats
);



async function loadStats() {

    try {

        const response = await fetch(
            "/api/stats"
        );

        const stats = await response.json();

        content.innerHTML = `

            <h2>
                Statistiques
            </h2>

            <div class="cards">

                <div class="card">

                    <h3>Utilisateurs</h3>

                    <p>${stats.utilisateurs}</p>

                </div>

                <div class="card">

                    <h3>Élèves</h3>

                    <p>${stats.eleves}</p>

                </div>

                <div class="card">

                    <h3>Professeurs</h3>

                    <p>${stats.professeurs}</p>

                </div>

                <div class="card">

                    <h3>Matières</h3>

                    <p>${stats.matieres}</p>

                </div>

                <div class="card">

                    <h3>Notes</h3>

                    <p>${stats.notes}</p>

                </div>

                <div class="card">

                    <h3>Absences</h3>

                    <p>${stats.absences}</p>

                </div>

                <div class="card">

                    <h3>Moyenne générale</h3>

                    <p>${stats.moyenneGenerale ?? 0}</p>

                </div>

                <div class="card">

                    <h3>Meilleur élève</h3>

                    <p>

                        ${
                            stats.meilleurEleve
                                ? `${stats.meilleurEleve.nom} ${stats.meilleurEleve.prenom} (${Number(stats.meilleurEleve.moyenne).toFixed(2)})`
                                : "Aucun"
                        }

                    </p>

                </div>

            </div>

        `;

    } catch (error) {

        console.error(
            "Erreur statistiques :",
            error
        );

        alert(
            "Impossible de charger les statistiques."
        );

    }

}





// ==========================
// Déconnexion
// ==========================


logoutButton.addEventListener("click", () => {


    window.location.href = "/html/index.html";


});