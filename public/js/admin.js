// =========================
// DASHBOARD ADMIN
// =========================



console.log("Dashboard admin chargé");





// =========================
// DECONNEXION
// =========================


const logoutButton = document.querySelector("header button");



if(logoutButton){


    logoutButton.addEventListener("click", function(){


        window.location.href = "index.html";


    });


}







// BOUTONS ADMIN



const adminButtons = document.querySelectorAll(
    ".admin-menu button"
);



adminButtons.forEach(function(button){


    button.addEventListener("click", function(){


        alert(
            "Fonction : " + button.textContent
        );


    });


});