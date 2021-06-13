const express = require('express');
const router = express.Router();

const Courses = require('../models/Course.model');
const { CATEGORIES, WEEKDAYS } = require('../constants');

const weekDayToIndex = {
  'Mon': 0,
  'Tue': 1,
  'Wed': 2,
  'Thu': 3,
  'Fri': 4,
  'Sat': 5,
  'Sun': 6
}

////////////////////////
//FUNCTIONS
////////////////////////

function formatDate(date) {
  let dd = String(date.getDate());
  let mm = String(date.getMonth() + 1);
  let yy = String(date.getFullYear());
  
  if (mm.length < 2) mm = '0' + mm;
  if (dd.length < 2) dd = '0' + dd;
  
  return `${dd}/${mm}/${yy}`
}

function datesOfWeek(monday) {
  let _monday = new Date(monday);
  const weekArr = [];
  for(i=0; i<7; i++) {
    let diff = _monday.getDate() - (_monday.getDay() - 1) + i;
    let day = new Date(_monday.setDate(diff))
    weekArr.push(formatDate(day))
  }
  return weekArr;
}

function formatCourses(coursesFromDB, dates, currentUser, specificDay) {
  let results = []
  for (let index = 0; index < 7; index++) {
    results.push({
      courses: [],
      date: dates[index],
      dayName: WEEKDAYS[index]
    })
  }
  
  coursesFromDB.forEach(course => {
    let day = course.date.toString().slice('', 3);
    // get the index of the current day, 0 is monday
    let index = weekDayToIndex[day];
    // place the course in the correct day based on the index

    let _course = {
      startTime: course.startTime,
      category: course.category,
      courseName: course.courseName,
      _id: course._id,
      organizer_is_user: course.courseOwner._id == currentUser ? true : false,
      participant_is_user: false,
    }

    course.participants.forEach(participant => {
      if (participant._id == currentUser) {
        _course.participant_is_user = true;
      }
    });


    results[index].courses.push(_course);
  });

  // assign the date to each day.
  results.map((el, k) => el.date = dates[k])

  // handle search bar cases where we need only one result
  // find in 'results' the day with the date of 'specificDay'
  // return this result only
  if (specificDay){
    for (let index = 0; index < results.length; index++) {
      if (results[index].date == formatDate(specificDay)){
        return [results[index]]
      }
    }
  }

  return results;
}


////////////////////////
//ROUTES
////////////////////////

router.get('/courses', (req, res, next) => {
  Courses.find()
    .then(coursesFromDB => {
      const data = {
        courses: coursesFromDB,
        categories: CATEGORIES
      }
      if (req.session.currentUser) data.user = req.session.currentUser;
      res.render('courses/courses', data)
    })
    .catch(err => next(err))
});

router.post('/courses', (req, res, next) => {
  let firstDay;
  let lastDay;

  if (req.body.date) {
    let day = new Date(req.body.date)
    let diff = day.getDate() - day.getDay() + (day.getDay() === 0 ? -6 : 1)
    firstDay = new Date(day.setDate(diff))
    let dates = datesOfWeek(firstDay)
    
    let selectedDay = new Date(req.body.date);
    lastDay = new Date(req.body.date);
    lastDay.setDate(lastDay.getDate()+1);

    Courses.find({$and:[
      {date: {$gte: selectedDay}}, 
      {date: {$lt: lastDay}},
      {startTime: {$gte: req.body.startTime}},
      {category: req.body.category},
      {city: req.body.location}
    ]})
      .populate('courseOwner')
      .populate('participants')
      .then(coursesFromDB => {
        res.render('courses/calendar', {
          calendar: formatCourses(coursesFromDB, dates, req.session.currentUser._id, selectedDay),
          layout: false
        });
      })
      .catch(err => next(err))

  } else {
    const monday = req.body.firstday.split('/');
    const sunday = req.body.lastday.split('/');
    firstDay = new Date(`${monday[2]}-${monday[1]}-${monday[0]}`);
    lastDay = new Date(`${sunday[2]}-${sunday[1]}-${sunday[0]}`);
    let dates = datesOfWeek(firstDay)

    Courses.find({
      $and: [
        { date: { $gte: firstDay } },
        { date: { $lte: lastDay } }
      ]
    })
      .populate('courseOwner')
      .populate('participants')
      .then(coursesFromDB => {
        res.render('courses/calendar', {
          calendar: formatCourses(coursesFromDB, dates, req.session.currentUser._id),
          layout: false
        })
      })
      .catch(err => next(err))
  }
})

//Route get pour la création d'un nouveau cours
router.get('/courses/add', (req, res, next) => {
  if (!req.session.currentUser) {
    res.render('auth/login', { errorMessage: 'Please log in to add a course.' });
  } else {
    res.render('courses/new', {
      user: req.session.currentUser,
      categories: CATEGORIES
    })
  }
});

