const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: String,
  wantToGoList: [String],
});

module.exports = mongoose.model("User", userSchema);
