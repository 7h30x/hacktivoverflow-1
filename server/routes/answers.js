const controller = require('../controllers/answer.js');
const {verifyJWT} = require('../middlewares/verifyJWT');
const Router = require('express').Router();

Router.post('/:questionId', verifyJWT, controller.post);
Router.put('/:questionId/:answerId', verifyJWT, controller.update);


module.exports = Router;