const Session = require("../models/Session");

exports.createSession = async (req, res) => {
  try {

    const { lessonId, date, topic, summary } = req.body;

    const session = await Session.create({
      lessonId,
      date,
      topic,
      summary
    });

    res.status(201).json(session);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSessionsByLesson = async (req, res) => {
  try {

    const sessions = await Session.find({
      lessonId: req.params.lessonId
    });

    res.json(sessions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};