const $btnPreviousWeek = document.querySelector('.btn-previous-week');
const $btnNextWeek =document.querySelector('.btn-next-week');
const $p = document.querySelector('.current-week');


////////////////////////////////////////////////////////////////////////
////////////////////////// FUNCTIONS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////

// CURRENT WEEK

function startOfWeek(date) {
  let firstDay = date.getDate() - date.getDay() + (date.getDay === 0 ? -6 : 1);
  return new Date(date.setDate(firstDay))
}

function endOfWeek(date) {
  let lastDay = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastDay))
}

function getFormattedDate(date) {
  let dd = String(date.getDate());
  let mm = String(date.getMonth() + 1);
  let yy = String(date.getFullYear());
  
  if (mm.length < 2) mm = '0' + mm;
  if (dd.length < 2) dd = '0' + dd;
  
  return `${dd}/${mm}/${yy}`
}

function showCurrentWeek() {
  let today = new Date()
  let firstDay = startOfWeek(today)
  let lastDay = endOfWeek(today)
  
  let firstDayFormatted = getFormattedDate(firstDay);
  let lastDayFormatted = getFormattedDate(lastDay)
  
  $p.innerHTML = `${firstDayFormatted} - ${lastDayFormatted}`
}

showCurrentWeek()

// NEXT WEEK

function startOfNextWeek(date){
  let day = new Date(date.getTime() + 24 * 60 * 60 * 1000)
  let week = new Date(day.getFullYear(), day.getMonth(), day.getDate()+6);
  return week;
}

// PREVIOUS WEEK

function startOfPreviousWeek(date){
  let day = new Date(date.getTime() - 24 * 60 * 60 * 1000)
  let week = new Date(day.getFullYear(), day.getMonth(), day.getDate()-6);
  return week;
}

// UPDATE WEEK

function updateWeek(date) {
  let firstDay = startOfWeek(date)
  let lastDay = endOfWeek(date)
  
  let firstDayFormatted = getFormattedDate(firstDay);
  let lastDayFormatted = getFormattedDate(lastDay)
  
  $p.innerHTML = `${firstDayFormatted} - ${lastDayFormatted}`
}


////////////////////////////////////////////////////////////////////////
/////////////////////// EVENT LISTENERS ////////////////////////////////
////////////////////////////////////////////////////////////////////////

$btnNextWeek.addEventListener('click', (e) => {
  let arr = $p.innerHTML.slice(0, 10).split("/");
  let date = new Date(`${arr[2]}/${arr[1]}/${arr[0]}`);
  let nextWeek = startOfNextWeek(date);
  updateWeek(nextWeek);
});

$btnPreviousWeek.addEventListener('click', (e) => {
  let arr = $p.innerHTML.slice(0, 10).split("/");
  let date = new Date(`${arr[2]}/${arr[1]}/${arr[0]}`);
  let previousWeek = startOfPreviousWeek(date);
  updateWeek(previousWeek);
});
