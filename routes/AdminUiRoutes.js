const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');
const CategoryController = require('../controllers/CategoryController');
const UserController = require('../controllers/UserController');



router.use(UserController.protect, UserController.restrictTo('admin'));

router.route('/').get(MovieController.getAllMoviesByAdmin);
router.route('/users').get(UserController.getUsers);
router.route('/users/add-user').get(UserController.getCreateUser);
router.route('/users/edit-user/:id').get(UserController.getEditUser);


router.route('/movies').get(MovieController.getAllMoviesByAdmin);
router.route('/movies/add-movie').get(MovieController.getCreateMovie);
router.route('/movies/edit-movie/:id').get(MovieController.getEditMovie);

router.route('/categories').get(CategoryController.getCategories);
router.route('/categories/add-category/').get(CategoryController.getCreateCategory);
router.route('/categories/edit-category/:id').get(CategoryController.getEditCategory);

 



 
module.exports = router;
































