const Booking = require("../models/Booking");
const Student = require("../models/Student");

exports.createBooking = async (req, res) => {
  try {

    const { studentId, lessonId } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const booking = await Booking.create({
      studentId,
      lessonId
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};