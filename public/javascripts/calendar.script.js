const $btnPreviousWeek = document.querySelector('.btn-previous-week');
const $btnNextWeek =document.querySelector('.btn-previous-week');
const $p = document.querySelector('.current-week');


////////////////////////////////////////////////////////////////////////
////////////////////////// FUNCTIONS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////

function startOfWeek(date) {
  let firstDay = date.getDate() - date.getDay() + (date.getDay === 0 ? -6 : 1)
  return new Date(date.setDate(firstDay))
}

function startOfNextWeek(date){
  let nextweek = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7);
  return nextweek;
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

  console.log('first day', firstDayFormatted)
  console.log('last day', lastDayFormatted)

  $p.innerHTML = `${firstDayFormatted} - ${lastDayFormatted}`
}

showCurrentWeek()


////////////////////////////////////////////////////////////////////////
/////////////////////// EVENT LISTENERS ////////////////////////////////
////////////////////////////////////////////////////////////////////////

$btnNextWeek.addEventListener('click', (e) => {
  // let firstDay = $p.innerHTML
  let nextWeek = startOfWeek(firstDay)
}, false);

$btnPreviousWeek.addEventListener('click', (e) => {
  console.log('previous weekti')
}, false);
