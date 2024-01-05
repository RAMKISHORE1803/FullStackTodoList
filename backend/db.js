const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:12345@cluster0.sxoweqm.mongodb.net/");

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo: todo,
};
