//const db = require("../db");
const md5 = require("md5");
const User = require("../models/user.model");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let hashedPassword = md5(md5(password));
  // let user = db.get('users').find({
  //   email: email
  // }).value();
  var findUser =  await User.findOne({email:email});
  let jsonUser = JSON.stringify(findUser);
  let user = JSON.parse(jsonUser);

  if (!user) {
    res.render('auth/login', {
      errors: [
        'User does not exist'
      ],
      values: req.body
    });
    return;
  }
  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: [
        'Password does not match.'
      ],
      values: req.body
    });
    return;
  }
  res.cookie('userCookie', user._id, {
    signed: true,
    expires: new Date(Date.now() + 2900000)
  });

  res.redirect('/users');
};