const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    const prompt = `Summarize the following text in 3-5 bullet points:\n\n${text}`;

    const result = await model.generateContent(prompt);

    const summary = result.response.text();

    res.json({
      summary,
      model: "gemini-2.0-flash-lite",
    });
  } catch (error) {
    console.error("LLM ERROR:", error);

    res.status(502).json({
      message: "LLM service failed",
      error: error.message,
    });
  }
};

module.exports = { summarizeText };
