const User = require("../models/user.model");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  let users = await User.find();
  res.render("users/index", {
    users: users
  });
};

module.exports.search = async (req, res) => {
  // req.query là 1 object, nếu muốn lấy giá trị của q thì phải .q Ví dụ {q: 'th', age: 28}
  let q = req.query.q;
  // let userFilter = users.filter(
  //   user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
  // );
  // const userFilter = db
  //   .get("users")
  //   .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
  //   .value();
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


// module.exports.create = (req, res) => {
//   res.render("users/create");
// };

// module.exports.postCreate = (req, res) => {
//   // tạo shortid tự động khi thêm mới user
//   req.body.id = shortid.generate();

//   req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
//   db.get("users")
//     .push(req.body)
//     .write();
//   res.redirect("/users");
// };

// module view detail
module.exports.get = async (req, res) => {
  // tham số id = req.params.id không phải query
  let id = req.params.id;
  // method find của module lowdb giống với array method
  // let user = db
  //   .get("users")
  //   .find({
  //     id: id
  //   }).value(); // nhớ thêm .value() để lại giá trị => không có thì undefinded
  //   let user = await User.findById({id});
  //   res.render("./users/viewdetail", {
  //     user: user
  //   });
  // };
  let user = await User.findById(id);
      res.render("./users/viewdetail", {
        user: user
      });
};
// // logout 
// module.exports.logout = (req, res) => {
//   res.clearCookie('userCookie');
//   res.redirect('../auth/login');
// };