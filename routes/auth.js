const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Courses = require('../models/Course.model');
const mongoose = require('mongoose');

const routeGuard = require('../configs/route-guard.config');

const fileUploader = require('../configs/cloudinary.config.js');

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// .post() route ==> to process form data
router.post('/signup', fileUploader.single('image'), (req, res, next) => {
  const { username, email, password, city, telephone } = req.body;
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!username || !email || !password) {
    res.render('auth/signup', { 
      errorMessage: 'All fields are mandatory. Please provide your username, email and password.' 
    });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/signup', { 
        errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' 
      });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword,
        city,
        telephone,
        imageUrl
      });
    })
    .then(userFromDB => res.redirect('/userProfile'))
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
          errorMessage: 'Username and email need to be unique. Either username or email is already used.'
        });
      } else {
        next(error);
      }
    }); // close .catch()
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));

// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { 
          errorMessage: 'Email is not registered. Try with other email.' 
        });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user;
        // console.log("route post login",req.session.currentUser)
        res.redirect('/courses');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// USERPROFILE //////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/userProfile', routeGuard, (req, res,next) => {
  //Database query car modification dans edit non prise en compte dans req.session.currentUser
  User.findById(req.session.currentUser._id)
  .then(userFromDB => {
    res.render('users/user-profile', {
      user: userFromDB,
    })
  })
  .catch(err => next(err))

});

router.get('/userProfile/edit', routeGuard, (req, res, next) => {
  //Database query car modification dans edit non prise en compte dans req.session.currentUser
  User.findById(req.session.currentUser._id)
  .then(userFromDB => {
    res.render('users/user-profile-edit', {
      user: userFromDB,
    })
  })
  .catch(err => next(err))

});

router.post('/userProfile', routeGuard, fileUploader.single('image'), (req, res, next) => {

  const password = req.body.password;

  let imgUrl;
  if (req.file) {
    imgUrl = req.file.path;
  } else {
    imgUrl = req.body.existingImage;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.findByIdAndUpdate(
        req.session.currentUser._id,
        {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          city: req.body.city,
          telephone: req.body.telephone,
          imageUrl:imgUrl
        },
        { new: true });
    })
    .then(userFromDB => {
      res.render('users/user-profile',{user:userFromDB})
    })
    .catch(error => next(error));
});

router.get('/userProfile/delete', routeGuard, (req, res, next) => {
                 
  Courses.deleteMany({courseOwner: req.session.currentUser._id})
  .then() //Courses have been deleted
  .catch(next)

  Courses.find({})
  .then(coursesFromDB => {

    for (let i = 0; i < coursesFromDB.length;i++){
      for (let j = 0; j < coursesFromDB[i].participants.length;j++){
        if (coursesFromDB[i].participants[j] == req.session.currentUser._id){
          coursesFromDB[i].participants.splice(j,1);
        }
      }
      coursesFromDB[i].save()
            .then() //User has been deleted from courses
            .catch(next)
    }
  })
  .catch(next)

  User.findByIdAndRemove(req.session.currentUser._id)
    .then(() => {
      // console.log('destruction sessison immini')
      req.session.destroy();
      res.redirect('/')
    })
    .catch(err => next(err));
});

module.exports = router;