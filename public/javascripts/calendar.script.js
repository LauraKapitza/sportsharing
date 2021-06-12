////// TIPPS ANTOINE POUR APPLIQUER JS COTE CLIENT SUR CERTAINES PAGE /////

const pathname = new URL(location.href).pathname

if (pathname === '/courses') {

  const $div = document.getElementById('course-list');

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////// FUNCTIONS ///////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  //UPDATE DOM FOR CALENDAR LIST
  function updateCalendar(data) {
    $div.innerHTML = data;
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

    
    let firstDayFormatted = getFormattedDate(monday);
    let lastDayFormatted = getFormattedDate(sunday);

    document.querySelector('.current-week').innerHTML = `${firstDayFormatted} - ${lastDayFormatted}`;
    
    axios.post('/courses', {
      firstday: firstDayFormatted,
      lastday: lastDayFormatted
    })
    .then((response) => updateCalendar(response.data))
    .catch(err => console.log(`Error while sending the week dates: ${err}`))
  }


  ////////////////////////////////////////////////////////////////////////
  /////////////////////// EVENT LISTENERS ////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  window.addEventListener('load', () => {
    let today = new Date()
    updateWeek(today)
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


  const form = document.getElementById("searchbar-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = {};
    let formData = new FormData(form)
    formData.forEach((value, key) => data[key] = value);

    axios.post('/courses', data)
      .then((response) => updateCalendar(response.data))
      .catch(err => console.log(`Error while sending the week dates: ${err}`))
  }, false);

}
