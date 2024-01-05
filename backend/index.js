const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { createTodo, updateTodo } = require("./types");
const { todo, User } = require("./db"); // Assuming you have a User model

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Set up sessions and passport
app.use(
  session({
    secret: "your-secret-key", // Change this to a secure key
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for user authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Your existing routes...
app.post("/todo", async (req, res) => {
  try {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
      return res.status(411).json({
        msg: "Invalid input format",
      });
    }

    await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });

    res.json({
      msg: "Todo created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});

app.put("/completed", async (req, res) => {
  try {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
      return res.status(411).json({
        msg: "Invalid input format",
      });
    }

    await todo.updateOne(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );

    res.json({
      msg: "Todo marked as completed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

// Add user registration route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.register(new User({ username }), password);

    res.json({
      msg: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Registration failed",
    });
  }
});

// Add login route
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    msg: "Login successful",
  });
});

// Add logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.json({
    msg: "Logout successful",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
