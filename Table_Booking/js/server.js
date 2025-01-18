


const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve the HTML file
app.use(express.static('css'));

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public')); // Serve index.html from the public folder
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'bookify676@gmail.com', // Replace with your email
        pass: 'utik aaed zdvx xrhi', // Replace with your email password or app password
    },
});

// Email sending route
app.post('/send-email', async (req, res) => {
    const { sender, subject, message, name } = req.body;

    if (!sender || !subject || !message || !name) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const mailOptions = {
        from: sender, // The sender's email provided by the user
        to: 'bookify676@gmail.com', // Replace with your email (recipient)
        subject: `from ${name} (${sender}): ${subject}`, // Include sender's email in the subject
        text: `Message:-${message}`, // User's message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// Export Express app for serverless function
module.exports = app;

