const express = require('express');
const router = express.Router();
const {addDoctor,getAllDoctors,getDoctorDetails,updateDoctor,deleteDoctor} = require('../controllers/doctorController');
const upload = require('../config/multer');
const adminAuth = require('../middleware/AdminAuth');

router.post('/',  upload.single('image'), addDoctor);

router.get('/', getAllDoctors);

router.get('/:id', getDoctorDetails);

router.put('/:id', adminAuth, upload.single('image'), updateDoctor);

router.delete('/:id', adminAuth, deleteDoctor);

module.exports = router;
