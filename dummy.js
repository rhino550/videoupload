const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Define allowed photo and video file types
    const allowedPhotoTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/avi'];

    // Check if the uploaded file's MIME type matches allowed types for photos or videos
    if (allowedPhotoTypes.includes(file.mimetype)) {
      req.fileType = 'photo';
      cb(null, true); // Allow photo files
    } else if (allowedVideoTypes.includes(file.mimetype)) {
      req.fileType = 'video';
      cb(null, true); // Allow video files
    } else {
      cb(new Error('Invalid file type. Only photos (jpg, png, gif) and videos (mp4, avi) are allowed.'));
    }
  },
});

app.post('/upload', upload.array('files'), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // Access 'fileType' in req to determine if it's a photo or video
    req.files.forEach(file => {
      if (req.fileType === 'photo') {
        // Handle photo file
        // Save to a photos directory, process as needed
      } else if (req.fileType === 'video') {
        // Handle video file
        // Save to a videos directory, process as needed
      }
    });

    res.status(200).send('Files uploaded successfully.');
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Error uploading files.');
  }
});
