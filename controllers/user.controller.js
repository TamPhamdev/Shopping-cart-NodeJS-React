const User = require("../models/user.model");
const cloudinary = require('cloudinary');
module.exports.index = async (req, res) => {
  let users = await User.find();
  res.render("users/index", {
    users: users
  });
};

module.exports.search = async (req, res) => {
  // req.query là 1 object, nếu muốn lấy giá trị của q thì phải .q Ví dụ {q: 'th', age: 28}
  let q = req.query.q;
 
  let userFilter = await User.find({
    name: {
      $regex: new RegExp(q),
      $options: "i"
    }
  });
  res.render("users/index", {
    users: userFilter,
    value: q
  });
};


module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = async (req, res) => {
  try {
    let result = await cloudinary.v2.uploader.upload(req.file.path);
    let user = new User({
      name: req.body.name,
      phone: req.body.phone,
      avatar: result.secure_url
    });
 
    await user.save((error,results) => {
      console.log(result);
    });
    res.redirect("/users");
  }
  catch(error) {
    res.status(500);
  }
};

// module view detail
module.exports.get = async (req, res) => {
  // tham số id = req.params.id không phải query
  let id = req.params.id;

  let user = await User.findById(id);
  res.render("./users/viewdetail", {
    user: user
  });
};
// logout 
module.exports.logout = (req, res) => {
  res.clearCookie('userCookie');
  res.redirect('../auth/login');
};