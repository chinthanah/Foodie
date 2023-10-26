const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: "String",
    required: "True",
  },
  location: {
    type: "String",
    required: "True",
  },
  email: {
    type: "String",
    required: "True",
  },
  password: {
    type: "String",
    required: "True",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
