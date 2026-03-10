const Lesson = require("../models/Lesson");

exports.createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Lesson title is required",
      });
    }

    const lesson = await Lesson.create({
      title,
      description,
      mentorId: req.user.id,
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
