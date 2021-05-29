const express = require('express');
const router  = express.Router();

const Courses = require('../models/Course.model');

router.get('/courses', (req, res, next) => {
  Courses.find()
    .then(coursesFromDB => {
      res.render('courses/courses', {courses: coursesFromDB})
    })
    .catch(err => next(err))
});

router.get('/courses/add', (req, res) => res.render('courses/new'));

router.post('/courses', (req, res, next) => {
  Courses.create({
    courseOwner: req.session.currentUser._id, 
    courseName: req.body.courseName,
    date: req.body.date,
    startTime: req.body.startTime,
    maxParticipants: req.body.maxParticipants,
    participants: [],
    address: req.body.address,
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
    .then(courseFromDB => res.render('courses/edit', {course: courseFromDB}))
    .catch(err => next(err))
})

router.post('/courses/:id/delete', (req, res, next) => {
  Courses.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/courses'))
    .catch(err => next(err))

})

router.post('/courses/:id', (req, res, next) => {
  let id = req.params.id;
  Courses.findByIdAndUpdate(
    id,
    {
      courseName: req.body.courseName,
      date: req.body.date,
      startTime: req.body.startTime,
      maxParticipants: req.body.maxParticipants,
      address: req.body.address,
      category: req.body.category,
      description: req.body.description
    },
    {new: true}
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
        spaceTaken: courseFromDB.maxParticipants - courseFromDB.participants.length
      }
      res.render('courses/details', data)
    })
    .catch(err => next(err))
})

module.exports = router;