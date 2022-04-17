//  tourController.js

// const fs = require('fs');
const Tour = require('../models/tourModel');

// ใช้กับ section 6
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// สร้าง checkID เพื่อรวมการเช็ค ID ของ getTour ,updateTour, deleteTour ที่มาไว้ที่เดียว ลดซ้ำซ้อน ตรวจสอบ ค่า ID ที่มากับ URL ,ทำงานกับ param
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour ID is : ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// ตรวตสอบความถูกต้อง 
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    })
  }
  next();
};

// 2) ROUTE HANDERS
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);               //test created Middleware

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,         //test created Middleware
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
}

exports.getTour = (req, res) => {
  console.log(req.params);     //  req.params is function read url parameter ,etc= { id: '5' }
  const id = req.params.id * 1;

  // const tour = tours.find(el => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour            // tours: tour    
  //   }
  // });
}

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour
    // }
  });
};


exports.updateTour = (req, res) => {

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here......>'
    }
  });
}

exports.deleteTour = (req, res) => {

  res.status(204).json({
    status: 'success',
    data: null
  });
}
