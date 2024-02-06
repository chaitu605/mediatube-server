const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "Mediatube server is running OK",
    timeStamp: Date.now(),
  };
  try {
    res.status(200).send(healthCheck);
  } catch (error) {
    healthCheck.message = error;
    res.status(503).send(healthCheck);
  }
});

module.exports = router;
