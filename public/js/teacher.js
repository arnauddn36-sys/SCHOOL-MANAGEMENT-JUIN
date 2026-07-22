// ==========================
// Gestion des professeurs
// ==========================


// Zone principale
console.log("teachers.js chargé");
const adminContent = document.getElementById("content");






// ==========================
// Charger les professeurs
// ==========================

async function loadTeachers(){


    try{


        const response = await fetch(
            "/api/teachers"
        );


        const teachers = await response.json();


        displayTeachers(teachers);



    }catch(error){


        console.error(
            "Erreur chargement professeurs :",
            error
        );


        alert(
            "Impossible de charger les professeurs"
        );


    }


}







// ==========================
// Affichage des professeurs
// ==========================

function displayTeachers(teachers){



    adminContent.innerHTML = `


        <h2>
            Gestion professeurs
        </h2>



        <button id="addTeacher">

            Ajouter un professeur

        </button>





        <table>


            <thead>


                <tr>

                    <th>ID</th>

                    <th>Nom</th>

                    <th>Prénom</th>

                    <th>Matière</th>

                    <th>Actions</th>


                </tr>


            </thead>




            <tbody>


            ${teachers.map(teacher => `


                <tr>


                    <td>
                        ${teacher.id}
                    </td>



                    <td>
                        ${teacher.nom}
                    </td>



                    <td>
                        ${teacher.prenom}
                    </td>



                    <td>
                        ${teacher.matiere ?? "Aucune"}
                    </td>



                    <td>


                        <button
                            class="delete-teacher"
                            data-id="${teacher.id}"
                        >

                            Supprimer

                        </button>



                    </td>


                </tr>


            `).join("")}


            </tbody>


        </table>



    `;





    // Bouton ajout

    document
        .getElementById("addTeacher")
        .addEventListener(
            "click",
            showAddTeacherForm
        );





    // Boutons suppression

    const deleteButtons =
    document.querySelectorAll(
        ".delete-teacher"
    );



    deleteButtons.forEach(button => {



        button.addEventListener(
            "click",
            deleteTeacher
        );


    });



}








// ==========================
// Formulaire ajout
// ==========================


function showAddTeacherForm(){


    adminContent.innerHTML = `


        <h2>
            Ajouter un professeur
        </h2>




        <form id="teacherForm">


            <input

                type="text"

                id="teacherNom"

                placeholder="Nom"

                required

            >




            <input

                type="text"

                id="teacherPrenom"

                placeholder="Prénom"

                required

            >





            <button type="submit">

                Ajouter

            </button>



        </form>


    `;





    document
        .getElementById("teacherForm")
        .addEventListener(
            "submit",
            addTeacher
        );



}









// ==========================
// Ajouter professeur
// ==========================


async function addTeacher(event){


    event.preventDefault();




    const teacher = {


        nom:
        document
        .getElementById("teacherNom")
        .value
        .trim(),



        prenom:
        document
        .getElementById("teacherPrenom")
        .value
        .trim()


    };






    const response = await fetch(
        "/api/teachers",
        {


            method:"POST",


            headers:{


                "Content-Type":
                "application/json"


            },


            body:
            JSON.stringify(teacher)



        }
    );




    const result = await response.json();



    alert(
        result.message
    );



    loadTeachers();



}








// ==========================
// Supprimer professeur
// ==========================


async function deleteTeacher(event){



    const id =
    event.target.dataset.id;



    const confirmation =
    confirm(
        "Supprimer ce professeur ?"
    );



    if(!confirmation){

        return;

    }





    const response = await fetch(

        `/api/teachers/${id}`,

        {

            method:"DELETE"

        }

    );





    const result =
    await response.json();




    alert(
        result.message
    );



    loadTeachers();


}






// ==========================
// Activation bouton admin
// ==========================


document
.getElementById("teachers")
.addEventListener(
    "click",
    loadTeachers
);