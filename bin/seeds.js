const mongoose = require('mongoose');
const User = require('../models/User.model');
const Courses = require('../models/Course.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sportsharing';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Successfully connected to the database ${MONGODB_URI}`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to the database ${MONGODB_URI}: `, error);
    process.exit(1);
  });

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const passwordPlain = 'Toto123!';
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHashed = bcrypt.hashSync(passwordPlain, salt);
console.log(passwordHashed)

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
    username: "Po",
    email: "po@panda.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Donkey Kong",
    email: "donkey@kong.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Donald Duck",
    email: "donald@truck.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Nemo",
    email: "finding@neom.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Batman",
    email: "bat@man.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Elastigirl",
    email: "elasti@girl.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Catwoman",
    email: "cat@woman.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  },
  {
    username: "Captain America",
    email: "captain@america.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094"
  }
]


//
// COURSES
//
const fakecourses = [
  {
    courseName: "💪 Online Core Power",
    date: new Date('2021-06-07'),
    startTime: "12:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Pilates",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Outdoor Climbing",
    date: new Date('2021-06-07'),
    startTime: "11:15",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Climbing",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "The Charleston Dance",
    date: new Date('2021-06-08'),
    startTime: "18:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Dance",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "HIIT Training",
    date: new Date('2021-06-08'),
    startTime: "07:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Functional Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Kung fu",
    date: new Date('2021-06-09'),
    startTime: "20:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Material Arts",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."  },
  {
    courseName: "Best Age Pilates",
    date: new Date('2021-06-09'),
    startTime: "08:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Pilates",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Tennis for Beginners",
    date: new Date('2021-06-11'),
    startTime: "19:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Racket Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Weight Training 101",
    date: new Date('2021-06-11'),
    startTime: "07:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Strength Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Backstroke Training",
    date: new Date('2021-06-12'),
    startTime: "20:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Swimming",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "American Football",
    date: new Date('2021-06-12'),
    startTime: "19:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Team Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Power Plate Workout",
    date: new Date('2021-06-13'),
    startTime: "18:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Vibration Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Aquajogging",
    date: new Date('2021-06-13'),
    startTime: "09:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Water Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Vinyasa All Level",
    date: new Date('2021-06-14'),
    startTime: "10:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Yoga",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "💪 Online Core Power",
    date: new Date('2021-06-14'),
    startTime: "12:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Pilates",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Indoor Bouldering",
    date: new Date('2021-06-15'),
    startTime: "11:15",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Climbing",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Ballett Basic",
    date: new Date('2021-06-15'),
    startTime: "18:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Dance",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "HIIT Training",
    date: new Date('2021-06-16'),
    startTime: "7:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Functional Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Kung fu",
    date: new Date('2021-06-16'),
    startTime: "20:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Material Arts",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."  },
  {
    courseName: "Best Age Pilates",
    date: new Date('2021-06-18'),
    startTime: "08:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Pilates",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Tennis for Beginners",
    date: new Date('2021-06-18'),
    startTime: "19:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Racket Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Weight Training 101",
    date: new Date('2021-06-19'),
    startTime: "07:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Strength Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Backstroke Training",
    date: new Date('2021-06-19'),
    startTime: "20:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Swimming",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "American Football",
    date: new Date('2021-06-20'),
    startTime: "19:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Team Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Power Plate Workout",
    date: new Date('2021-06-20'),
    startTime: "18:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Vibration Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Aquajogging",
    date: new Date('2021-06-21'),
    startTime: "09:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Water Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Vinyasa All Level",
    date: new Date('2021-06-21'),
    startTime: "10:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Yoga",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "💪 Online Core Power",
    date: new Date('2021-06-22'),
    startTime: "12:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Pilates",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Outdoor Climbing",
    date: new Date('2021-06-22'),
    startTime: "11:15",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Climbing",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "The Charleston Dance",
    date: new Date('2021-06-23'),
    startTime: "18:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Dance",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "HIIT Training",
    date: new Date('2021-06-23'),
    startTime: "7:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Functional Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Kung fu",
    date: new Date('2021-06-25'),
    startTime: "20:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Material Arts",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."  },
  {
    courseName: "Best Age Pilates",
    date: new Date('2021-06-25'),
    startTime: "08:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Pilates",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Tennis for Beginners",
    date: new Date('2021-06-26'),
    startTime: "19:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Racket Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Weight Training 101",
    date: new Date('2021-06-26'),
    startTime: "07:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Strength Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Backstroke Training",
    date: new Date('2021-06-27'),
    startTime: "20:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Swimming",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "American Football",
    date: new Date('2021-06-27'),
    startTime: "19:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Team Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Power Plate Workout",
    date: new Date('2021-06-28'),
    startTime: "18:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Vibration Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Aquajogging",
    date: new Date('2021-06-28'),
    startTime: "09:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Water Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Vinyasa All Level",
    date: new Date('2021-06-29'),
    startTime: "10:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Yoga",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "💪 Online Core Power",
    date: new Date('2021-06-29'),
    startTime: "12:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Pilates",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Indoor Bouldering",
    date: new Date('2021-06-30'),
    startTime: "11:15",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Climbing",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Ballett Basic",
    date: new Date('2021-06-30'),
    startTime: "18:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Dance",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "HIIT Training",
    date: new Date('2021-07-01'),
    startTime: "7:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Functional Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Kung fu",
    date: new Date('2021-07-01'),
    startTime: "20:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Material Arts",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."  },
  {
    courseName: "Best Age Pilates",
    date: new Date('2021-07-02'),
    startTime: "08:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Pilates",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Tennis for Beginners",
    date: new Date('2021-07-02'),
    startTime: "19:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Racket Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Weight Training 101",
    date: new Date('2021-07-03'),
    startTime: "07:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Strength Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Backstroke Training",
    date: new Date('2021-07-03'),
    startTime: "20:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Swimming",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "American Football",
    date: new Date('2021-07-04'),
    startTime: "19:00",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Team Sports",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  },
  {
    courseName: "Power Plate Workout",
    date: new Date('2021-07-04'),
    startTime: "18:30",
    maxParticipants: Math.floor(Math.random() * fakeusers.length +1),
    participants: [],
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
    category: "Vibration Training",
    description: "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry."
  }
]


User.create(fakeusers)
  .then(users => {
    const userIds = []
    users.forEach(user => {
      userIds.push(user._id)
    })
    console.log(`${users.length} users created!`)

    //update fakecourses
    fakecourses.forEach(course => {
      //add randomly a course owner
      let randomNum = Math.floor(Math.random() * fakeusers.length)
      const numArr = []
      course.courseOwner = userIds[randomNum]

      //add participants for courses with at least 2 places
      if (course.maxParticipants > 1) {
        let randomNum2;
        let owner = true;
        while (owner) {
          randomNum2 = Math.floor(Math.random() * fakeusers.length);
          if (userIds[randomNum2] != course.courseOwner) owner = false;
        }
        course.participants.push(userIds[randomNum2])
      }
    })

    Courses.create(fakecourses)
      .then(courses => {
        console.log(`${courses.length} courses created!`)
        // Once created, close the DB connection
        mongoose.connection.close();
      })
      .catch(err => console.log("An error occured when uploading the fake course data: ", err))

  })
  .catch(err => console.log("An error occured when uploading the fake user data: ", err))