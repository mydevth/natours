const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARE
app.use(morgan('dev'));

// basic midleware (between request and response)
app.use(express.json());

// test create own Middleware for test excute order , default put it before route
app.use((req, res, next) => {
  console.log('Hello from the Middleware ❤');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // req.kobTime = new Date().toISOString();     //test var
  next();
});


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


// 2) ROUTE HANDERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);               //test created Middleware
  res.status(200).json({
    requestedKobAt: req.requestTime,         //test created Middleware
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
}


const getTour = (req, res) => {
  console.log(req.params);     //  req.params is function read url parameter ,etc= { id: '5' }
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) {     // find incorrect input ID  Sol-1
  if (!tour) {                    // find incorrect input ID  Sol-2
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour            // tours: tour    
    }
  });
}

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
}

const updateTour = (req, res) => {

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here......>'
    }
  });
}

const deleteTour = (req, res) => {

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
}

// 3) ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);


// 4) START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});