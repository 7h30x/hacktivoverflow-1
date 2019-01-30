var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var {verifyJWT} = require('../middlewares/verifyJWT');
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.put('/updateWatchedTags' , verifyJWT, userController.updateWatched);
router.get('/', userController.findAll);
module.exports = router;
