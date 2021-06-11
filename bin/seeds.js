const mongoose = require('mongoose');
const User = require('../models/User.model');
const Courses = require('../models/Course.model');
const passwordHashed = '$2a$10$0XpFN6RxgYhPxd6GBGaRwuzkJVpqei63zsZrRfCq/bcI1cGPvpImW'; //Toto123!

//
// USERS
//
const fakeusers = [
  {
    username: "Betty Boop",
    email: "betty@boop.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Lucky Luck",
    email: "lucky@luck.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Micky Mouse",
    email: "micky@mouse.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Obélix",
    email: "obelix@asterix.fr",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "",
    email: "",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "",
    email: "",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "",
    email: "",
    passwordHash: passwordHashed,
    city: "Marsaille",
    telephone: "0938837094"
  },
  {
    username: "",
    email: "",
    passwordHash: passwordHashed,
    city: "Marsaille",
    telephone: "0938837094"
  },
  {
    username: "",
    email: "",
    passwordHash: passwordHashed,
    city: "Lyon",
    telephone: "0938837094"
  },
  {
    username: "",
    email: "",
    passwordHash: passwordHashed,
    city: "Lyon",
    telephone: "0938837094"
  },
]


//
// COURSES
//
const fakecourses = [
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-14'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-14'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-16'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-17'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-17'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-18'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-19'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-20'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-21'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-22'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-22'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-22'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-23'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-24'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-24'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-25'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-26'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-27'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-28'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-29'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-29'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-29'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  },
  {
    courseOwner: "",
    courseName: "",
    date: new Date('2021-06-30'),
    startTime: "",
    maxParticipants: 5,
    participants: [],
    address: "",
    zip: "",
    city: "",
    category: "",
    description: ""
  }
]


User.create(fakeusers)
  .then(celebrities => console.log(`${celebrities.length} celebrities created!`))
  .catch(err => console.log("An error occured when uploading the fake user data: ", err))

Courses.create(fakecourses)
  .then(movies => console.log(`${movies.length} movies created!`))
  .catch(err => console.log("An error occured when uploading the fake course data: ", err))