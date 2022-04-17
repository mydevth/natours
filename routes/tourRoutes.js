// tourRoutes.js
const express = require('express');

const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');


const router = express.Router();

// router.param('id', tourController.checkID);    //   param  (checkID from URL ,call at tourController.js), 

// POST /tour/tourID/reviews
// GET /tour/tourID/reviews

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tour-within/?distance=233&center=-40,45&unit=mi
// /tour-within/233/center/-40,50/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)   // protect  getAllTours
  .post(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour);

module.exports = router;    
