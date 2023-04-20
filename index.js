const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend page from build directory
app.use(express.static(path.join(__dirname, 'build')));

// MongoDB Cloud connection URI (replace with your own)
const MONGODB_URI = 'mongodb+srv://pradeepprajapati2859:Pradeep2859@cluster0.ijogxfu.mongodb.net/test';

// Connect to MongoDB Cloud
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define contact form schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
});

// Define contact form model
const Contact = mongoose.model('Contact', ContactSchema);

// Handle contact form submission
app.post('/contact', async (req, res) => {
  try {
    // Create new contact from request body
    const contact = new Contact(req.body);
    // Save contact to MongoDB Cloud
    await contact.save();
    // res.status(200).send('Thank you for your message!');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong...');
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
