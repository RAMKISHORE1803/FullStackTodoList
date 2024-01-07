const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:12345@cluster0.sxoweqm.mongodb.net/");
const passportLocalMongoose = require("passport-local-mongoose");

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

const userSchema = new mongoose.Schema({
  name: String,
  username: String, // Example field: username
  password: String, // Example field: password
  // Add other fields as needed for your application
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = {
  todo: todo,
  User: User,
};
