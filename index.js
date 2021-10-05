const express = require("express");
const app = express();
const port = 5000;
// const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    // 아래 입력코드는 6.0버전이상으로 더이상 지원안한단다(자체 포함)...
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("mongoDB is connect..."))
  .catch((err) => console.log(err));
app.get("/", (req, res) => res.send("Hello World! 잘해봅시다~"));

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
