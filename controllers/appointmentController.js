const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { number, country, issue, description } = req.body;

    // Create a new appointment
    const appointment = new Appointment({
      userId,
      number,
      country,
      issue,
      description,
      status: 'pending' // Default status
    });

    await appointment.save();
    res.status(201).send({ message: 'Appointment created successfully.', appointment });
  } catch (error) {
    res.status(500).send({ error: 'Error creating appointment.' });
  }
};


// Update an appointment (admin only)
exports.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const updates = req.body;

    const appointment = await Appointment.findByIdAndUpdate(appointmentId, updates, { new: true, runValidators: true });

    if (!appointment) {
      return res.status(404).send({ error: 'Appointment not found.' });
    }

    res.send(appointment);
  } catch (error) {
    res.status(400).send({ error: 'Error updating appointment.' });
  }
};

// Delete an appointment (admin only)
exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment) {
      return res.status(404).send({ error: 'Appointment not found.' });
    }

    res.send({ message: 'Appointment deleted successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting appointment.' });
  }
};

