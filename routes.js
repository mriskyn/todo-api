const express = require('express');
const router = express.Router();
const Controller = require('./controller');


router.get('/task/get', Controller.getTasks);

router.post('/task/add', Controller.addTask);

router.get('/task/get/:id', Controller.getTask);

router.put('/task/update/:id', Controller.updateTask);

router.delete('/task/delete/:id', Controller.deleteTask);

module.exports = router;
