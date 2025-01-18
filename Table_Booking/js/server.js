


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
// app.use(express.static('public')); // Serve the HTML file

// app.use('../css', express.static(path.join(__dirname, 'css')));
// app.use('../js', express.static(path.join(__dirname, 'js')));
// app.use('../img', express.static(path.join(__dirname, 'img')));

app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve the HTML file

app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
app.use('/img', express.static(path.join(__dirname, '..', 'img')));
app.use('/lib', express.static(path.join(__dirname, '..', 'lib')));
// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // Serve index.html from the public folder
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


// *************************************************************************************************************************************

// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config(); // Add this line to load environment variables

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve the HTML file

// app.use('/css', express.static(path.join(__dirname, '..', 'css')));
// app.use('/js', express.static(path.join(__dirname, '..', 'js')));
// app.use('/img', express.static(path.join(__dirname, '..', 'img')));
// app.use('/lib', express.static(path.join(__dirname, '..', 'lib')));

// // Serve index.html on the root route
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // Serve index.html from the public folder
// });

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use your email service provider
//     auth: {
//         user: process.env.EMAIL_USER || "bookify676@gmail.com", // Use environment variable
//         pass: process.env.EMAIL_PASS || "utik aaed zdvx xrhi", // Use environment variable
//     },
// });

// // Email sending route
// app.post('/send-email', async (req, res) => {
//     const { sender, subject, message, name } = req.body;

//     if (!sender || !subject || !message || !name) {
//         return res.status(400).json({ success: false, error: 'All fields are required.' });
//     }

//     const mailOptions = {
//         from: sender, // The sender's email provided by the user
//         to: process.env.EMAIL_USER, // Use environment variable
//         subject: `from ${name} (${sender}): ${subject}`, // Include sender's email in the subject
//         text: `Message:-${message}`, // User's message
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//         res.json({ success: true });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log('EMAIL_USER:', process.env.EMAIL_USER);
//     console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
// });

// Export Express app for serverless function
module.exports = app