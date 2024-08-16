const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/Auth');
const {createAppointment,updateAppointment,deleteAppointment} = require('../controllers/appointmentController');

router.post('/',  createAppointment);

router.put('/:id', authMiddleware, updateAppointment);

router.delete('/:id', authMiddleware, deleteAppointment);

module.exports = router;
