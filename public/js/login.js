// Récupération du formulaire

const buttonLogin = document.querySelector("button");



buttonLogin.addEventListener("click", function(){


    const nom = document.querySelector(
        "input[type='text']"
    ).value;


    const password = document.querySelector(
        "input[type='password']"
    ).value;



    // Vérification simple

    if(nom === "" || password === ""){

        alert("Veuillez remplir tous les champs");

        return;

    }



    // Simulation connexion

    if(password === "admin"){

        window.location.href = "admin.html";

    }

    else if(password === "prof"){

        window.location.href = "teacher.html";

    }

    else if(password === "eleve"){

        window.location.href = "student.html";

    }

    else {

        alert("Identifiants incorrects");

    }


});