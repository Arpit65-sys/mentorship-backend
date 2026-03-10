const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Student name is required",
      });
    }

    const student = await Student.create({
      name,
      age,
      parentId: req.user.id,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({ parentId: req.user.id });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
