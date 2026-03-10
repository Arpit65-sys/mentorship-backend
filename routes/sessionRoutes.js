const express = require("express");
const {
  createSession,
  getSessionsByLesson
} = require("../controllers/sessionController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("mentor"), createSession);

router.get("/lesson/:lessonId", authMiddleware, getSessionsByLesson);

module.exports = router;