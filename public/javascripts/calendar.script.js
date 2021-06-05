//WEEK NAV BTN
const $btnPreviousWeek = document.querySelector('.btn-previous-week');
const $btnNextWeek =document.querySelector('.btn-next-week');
const $p = document.querySelector('.current-week');


////////////////////////////////////////////////////////////////////////
////////////////////////// FUNCTIONS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////

//GET FIRST DAY OF A WEEK
function startOfWeek(date) {
  let firstDay = date.getDate() - date.getDay() + (date.getDay === 0 ? -6 : 1);
  return new Date(date.setDate(firstDay))
}

function endOfWeek(date) {
  let lastDay = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastDay))
}

//CHANGE FORMAT OF DATE
function getFormattedDate(date) {
  let dd = String(date.getDate());
  let mm = String(date.getMonth() + 1);
  let yy = String(date.getFullYear());
  
  if (mm.length < 2) mm = '0' + mm;
  if (dd.length < 2) dd = '0' + dd;
  
  return `${dd}/${mm}/${yy}`
}

//CHANGE WEEK NAV BTN VALUE
function showCurrentWeek() {
  let today = new Date()
  let firstDay = startOfWeek(today)
  let lastDay = endOfWeek(today)
  
  let firstDayFormatted = getFormattedDate(firstDay);
  let lastDayFormatted = getFormattedDate(lastDay)
  
  $p.innerHTML = `${firstDayFormatted} - ${lastDayFormatted}`
}

showCurrentWeek()

// GET FIRST DAY OF NEXT WEEK
function startOfNextWeek(firstDay){
  let day = new Date(firstDay.getTime() + 24 * 60 * 60 * 1000)
  let week = new Date(day.getFullYear(), day.getMonth(), day.getDate()+6);
  return week;
}

// GET FIRST DAY OF PREVIOUS WEEK
function startOfPreviousWeek(firstDay){
  let day = new Date(firstDay.getTime() - 24 * 60 * 60 * 1000)
  let week = new Date(day.getFullYear(), day.getMonth(), day.getDate()-6);
  return week;
}

//GET DATES OF TUESDAY - SUNDAY
function daysOfWeek(monday) {
  const weekArr = [];
  for(i=0; i<7; i++) {
    let day = monday.getDate() - (monday.getDay() - 1) + i;
    weekArr.push(new Date(monday.setDate(day)))
  }
  console.log(weekArr)
  return weekArr;
}

// UPDATE DAY SLOTS ON DOM
function updateWeek(firstday) {
  let weekdays = daysOfWeek(firstday);
  const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = weekdays

  let mondayFormatted = getFormattedDate(monday);
  let sundayFormatted = getFormattedDate(sunday);
  $p.innerHTML = `${mondayFormatted} - ${sundayFormatted}`;
  
  document.getElementById('monday').innerHTML = mondayFormatted;
  document.getElementById('tuesday').innerHTML = getFormattedDate(tuesday);
  document.getElementById('wednesday').innerHTML = getFormattedDate(wednesday);
  document.getElementById('thursday').innerHTML = getFormattedDate(thursday);
  document.getElementById('friday').innerHTML = getFormattedDate(friday);
  document.getElementById('saturday').innerHTML = getFormattedDate(saturday);
  document.getElementById('sunday').innerHTML = sundayFormatted;
}

////////////////////////////////////////////////////////////////////////
/////////////////////// EVENT LISTENERS ////////////////////////////////
////////////////////////////////////////////////////////////////////////

//WEEK BTN
$btnNextWeek.addEventListener('click', () => {
  let arr = $p.innerHTML.slice(0, 10).split("/");
  let date = new Date(`${arr[2]}/${arr[1]}/${arr[0]}`);
  let nextWeek = startOfNextWeek(date);
  updateWeek(nextWeek);
});

$btnPreviousWeek.addEventListener('click', () => {
  let arr = $p.innerHTML.slice(0, 10).split("/");
  let date = new Date(`${arr[2]}/${arr[1]}/${arr[0]}`);
  let previousWeek = startOfPreviousWeek(date);
  updateWeek(previousWeek);
});

