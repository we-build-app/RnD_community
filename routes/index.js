const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    res.sendFile(path.join(__dirname, '/../views/index.html'));
  }catch(e){
    console.log('error');
  }
});

router.get('/login.html', async (req, res, next) => {
  try{
    res.sendFile(path.join(__dirname, '/../views/login.html'));
  }catch(e){
    console.log('error');
  }
});

router.get('/registration.html', async(req, res, next) => {
  try{
    res.sendFile(path.join(__dirname, '/../views/registration.html'));
  }catch(e){
    console.log('error');
  }
})

module.exports = router;