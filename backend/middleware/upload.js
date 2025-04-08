// backend/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../public/uploads');

// Create directory if it doesn't existx`
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Now guaranteed to exist
    },
    filename: (req, file, cb) => {
      const userId = req.user.id;
      const ext = path.extname(file.originalname);
      cb(null, `profile-${userId}${ext}`);
    },
  });

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  },
});

module.exports = upload;