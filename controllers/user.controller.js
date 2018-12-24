const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.search = (req, res) => {
  // req.query là 1 object, nếu muốn lấy giá trị của q thì phải .q Ví dụ {q: 'th', age: 28}
  const q = req.query.q;
  // let userFilter = users.filter(
  //   user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
  // );
  let userFilter = db
    .get("users")
    .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    .value();
  res.render("users/index", {
    users: userFilter,
    value: q
  });
};


module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = (req, res) => {
  // tạo shortid tự động khi thêm mới user
  req.body.id = shortid.generate();

  req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};

// module view detail
module.exports.get = (req, res) => {
  // tham số id = req.params.id không phải query
  let id = req.params.id;
  // method find của module lowdb giống với array method
  let user = db
    .get("users")
    .find({
      id: id
    }).value(); // nhớ thêm .value() để lại giá trị => không có thì undefinded

  res.render("./users/viewdetail", {
    user: user
  });
};
// logout 
module.exports.logout = (req, res) => {
  res.clearCookie('userCookie');
  res.redirect('../auth/login');
};