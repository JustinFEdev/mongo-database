const mongoose = require("mongoose");

const useSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    maxlength: 50,
    trim: true,
  },
  wallet: {
    type: String,
    maxlength: 100,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    tpye: String,
  },
  tokenExp: {
    type: Number,
  },
});
const User = mongoose.model("User", useSchema);
module.exports = { User };
