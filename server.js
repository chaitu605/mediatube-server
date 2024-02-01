const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/dbConfig");
const authRouter = require("./routes/auth.routes");
const videoRouter = require("./routes/video.routes");
const { notFound, errorHandler } = require("./middlewares/errrorMiddleware");

const PORT = process.env.PORT || 5000;

app.use(express.json());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/video", videoRouter);

app.get("/", (req, res) => {
  res.status(200).send("Mediatube server is running");
});

// Global error middlewares
app.use(notFound);
app.use(errorHandler);

// First connect DB then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
});
