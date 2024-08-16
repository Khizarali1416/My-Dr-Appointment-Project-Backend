const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Appointment = require('../models/Appointment');

// Register a new admin
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const admin = new Admin({
          name,
          email,
          password: hash
        });
        await admin.save();

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
        res.status(201).json({ token });
      })
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Log in an admin
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      admin.tokens.push({ token });
      await admin.save();

      res.json({ token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    if (!appointments) {
      return res.status(404).send({ error: 'No appointments found.' });
    }

    res.send(appointments);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching appointments.' });
  }
};

// Get details of a specific appointment
exports.getAppointmentDetails = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).send({ error: 'Appointment not found.' });
    }

    res.send(appointment);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching appointment details.' });
  }
};

// Reply to an appointment
exports.replyToAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { reply } = req.body;

    // Find and update the appointment with the admin's reply
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { adminReply: reply, status: 'accepted' }, { new: true });

    if (!appointment) {
      return res.status(404).send({ error: 'Appointment not found.' });
    }

    // Optionally, you can notify the client or perform additional actions here

    res.send(appointment);
  } catch (error) {
    res.status(400).send({ error: 'Error replying to appointment.' });
  }
};


