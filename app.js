require('dotenv').config();
const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const cors = require('cors');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as file name
    },
});
// Upload functionality
const upload = multer({ storage: storage });

//Set Request Size Limit
app.use(express.limit(100000000));

app.use('', (_, res, next) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
// Handle POST request for video upload
app.post('/upload-video', upload.single('video'), (req, res) => {
    // Multer stores the uploaded file in req.file
    // Process and save the file as needed (e.g., move to storage, database)
    res.send('Video uploaded successfully');
});
// Handle POST request for multiple video uploads
app.post('/uploadMultiple', upload.array('videos', 5), (req, res) => {
    // Multer stores the uploaded files in req.files array
    // Process and save the files as needed (e.g., move to storage, database)
    res.send(`${req.files.length} videos uploaded successfully`);
});
// Handle POST request for video upload(3with remove option)
app.post('/upload-video-with-remove', upload.single('video'), (req, res) => {
    // Multer stores the uploaded file in req.file
    // Process and save the file as needed (e.g., move to storage, database)
    res.send('Video uploaded successfully');
});
// Handle POST request for video upload(with progress bar)
app.post('/upload-video-progress', upload.single('video'), (req, res) => {
    // Multer stores the uploaded file in req.file
    // Process and save the file as needed (e.g., move to storage, database)
    res.send('Video uploaded successfully');
});
// Handle file upload
app.post('/upload', upload.array('files'), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // Process uploaded files here if needed (e.g., save to DB, manipulate, etc.)

        res.status(200).send('Files uploaded successfully.');
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Error uploading files.');
    }
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
