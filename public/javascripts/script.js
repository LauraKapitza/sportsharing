document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

////////////////////////////////////////////////////////////////////////
//////////////// CHECK TIME IS NOT IN THE PAST /////////////////////////
////////////////////////////////////////////////////////////////////////
let $searchDate = document.getElementById("input-date");
let $searchTime = document.getElementById("input-time");

let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
let tomorrow = new Date(new Date().getTime()+(1000*60*60*24)- new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

$searchDate.setAttribute("min", today); 
$searchDate.setAttribute("value", today); 

function twoDigitsNumber(myTime) {
  return myTime.toString().length === 2 ? myTime.toString() : "0" + myTime.toString();
}

let now = new Date();
let timeNow = twoDigitsNumber(now.getHours())+":"+twoDigitsNumber(now.getMinutes());

//Default min & max time values
$searchTime.setAttribute("min","06:00");
$searchTime.setAttribute("max","22:00");

//Gestion de l'affichage par défault en fonction de l'heure
if (now.getHours() < 6 ){
  $searchTime.setAttribute("value","06:00");
} else if  (now.getHours() >= 22 ){
  $searchTime.setAttribute("value","06:00");
  $searchDate.setAttribute("value", tomorrow);   
} else{
  $searchTime.setAttribute("value",timeNow);
  $searchTime.setAttribute("min",timeNow);
}

$searchDate.addEventListener('change',(e)=>{
  if ($searchDate.value > today){
    $searchTime.setAttribute("min","06:00");
  }  
});