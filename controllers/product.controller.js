const db = require("../db");
const shortid = require('shortid');

module.exports.index = (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let perPage = 6;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  let productList = db.get("products").value();
  let pageCount = Math.ceil(productList.length / perPage);
  let product = db.get("products").value().slice(start, end);


  res.render("products/index", {
    products: product,
    page: page,
    perPage: perPage,
    pageCount: pageCount
  });
};