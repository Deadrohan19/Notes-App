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
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], // Add 'Authorization' here
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
