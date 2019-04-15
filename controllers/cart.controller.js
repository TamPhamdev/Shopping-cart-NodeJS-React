const Product = require("../models/product.model");
const Order = require("../models/order.model");
const stripe = require("stripe")(process.env.STRIPE_API_SSKEY);
const Cart = (module.exports = function(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };
  this.reduceByOne = function(id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;
    if (this.items[id].qty <= 0) {
      delete this.items[id];
    }
  };
  this.removeItem = function(id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  };
  this.generateArray = function() {
    let arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
});
module.exports.addToCart = async (req, res) => {
  console.log("Session first", req.session.cart);
  try {
    let productId = await req.params.productId;
  
    let cart = await new Cart(req.session.cart ? req.session.cart : {});

    let product = await Product.findById(productId, err => {
      if (err) {
        console.log(err);
      }
    });
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log("Session cart",req.session.cart);
  return   res.status(200).send(req.session.cart);
  } catch (error) {
    console.log(error);
  }
};

module.exports.shoppingcart = (req, res) => {
  try {
    if (!req.session.cart) {
      return res.json("/carts/", {
        products: null
      });
    }
    let cart = new Cart(req.session.cart);

    // res.render("./cart/shoppingCart", {
    //   products: cart.generateArray(),
    //   totalPrice: cart.totalPrice
    // });
    res.json("/carts/", {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.reduce = function(req, res, next) {
  var productId = req.params.productId;
  let cart = new Cart(req.session.cart);
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect("/cart/shoppingCart");
};

module.exports.remove = function(req, res, next) {
  var productId = req.params.productId;
  let cart = new Cart(req.session.cart);
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/cart/shoppingCart");
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
  if (!req.session.cart) {
    res.redirect("/");
  }
  let cart = new Cart(req.session.cart);
  let amount = cart.totalPrice * 100;
  console.log(req.body);
  const email = req.body.email;
  const address = req.body.address;
  const name = req.body.name;
  const phone = req.body.phone;
  const token = req.body.stripeToken;

  stripe.customers
    .create({
      source: token,
      email,
      metadata: {
        address,
        name,
        phone
      }
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        customer: customer.id,
        currency: "usd",
        description: "Sample Charge"
      })
    )
    .then((charge, error) => {
      if (error) {
        console.log(error);
      }
      var order = new Order({
        //  user:req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: charge.id
      });
      order.save(function(err, result) {
        req.session.cart = null;
        res.redirect("../users");
      });
    })
    .catch(err => console.log(err));
};
