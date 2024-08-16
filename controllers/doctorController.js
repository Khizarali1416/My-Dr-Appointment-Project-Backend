const Doctor = require('../models/Doctor');

// Add a new doctor (admin only)
exports.addDoctor = async (req, res) => {
  try {
    const { name, specialty, availability } = req.body;
    const image = req.file ? req.file.path : ''; // Use uploaded file path

    const doctor = new Doctor({
      name,
      specialty,
      availability,
      image
    });

    await doctor.save();
    res.status(201).send({ message: 'Doctor added successfully.', doctor });
  } catch (error) {
    res.status(500).send({ error: 'Error adding doctor.' });
  }
};

// Get a list of all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    if (!doctors.length) {
      return res.status(404).send({ error: 'No doctors found.' });
    }

    res.send(doctors);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching doctors.' });
  }
};

// Get details of a specific doctor
exports.getDoctorDetails = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).send({ error: 'Doctor not found.' });
    }

    res.send(doctor);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching doctor details.' });
  }
};

// Update a doctor's details (admin only)
exports.updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updates = req.body;
    const image = req.file ? req.file.path : ''; // Use uploaded file path

    const doctor = await Doctor.findByIdAndUpdate(doctorId, { ...updates, image }, { new: true, runValidators: true });

    if (!doctor) {
      return res.status(404).send({ error: 'Doctor not found.' });
    }

    res.send(doctor);
  } catch (error) {
    res.status(400).send({ error: 'Error updating doctor.' });
  }
};

// Delete a doctor (admin only)
exports.deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const doctor = await Doctor.findByIdAndDelete(doctorId);

    if (!doctor) {
      return res.status(404).send({ error: 'Doctor not found.' });
    }

    res.send({ message: 'Doctor deleted successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting doctor.' });
  }
};


