// require module bên ngoài
const express = require("express");
const userRoute = require('./routes/user.route');
const port = 3001;
const bodyParser = require('body-parser');

const db = require('./db');
const app = express();

// view engine khai báo công cụ view, pug khai báo đuôi file để view
app.set("view engine", "pug");
// tham số đầu tiên là mặc định, tham số thứ 2 là đường dẫn folder
app.set("views", "./view");
// app.get nhận 2 tham số đầu vào:
// 1 là đường dẫn (path)
// 2 là 1 callback function -> callback nhận 2 tham số : 1 là request từ client, 2 là response từ server trả về
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));  
app.get("/", (req, res) =>
  // render nhận vào 2 tham số, tham số thứ 1 là path, tham số thứ 2 là object
  res.render("index", {
    name: "sss"
  })
);


app.use('/users', userRoute);
app.listen(port, () => console.log(`Hello World ! ${port}`));