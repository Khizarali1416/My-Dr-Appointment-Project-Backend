const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = 'upload/doctors/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Adds timestamp to filename
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 5MB limit
})
// Create multer instance with storage configuration
// const upload = multer({ storage: storage });

module.exports = upload;
