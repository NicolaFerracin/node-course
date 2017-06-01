const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js')

router.get('/', storeController.myMiddleware, storeController.homePage);

router.get('/example', (req, res) => {
  const obj = { name: 'Obj', type: 'object' };
  // res.send('Hey! It works!');
  // res.json(obj);
  res.render('hello', obj);
});

router.get('/reverse/:name', (req, res) => {
  res.send([...req.params.name].reverse().join(''));
});

module.exports = router;
