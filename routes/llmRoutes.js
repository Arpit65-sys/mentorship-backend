const express = require("express");
const { summarizeText } = require("../controllers/llmController");

const router = express.Router();

// POST /llm/summarize
router.post("/summarize", summarizeText);

module.exports = router;