const express = require('express');
const User = require('../models/user');
const Login = require('../models/user_login');

const router = express.Router();


router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['User_id', 'User_name'],
      where: {User_name: req.body.email}
    });
    console.log(user);
    if(user === null){
      const newUser = await User.create({User_name: req.body.email});
      console.log(newUser);
      const newLogin = await Login.create({User_id: newUser.User_id ,Email: req.body.email, pw: req.body.pw});
      console.log(newLogin);
      res.json(newUser);
      
    }else{
      //이미 등록된 이메일
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;