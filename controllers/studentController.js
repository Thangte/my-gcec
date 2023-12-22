const studentModel = require("../models/studentModelData");
const slugify = require("slugify");

//Create Student
exports.createStudent = async (req, res) => {
  const { name, age } = req.body;

  try {
    const student = new studentModel({ name, age, slug: slugify(name) });
    await student.save();
    res.status(200).send({ student });
  } catch (error) {
    res.status(500).send({ error });
  }
};

// GetAllStudent
exports.getAllStudent = async (req, res) => {
  try {
    const students = await studentModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({ students });
  } catch (error) {
    res.status(500).send({ error });
  }
};

// UpdateStudent
exports.updateStudent = async (req, res) => {
  try {
    const { name, age } = req.body;
    const student = await studentModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        age,
        slug: slugify(name),
      }
    );
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// StudentDelete
exports.deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({ student });
  } catch (error) {
    res.status(500).send({ error });
  }
};
