// Récupération du formulaire de connexion

const loginForm = document.getElementById("loginForm");



// Écoute de l'envoi du formulaire

loginForm.addEventListener("submit", async function(event) {


    // Empêche le rechargement de la page

    event.preventDefault();



    // Récupération des valeurs

    const nom = document.getElementById("nom").value.trim();

    const prenom = document.getElementById("prenom").value.trim();

    const password = document.getElementById("password").value;



    // Vérification simple

    if (nom === "" || prenom === "" || password === "") {


        alert("Veuillez remplir tous les champs");


        return;

    }



    try {


        const response = await fetch("/api/auth/login", {


            method: "POST",


            headers: {

                "Content-Type": "application/json"

            },


            body: JSON.stringify({

                nom,

                prenom,

                password

            })


        });



        // Récupération de la réponse JSON du serveur

        const result = await response.json();



        console.log(result);



        // Vérification de la connexion

        if (result.success) {



            switch (result.role) {



                case "admin":

                    window.location.href = "/html/admin.html";

                    break;



                case "teacher":

                    window.location.href = "/html/teacher.html";

                    break;



                case "student":

                    window.location.href = "/html/student.html";

                    break;



                default:

                    alert("Rôle utilisateur inconnu");

            }



        } else {


            alert(result.message);


        }



    } catch (error) {



        console.error(

            "Erreur connexion :",

            error

        );



        alert("Impossible de contacter le serveur");


    }


});