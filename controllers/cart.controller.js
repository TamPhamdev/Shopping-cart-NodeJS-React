const Product = require("../models/product.model");
const Order = require('../models/order.model');
const stripe = require("stripe")(process.env.STRIPE_API_SSKEY);
const Cart = module.exports = function (oldCart) {
  this.items =  oldCart.items || {};
  this.totalQty =   oldCart.totalQty || 0;
  this.totalPrice =  oldCart.totalPrice || 0;

  this.add =  function (item, id) {
    let storedItem =  this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    storedItem.qty++;
    storedItem.price =  storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice +=  storedItem.item.price;
  };

  this.generateArray =  function () {
    let arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
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

  stripe.customers.create({
    source: token,
    email,
    metadata: {
      address,
      name,
      phone,
    }
  }).then(customer =>
    stripe.charges.create({
      amount,
      customer: customer.id,
      currency: "usd",
      description: "Sample Charge"
    })).then((charge, error) => {
    if (error) {
      console.log(error);
    }
    var order = new Order({
    //  user:req.user,
      cart:cart,
      address:req.body.address,
      name:req.body.name,
      paymentId:charge.id
    });
    order.save(function(err,result){
      req.session.cart = null;
      res.redirect('../user');
    });
   
    //TODO: save cart vô database & retrive customer từ Stripe
  }).catch(err => console.log(err));
};