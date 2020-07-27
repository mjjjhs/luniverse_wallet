const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtAthentication = require('../middleware/authentication');
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user) => {
    console.log('Login User::', user.email);
    if(!user) {
      return res.status(400).json({
        message: '로그인 정보 오류',
        userId: req.body.email
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      const {email, wallet_address, isMFA} = user;
      // jwt.sign('token내용', 'JWT secretkey')
      const token = jwt.sign({email, wallet_address, isMFA}, process.env.SALT, {issuer: 'jihoon.moon', expiresIn: 15});
      return res.json({user, token});
    });
  })(req, res);
});

router.get('/myinfo', jwtAthentication, (req, res, next) => {
  if(!req.user) {
    return res.status(401).json({
      message: 'Invalid_token'
    });
  }
  const {email, name, wallet_address, isMFA} = req.user;
  return res.status(200).json({email, name, wallet_address, isMFA});
});

module.exports = router;

