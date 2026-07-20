// =========================
// DASHBOARD PROFESSEUR
// =========================


console.log("Dashboard professeur chargé");





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
// ACTIONS PROFESSEUR
// =========================


const teacherButtons = document.querySelectorAll(
    ".teacher-menu button"
);



teacherButtons.forEach(function(button){


    button.addEventListener("click", function(){


        alert(
            "Action : " + button.textContent
        );


    });


});