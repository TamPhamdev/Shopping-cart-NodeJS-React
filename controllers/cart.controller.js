const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const stripe = require("stripe")(process.env.STRIPE_API_SSKEY);

module.exports.addToCart = async (req, res) => {
  try {
    let productId = await req.params.productId;

    let cart = await new Cart(req.session.cart ? req.session.cart : {});

    let product = await Product.findById(productId, function (err) {
      if (err) {
        console.log(err);
      }
    });

    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/products");
  } catch (error) {
    res.status(404);
  }
};

module.exports.shoppingcart = async (req, res) => {
  try {
    if (!req.session.cart) {
      return res.render("./cart/shoppingCart", {
        products: null
      });
    }
    let cart = await new Cart(req.session.cart);
    await res.render("./cart/shoppingCart", {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.checkout = async (req, res) => {
  try {
    if (!req.session.cart) {
      res.redirect("/");
    }

    let cart = await new Cart(req.session.cart);

    res.render("./cart/checkout", {
      total: cart.totalPrice
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Loi cmnr");
  }
};

module.exports.postCharge = (req, res) => {
  try {
    if (!req.session.cart) {
      res.redirect("/");
    }
    let cart = new Cart(req.session.cart);
    let amount = cart.totalPrice * 100;
    console.log(req.body);
    const token = req.body.stripeToken;
    // stripe.customers.create({
    //   name: req.body.name,
    //   address: req.body.address,
    //   cardname: req.body.cardname
   // }).then(customer =>
       stripe.charges.create({
      amount,
      source: token,
      currency: "usd",
      description: "Sample Charge"
    }).then((charge, error) => {
      if (error) {
        console.log(error);
      }
      cart = null;
      res.send('Ok rồi');
    });
  } catch (error) {
    console.log(error);
  }
};