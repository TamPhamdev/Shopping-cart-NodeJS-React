// khai báo biến môi trường
require("dotenv").config();

// require module
const express = require("express");
const port = 3001; // khai báo port
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose").set("debug", true);
const cloudinary = require("cloudinary");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const keyPublishable = process.env.STRIPE_PUBLISHKEY;
const stripe = require("stripe")(process.env.STRIPE_API_SSKEY);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.APP_KEY,
  api_secret: process.env.API_SECRET
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
const userRoute = require("./routes/user.route");
// const authRoute = require("./routes/auth.route");
const prodRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");

const sessionMiddleware = require("./middlewares/session.middleware");
// const authMiddleware = require("./middlewares/auth.middleware");
const cartMiddleware = require("./middlewares/cart.middleware");
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static("public")); // khai báo sử dụng file static
app.use(sessionMiddleware);
// app.use(cartMiddleware);
app.use(
  session({
    secret: "secretcat",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: "mongodb://localhost/express-demo"
    }),
    cookie: {
      path: "/",
      domain: "localhost",
      maxAge: 180 * 60 * 1000
    }
  })
);


app.use(function(req, res, next) {
  keyPublishable,  req.session;
  next();
});

app.get("/", (req, res) => {
  if(!req.session.test) {
    req.session.test = 'OK';
    res.send('OK');
  }
});

//thứ tự khai báo middleware tron Express rất quan trọng
app.use("/users", userRoute);
// app.use("/auth", authRoute);
app.use("/products", prodRoute);
app.use("/cart", cartRoute);

app.listen(port, () => console.log(`Hello World ! ${port}`));
