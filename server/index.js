const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config({ path: path.join(__dirname, "./config/config.env") });
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

const post = require("./routes/post");
const comment = require("./routes/comment");

// import Routes
app.use("/post", post);
app.use("/comment", comment);

// Error middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
