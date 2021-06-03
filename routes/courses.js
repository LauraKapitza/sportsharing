const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Courses = require('../models/Course.model');
const CATEGORIES = require('../constants');
// console.log(CATEGORIES)

router.get('/courses', (req, res, next) => {
  Courses.find()
    .then(coursesFromDB => {
      if (req.session.currentUser) {
        const data = {
          courses: coursesFromDB,
          user: req.session.currentUser,
          categories: CATEGORIES
        }
        res.render('courses/courses', data)
      } else {
        const data = {
          courses: coursesFromDB,
          categories: CATEGORIES
        }
        res.render('courses/courses', data)
      }
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

// router.post('/courses/:id/join', (req, res, next) => {
//   console.log("req.body", req.body);
//   let participants;
//   Courses.findById(req.params.id)
//     .then(courseFromDB => {
//       console.log("course fromdb",courseFromDB);
//       participants = courseFromDB.push(req.session.currentUser)
//       console.log("participants",participants);
      
//       Courses.findByIdAndUpdate(
//         req.params.id,
//         {
//           courseName: courseFromDB.courseName,
//           date: courseFromDB.date,
//           startTime: courseFromDB.startTime,
//           maxParticipants: courseFromDB.maxParticipants,
//           address: courseFromDB.address,
//           zip: courseFromDB.zip,
//           city: courseFromDB.city,
//           category: courseFromDB.category,
//           description: courseFromDB.description
//         },
//         { new: true }
//       )
//       .then(res.redirect(`/courses/${req.params.id}`))
//     })    
//     .catch(err => next(err))
// });

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
    .then(() => res.redirect(`/courses/${id}`))
    .catch(err => next(err))
})

router.get('/courses/:id', (req, res, next) => {
  Courses.findById(req.params.id)
    .populate('courseOwner')
    .populate('participants')
    .then(courseFromDB => {
      const data = {
        course: courseFromDB,
        spaceTaken: courseFromDB.maxParticipants - courseFromDB.participants.length,
        user: req.session.currentUser
      }
      res.render('courses/details', data)
    })
    .catch(err => next(err))
})

module.exports = router;