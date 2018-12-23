module.exports.authLogin = (req, res, next) => {
  let errors = [];
  // đẩy dữ liệu của req.body vào trong mảng và chuyển hướng về trang user  
  if (!req.body.email) {
    errors.push("Email is required !!!");
  }
  // if (!req.body.password) {
  //   errors.push("Password is required !!!");
  // }
  // nếu mảng error có > render lại trang > truyền vào 1 thêm object nhận 2 giá trị là errors và value
  if (errors.length) {
    res.render("auth/login", {
      errors: errors
    });
    return;
  }
  next(); // nhớ thêm next không sẽ bị timeout server
};