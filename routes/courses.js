const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Courses = require('../models/Course.model');
const CATEGORIES = require('../constants');


router.get('/courses', (req, res, next) => {
  Courses.find()
    .then(coursesFromDB => {
      coursesFromDB.forEach((course, i) => {
        day = course.date.toString().slice('', 3)
        console.log(day)
      })
      const data = {
        courses: courses,
        categories: CATEGORIES
      }
      if (req.session.currentUser) data.user=req.session.currentUser;
      res.render('courses/courses', data)
    })
    .catch(err => next(err))
});

//Route post pour la recherche des cours
router.get('/courses/add', (req, res) => res.render('courses/new', {
  user: req.session.currentUser,
  categories: CATEGORIES
}));

router.post('/courses', (req, res, next) => {
  res.send('ok');
})

router.get('/courses/add', (req, res) => res.render('courses/new', { user: req.session.currentUser }));

//Route post pour la création d'un nouveau cours
router.post('/courses/add', (req, res, next) => {
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

router.post('/courses/:id/delete', (req, res, next) => {
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
      //1. User = Organisateur
      if (req.session.currentUser._id == courseFromDB.courseOwner._id) {
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