const express = require('express');
const router = express.Router();
const {register,login,getAllAppointments,getAppointmentDetails,replyToAppointment} = require('../controllers/adminController');
const adminAuth = require('../middleware/AdminAuth')


router.post('/register', register);
router.post('/login', login);
router.get('/appointments', adminAuth, getAllAppointments);
router.get('/appointments/:id', adminAuth, getAppointmentDetails);
router.post('/appointments/:id/reply', adminAuth, replyToAppointment);

module.exports = router;
