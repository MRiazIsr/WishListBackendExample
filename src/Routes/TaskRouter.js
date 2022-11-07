const express = require('express');
const router = express.Router();
const todoController = require('../Controllers/TaskController');
const coinCapController = require('../Controllers/CoinCapController');


router.get('/list', todoController.getAllTasks);
router.get('/task/get', todoController.getTask);
router.get('/qoute/get', coinCapController.getSymbolQuote);
router.post('/task/create', todoController.createTask);
router.patch('/task/update', todoController.updateTask);
router.delete('/task/delete', todoController.deleteTask);

module.exports = router ;

