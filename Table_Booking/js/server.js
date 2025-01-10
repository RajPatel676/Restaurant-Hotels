// **************************************************************************************************




const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Create an instance of express
const app = express();
// const upload = multer();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());



app.get('/Table_Booking', (req, res) => {
    res.sendFile(path.join(__dirname, '../contact.html'));  // Serve the HTML file
});

// Email sender configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
    auth: {
        user: 'bookify676@gmail.com', // Replace with your email
        pass: 'ggoc jsgv qrva qxps', // Replace with your email password or app password
    },
});

// Function to send email
function sendEmail(userEmail, subject, message) {
    const mailOptions = {
        from: 'rp2737188@gmail.com',
        to: 'bookify676@gmail.com',
        subject: subject,
        text: `User Email: ${userEmail}\n\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}

// Serve static files (e.g., HTML)
app.use(express.static(path.join(__dirname, '..')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Handle form submission
app.post('/send-email', (req, res) => {

    const { name, email, subject, message } = req.body;
    console.log('Received form data:', { name, email, subject, message });
    sendEmail(email, subject, message);
    res.send('Message sent successfully!');

});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});