const $div = document.getElementById('course-list');

////////////////////////////////////////////////////////////////////////
////////////////////////// FUNCTIONS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////

function updateCalendar(data) {
  $div.innerHTML = data;
}

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
function showWeek(day) {
  
  let firstDay = startOfWeek(day)
  let lastDay = endOfWeek(day)
  
  let firstDayFormatted = getFormattedDate(firstDay);
  let lastDayFormatted = getFormattedDate(lastDay)
  
  document.querySelector('.current-week').innerHTML = `${firstDayFormatted} - ${lastDayFormatted}`
  
  axios.post('/courses', {
    firstday: firstDayFormatted,
    lastday: lastDayFormatted
  })
  .then((response) => updateCalendar(response.data))
  .catch(err => console.log(`Error while sending the week dates: ${err}`))
}

// GET FIRST DAY OF NEXT WEEK
function startOfNextWeek(firstDay){
  let startdate = new Date(firstDay.getTime() + 24 * 60 * 60 * 1000)
  let dateFormatted = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()+6);
  return dateFormatted;
}

// GET FIRST DAY OF PREVIOUS WEEK
function startOfPreviousWeek(firstDay){
  let startdate = new Date(firstDay.getTime() - 24 * 60 * 60 * 1000)
  let dateFormatted = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()-6);
  return dateFormatted;
}

//GET DATES OF TUESDAY - SUNDAY
function daysOfWeek(monday) {
  const weekArr = [];
  for(i=0; i<7; i++) {
    let day = monday.getDate() - (monday.getDay() - 1) + i;
    weekArr.push(new Date(monday.setDate(day)))
  }
  return weekArr;
}

// UPDATE DAY SLOTS ON DOM
function updateWeek(firstday) {
  let weekdays = daysOfWeek(firstday);
  const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = weekdays
  
  let mondayFormatted = getFormattedDate(monday);
  let sundayFormatted = getFormattedDate(sunday);
  document.querySelector('.current-week').innerHTML = `${mondayFormatted} - ${sundayFormatted}`;
  
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
window.addEventListener('load', () => {
  showWeek(new Date())
})


//WEEK BTN
document.querySelector('.btn-next-week').addEventListener('click', () => {
  let arr = document.querySelector('.current-week').innerHTML.slice(0, 10).split("/");
  let date = new Date(`${arr[2]}/${arr[1]}/${arr[0]}`);
  let nextWeek = startOfNextWeek(date);
  updateWeek(nextWeek);
});

document.querySelector('.btn-previous-week').addEventListener('click', () => {
  let arr = document.querySelector('.current-week').innerHTML.slice(0, 10).split("/");
  let date = new Date(`${arr[2]}/${arr[1]}/${arr[0]}`);
  let previousWeek = startOfPreviousWeek(date);
  updateWeek(previousWeek);
});

