// file run for import - delete
// node dev-data/data/import-dev-data.js --delete
// node dev-data/data/import-dev-data.js --import 

const fs = require('fs');
const mongoose = require('mongoose');

const Tour = require('./../../models/tourModel');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });   //read config file config.env

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {       //  connect toLocal DB
  .connect(DB, {                                  //  connect ot Cloud DB (Atlas)
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(() => console.log('DB connection successful!'));

// READING THE JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');

  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data Successfully DELETED!!!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv)
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}

