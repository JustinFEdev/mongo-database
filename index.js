const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
mongodb
  .connect("mongoose+srv://wj1089:dnwns123@cluster0.e4sja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongo db is connect..."))
  .catch((err) => console.log(err)),
  app.get("/", (req, res) => {
    //runkit.com/
    https: res.send("Hello World!");
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
