module.exports.postCreate = (req, res, next) => {
  let errors = [];
  // đẩy dữ liệu của req.body vào trong mảng và chuyển hướng về trang user  
  if (!req.body.name) {
    errors.push("Name is required !!!");
  }
  if (!req.body.phone) {
    errors.push("Phone is required !!!");
  }
  // nếu mảng error có > render lại trang > truyền vào 1 thêm object nhận 2 giá trị là errors và value
  if (errors.length) {
    res.render("users/create", {
      errors: errors,
      values: req.body
    });
    return;
  }
  next(); // nhớ thêm next không sẽ bị timeout server
};