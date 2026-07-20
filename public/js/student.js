// =========================
// DASHBOARD ELEVE
// =========================


console.log("Dashboard élève chargé");





// =========================
// DECONNEXION
// =========================


const logoutButton = document.querySelector("header button");



if(logoutButton){


    logoutButton.addEventListener("click", function(){


        window.location.href = "index.html";


    });


}






// =========================
// ACTIONS ELEVE
// =========================


const studentButtons = document.querySelectorAll(
    ".student-menu button"
);



studentButtons.forEach(function(button){


    button.addEventListener("click", function(){


        alert(
            "Consultation : " + button.textContent
        );


    });


});