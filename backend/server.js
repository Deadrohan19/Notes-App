const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./Routes/userRoutes.js");
const noteRoutes = require("./Routes/noteRoutes.js");
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware.js");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

const corsOptions = {
  origin: [
    "https://notes-6i5u4d446-rohans-projects-55017a45.vercel.app",
    "https://notes-app-ten-hazel.vercel.app",
    "https://notes-app-git-main-rohans-projects-55017a45.vercel.app",
  ], // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], // Add 'Authorization' here
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
