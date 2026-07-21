// Gestion des utilisateurs


// Récupération de la zone principale

const adminContent = document.getElementById("content");




// Charger les utilisateurs

async function loadUsers() {

    try {

        const response = await fetch("/api/users");

        const users = await response.json();

        displayUsers(users);

    } catch (error) {

        console.error(
            "Erreur chargement utilisateurs :",
            error
        );

        alert(
            "Impossible de charger les utilisateurs"
        );

    }

}





// ==========================
// Affichage des utilisateurs
// ==========================

function displayUsers(users) {


    adminContent.innerHTML = `

        <h2>
            Gestion utilisateurs
        </h2>


        <button id="addUser">
            Ajouter un utilisateur
        </button>



        <table>


            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Rôle</th>
                    <th>Actions</th>

                </tr>

            </thead>



            <tbody>


                ${users.map(user => `


                    <tr>


                        <td>
                            ${user.id}
                        </td>


                        <td>
                            ${user.nom}
                        </td>


                        <td>
                            ${user.prenom}
                        </td>


                        <td>
                            ${user.role}
                        </td>



                        <td>


                            <button
                                class="edit-user"
                                data-id="${user.id}"
                            >

                                Modifier

                            </button>




                            <button
                                class="delete-user"
                                data-id="${user.id}"
                            >

                                Supprimer

                            </button>



                        </td>


                    </tr>


                `).join("")}



            </tbody>


        </table>


    `;




    // Bouton Ajouter

    document
        .getElementById("addUser")
        .addEventListener(
            "click",
            showAddUserForm
        );





    // ==========================
    // Suppression utilisateur
    // ==========================


    const deleteButtons =
    document.querySelectorAll(
        ".delete-user"
    );



    deleteButtons.forEach(button => {


        button.addEventListener(
            "click",
            async () => {


                const id = button.dataset.id;



                const confirmation = confirm(
                    "Voulez-vous vraiment supprimer cet utilisateur ?"
                );



                if (!confirmation) {

                    return;

                }



                try {


                    const response = await fetch(
                        `/api/users/${id}`,
                        {

                            method: "DELETE"

                        }
                    );



                    const result =
                    await response.json();



                    alert(
                        result.message
                    );



                    loadUsers();



                } catch(error) {


                    console.error(
                        "Erreur suppression :",
                        error
                    );


                    alert(
                        "Impossible de supprimer l'utilisateur"
                    );


                }


            }

        );


    });







    // ==========================
    // Modification utilisateur
    // ==========================


    const editButtons =
    document.querySelectorAll(
        ".edit-user"
    );



    editButtons.forEach(button => {


        button.addEventListener(
            "click",
            () => {


                const id = button.dataset.id;



                showEditUserForm(id);


            }

        );


    });



}









// ==========================
// Formulaire ajout utilisateur
// ==========================

function showAddUserForm() {


    adminContent.innerHTML = `


        <h2>
            Ajouter un utilisateur
        </h2>



        <form id="userForm">


            <input
                type="text"
                id="newNom"
                placeholder="Nom"
                required
            >



            <input
                type="text"
                id="newPrenom"
                placeholder="Prénom"
                required
            >



            <input
                type="password"
                id="newPassword"
                placeholder="Mot de passe"
                required
            >



            <select id="newRole">


                <option value="admin">
                    Administrateur
                </option>


                <option value="teacher">
                    Professeur
                </option>


                <option value="student">
                    Élève
                </option>


            </select>



            <button type="submit">

                Ajouter

            </button>



        </form>


    `;



    document
        .getElementById("userForm")
        .addEventListener(
            "submit",
            addUser
        );


}









// ==========================
// Formulaire modification
// ==========================


async function showEditUserForm(id) {


    try {


        const response = await fetch(
            `/api/users/${id}`
        );


        const user = await response.json();




        adminContent.innerHTML = `


            <h2>
                Modifier utilisateur
            </h2>




            <form id="editUserForm">



                <input
                    type="text"
                    id="editNom"
                    value="${user.nom}"
                    required
                >




                <input
                    type="text"
                    id="editPrenom"
                    value="${user.prenom}"
                    required
                >




                <input
                    type="password"
                    id="editPassword"
                    value="${user.password}"
                    required
                >




                <select id="editRole">


                    <option value="admin"
                    ${user.role === "admin" ? "selected" : ""}>
                        Administrateur
                    </option>


                    <option value="teacher"
                    ${user.role === "teacher" ? "selected" : ""}>
                        Professeur
                    </option>


                    <option value="student"
                    ${user.role === "student" ? "selected" : ""}>
                        Élève
                    </option>



                </select>




                <button type="submit">

                    Enregistrer

                </button>



            </form>


        `;




        document
            .getElementById("editUserForm")
            .addEventListener(
                "submit",
                async function(event){


                    event.preventDefault();



                    const updatedUser = {


                        nom:
                        document.getElementById("editNom").value,


                        prenom:
                        document.getElementById("editPrenom").value,


                        password:
                        document.getElementById("editPassword").value,


                        role:
                        document.getElementById("editRole").value


                    };




                    const updateResponse =
                    await fetch(
                        `/api/users/${id}`,
                        {


                            method:"PUT",


                            headers:{

                                "Content-Type":
                                "application/json"

                            },


                            body:
                            JSON.stringify(updatedUser)


                        }
                    );



                    const result =
                    await updateResponse.json();



                    alert(
                        result.message
                    );



                    loadUsers();


                }

            );




    } catch(error) {


        console.error(
            "Erreur modification utilisateur :",
            error
        );


        alert(
            "Impossible de charger l'utilisateur"
        );


    }


}









// ==========================
// Ajouter utilisateur
// ==========================

async function addUser(event) {


    event.preventDefault();



    const user = {


        nom:
        document.getElementById("newNom").value.trim(),



        prenom:
        document.getElementById("newPrenom").value.trim(),



        password:
        document.getElementById("newPassword").value,



        role:
        document.getElementById("newRole").value


    };




    try {


        const response = await fetch(
            "/api/users",
            {


                method:"POST",


                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify(user)


            }
        );



        const result =
        await response.json();



        alert(
            result.message
        );



        loadUsers();



    } catch(error) {


        console.error(
            "Erreur ajout utilisateur :",
            error
        );



        alert(
            "Erreur pendant l'ajout"
        );


    }


}









// ==========================
// Activation menu utilisateurs
// ==========================


document
    .getElementById("users")
    .addEventListener(
        "click",
        loadUsers
    );