const Product = require("../models/product.model");

module.exports.index = async (req, res) => {
  let products = await Product.find();
  let page = parseInt(req.query.page) || 1;
  let perPage = 6;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  let pageCount = Math.ceil(products.length / perPage);
  let product = products.slice(start, end);

  res.render("products/index", {
    products: product,
    page: page,
    perPage: perPage,
    pageCount: pageCount
  });
};