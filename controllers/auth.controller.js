const db = require("../db");
const md5 = require("md5");


module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let hashedPassword = md5(md5(password));
  let user = db.get('users').find({
    email: email
  }).value();

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
  res.cookie('userCookie', user.id, {
    signed: true,
    expires: new Date(Date.now() + 900000)
  });

  res.redirect('/users');
};