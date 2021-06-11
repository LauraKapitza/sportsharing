
////////////////////////////////////////////////////////////////////////
//////////////// CHECK TIME IS NOT IN THE PAST /////////////////////////
////////////////////////////////////////////////////////////////////////
let $searchDate = document.getElementById("input-date");
let $searchTime = document.getElementById("input-time");

function twoDigitsNumber(myTime) {
  return myTime.toString().length === 2 ? myTime.toString() : "0" + myTime.toString();
}

// CHECK IF ELEMENT IS ON THE PAGE
if ($searchDate) {

  let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
  let tomorrow = new Date(new Date().getTime() + (1000 * 60 * 60 * 24) - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

  $searchDate.setAttribute("min", today);
  $searchDate.setAttribute("value", today);

  let now = new Date();
  let timeNow = twoDigitsNumber(now.getHours()) + ":" + twoDigitsNumber(now.getMinutes());

  //Default min & max time values
  $searchTime.setAttribute("min", "06:00");
  $searchTime.setAttribute("max", "22:00");

  //Gestion de l'affichage par défault en fonction de l'heure
  if (now.getHours() < 6) {
    $searchTime.setAttribute("value", "06:00");
  } else if (now.getHours() >= 22) {
    $searchTime.setAttribute("value", "06:00");
    $searchDate.setAttribute("value", tomorrow);
  } else {
    $searchTime.setAttribute("value", timeNow);
    $searchTime.setAttribute("min", timeNow);
  }

  $searchDate.addEventListener('change', (e) => {
    if ($searchDate.value > today) {
      $searchTime.setAttribute("min", "06:00");
    }
  });
}
////////////////////////////////////////////////////////////////////////
/////////////////// WRITE 'PARTICIPANTS:' IN TABLE /////////////////////
////////////////////////////////////////////////////////////////////////

let $courseDetails = document.getElementById("table-details");

// CHECK IF ELEMENT IS ON THE PAGE
if ($courseDetails) {
  $courseDetails.children[0].children[8].children[0].innerHTML = "Participants:"
}

////////////////////////////////////////////////////////////////////////
/////////////////////// PREVIEW IMAGE UPLOAD ///////////////////////////
////////////////////////////////////////////////////////////////////////
let $inputFile = document.getElementById("input-image");
let $imgProfile = document.querySelector('.user-pic')

if ($inputFile) {
  $inputFile.addEventListener('change', () => {
    $imgProfile.src = window.URL.createObjectURL($inputFile.files[0]);
  })
}
////////////////////////////////////////////////////////////////////////
/////////////////////////// AFFICHER MENU //////////////////////////////
////////////////////////////////////////////////////////////////////////
let $burgerCheckbox = document.getElementById("burger-checkbox");
let $menu = document.querySelector('.menu');
let $searchbar = document.querySelector('.form-searchbar');
let $howTo = document.querySelector('.howto');
let $form = document.querySelector('.form');
let $calendar = document.querySelector('.calendar-container');
let $arrHtmlEl = [$searchbar,$howTo,$form,$calendar];

function displayMenu() {
  //Affichage menu au click sur burger
  $burgerCheckbox.checked ? $menu.style.display = "block" : $menu.style.display = "none";
  //Cacher element 
  $arrHtmlEl.map($el => $el ? ($burgerCheckbox.checked ? $el.style.display = "none" : $el.style.display = "block") : "");
}

$burgerCheckbox.addEventListener('change', () => {
  displayMenu();
})

window.addEventListener('resize', () => {
  window.innerWidth > 900 ? $menu.style.display = "block" : displayMenu();
  $arrHtmlEl.map($el => window.innerWidth > 900 ? $el.style.display = "block" : displayMenu());
});