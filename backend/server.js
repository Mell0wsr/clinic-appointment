
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const uri = "mongodb+srv://Mell0w:CLIN-app25@clinic-appointment.d8vpw.mongodb.net/?retryWrites=true&w=majority&appName=clinic-appointment";
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 27017;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// connect to MongoDB

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect(); // Connect to the database
    const db = client.db("clinic-appointment"); // Use clinic-appointment database
    console.log("Successfully connected to MongoDB!");

    // Routes to interact with the database
    app.post('/appointments', async (req, res) => {
      try {
        const appointment = req.body; // Get appointment details from the request
        const result = await db.collection('appointments').insertOne(appointment);
        res.status(201).json({ message: "Appointment booked successfully", appointmentId: result.insertedId });
      } catch (error) {
        res.status(500).json({ message: "Failed to book appointment", error });
      }
    });

    app.get('/appointments', async (req, res) => {
      try {
        const appointments = await db.collection('appointments').find().toArray();
        res.status(200).json(appointments);
      } catch (error) {
        res.status(500).json({ message: "Failed to retrieve appointments", error });
      }
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

// Start the server and connect to the database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});