//Route post pour la création d'un nouveau cours
router.post('/courses/add', (req, res, next) => {
  if (!req.session.currentUser) {
    res.render('auth/login', { 
      errorMessage: 'Please log in to add a course.' 
    });
  } else {
    Courses.create({
      courseOwner: req.session.currentUser._id,
      courseName: req.body.courseName,
      date: req.body.date,
      startTime: req.body.startTime,
      maxParticipants: req.body.maxParticipants,
      participants: [],
      address: req.body.address,
      zip: req.body.zip,
      city: req.body.city,
      category: req.body.category,
      description: req.body.description
    })
      .then(() => res.redirect('/courses'))
      .catch(err => next(err))
  }
})

router.get('/courses/:id/edit', (req, res, next) => {
  Courses.findById(req.params.id)
    .populate('courseOwner')
    .populate('participants')
    .then(courseFromDB => res.render('courses/edit', {
      course: courseFromDB,
      user: req.session.currentUser,
      categories: CATEGORIES
    }))
    .catch(err => next(err))
})

router.get('/courses/:id/delete', (req, res, next) => {
  Courses.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/courses'))
    .catch(err => next(err))
})

router.post('/courses/:id/join', (req, res, next) => {
  Courses.findById(req.params.id)
    .then(courseFromDB => {
      courseFromDB.participants.push(req.session.currentUser._id)
      courseFromDB.save()
        .then(res.redirect(`/courses/${req.params.id}`))
        .catch(next)
    })
    .catch(err => next(err))
});

router.post('/courses/:id/unsubscribe', (req, res, next) => {
  Courses.findById(req.params.id)
    .then(courseFromDB => {
      courseFromDB.participants = courseFromDB.participants.filter(participant => participant != req.session.currentUser._id);
      courseFromDB.save()
        .then(res.redirect(`/courses/${req.params.id}`))
        .catch(next)
    })
    .catch(err => next(err))
});

router.post('/courses/:id', (req, res, next) => {
  Courses.findByIdAndUpdate(
    req.params.id,
    {
      courseName: req.body.courseName,
      date: req.body.date,
      startTime: req.body.startTime,
      maxParticipants: req.body.maxParticipants,
      address: req.body.address,
      zip: req.body.zip,
      city: req.body.city,
      category: req.body.category,
      description: req.body.description
    },
    { new: true }
  )
    .then(() => res.redirect(`/courses/${req.params.id}`))
    .catch(err => next(err))
})

////////////////////////////////////////////////////////////////////////
///////////CHECK IF USER ALREADY SIGN INTO A COURSE ////////////////////
////////////////////////////////////////////////////////////////////////
function isAlreadyParticipant(arr, user) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id == user._id) {
      return true;
    }
  }
  return false;
}

////////////////////////////////////////////////////////////////////////
////////////////CONVERT DATE FROM DB TO DD-MM-YYYY /////////////////////
////////////////////////////////////////////////////////////////////////

function twoDigitsNumber(myTime) {
  return myTime.toString().length === 2 ? myTime.toString() : "0" + myTime.toString();
}

function dateConvertion(date) {
  var day = twoDigitsNumber(date.getDate());
  var month = twoDigitsNumber(date.getMonth() + 1);
  var year = date.getFullYear();
  return day + "-" + month + "-" + year;
}

router.get('/courses/:id', (req, res, next) => {
  Courses.findById(req.params.id)
    .populate('courseOwner')
    .populate('participants')
    .then(courseFromDB => {
      //0. User non connecté    
      if (!req.session.currentUser) {
        res.render('auth/login', { errorMessage: 'Please log in to access course details.' });
      }
      //1. User = Organisateur
      else if (req.session.currentUser._id == courseFromDB.courseOwner._id) {
        res.render('courses/details', {
          course: courseFromDB,
          convertedDate: dateConvertion(courseFromDB.date),
          spaceTaken: courseFromDB.maxParticipants - courseFromDB.participants.length,
          user: req.session.currentUser,
          userCourseOwner: true
        })
        //2. User = Participant
      } else if (isAlreadyParticipant(courseFromDB.participants, req.session.currentUser)) {
        res.render('courses/details', {
          course: courseFromDB,
          convertedDate: dateConvertion(courseFromDB.date),
          spaceTaken: courseFromDB.maxParticipants - courseFromDB.participants.length,
          user: req.session.currentUser,
          userSignUp: true
        })
        //3. User != Participant && != Owner => il peut s'inscrire
      } else {
        res.render('courses/details', {
          course: courseFromDB,
          convertedDate: dateConvertion(courseFromDB.date),
          spaceTaken: courseFromDB.maxParticipants - courseFromDB.participants.length,
          user: req.session.currentUser
        })
      }
    })
    .catch(err => next(err))
})

module.exports = router;