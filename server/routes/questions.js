const controller = require('../controllers/question.js');
const {verifyJWT} = require('../middlewares/verifyJWT');
const Router = require('express').Router();

Router.get('/', verifyJWT, controller.findAll);
Router.get('/:questionId', verifyJWT, controller.findOne);
Router.post('/', verifyJWT, controller.post);
Router.put('/:questionId', verifyJWT, controller.update);
Router.delete('/:questionId', verifyJWT, controller.delete);

module.exports = Router;