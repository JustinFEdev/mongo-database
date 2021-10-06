const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const { User } = require("./models/User");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongoose = require("mongoose");
const { request } = require("express");
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
app.get("/", (req, res) => res.send("몽고디비 연결"));

app.get("/api/demodata", (req, res) => {
  res.send("반갑습네다 동무");
});

// app.use(cookieParser());
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // DB에서 요청된 이메일을 찾는다.
  User.findOne({ email: request.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 비밀번호 매칭확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
    });
    // password가 맞다면 토큰 전송
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
    });
  });
});

// 여기까지 통과했다는건 auth가 true
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmen: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
