const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/dbConfig");
const authRouter = require("./routes/auth.routes");
const videoRouter = require("./routes/video.routes");
const commentRouter = require("./routes/comment.routes");
const likeRouter = require("./routes/like.routes");
const healthCheckRouter = require("./routes/healthCheck.route");
const { notFound, errorHandler } = require("./middlewares/errrorMiddleware");

const PORT = process.env.PORT || 5000;

let corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

// app.get("/", (req, res) => {
//   res.status(200).send("Mediatube server is running");
// });

app.use("/", healthCheckRouter);

// Global error middlewares
app.use(notFound);
app.use(errorHandler);

// First connect DB then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
});
