const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

app.post('/sendEmail', async (req, res) => {
  const { to, username, date, shiftNumber } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'parikshit21_ug@cse.nits.ac.in',
      pass: 'Tezu123@', // Ensure this password is correct
    },
  });

  const mailOptions = {
    from: 'parikshit21_ug@cse.nits.ac.in',
    to: to,
    subject: 'Assigned Class',
    text: `Dear ${username},\n\nYour assigned date is ${date} and your shift number is ${shiftNumber}.\n\nBest regards,\nYour Company`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message); // Log detailed error message
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
