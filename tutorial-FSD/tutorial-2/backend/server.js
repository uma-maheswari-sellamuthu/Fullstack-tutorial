import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Attendance from './models/Attendance.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/attendance_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// GET: Fetch all attendance records
app.get('/api/attendance', async (req, res) => {
  try {
    const records = await Attendance.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
});

// POST: Add a new attendance record (for testing purposes, though not explicitly requested, it is needed to populate data)
app.post('/api/attendance', async (req, res) => {
  try {
    const newRecord = new Attendance(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: 'Error creating record', error: error.message });
  }
});

// PUT: Update attendance status
app.put('/api/attendance/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedRecord = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated document
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: 'Error updating record', error: error.message });
  }
});

// DELETE: Delete an incorrect attendance record
app.delete('/api/attendance/:id', async (req, res) => {
  try {
    const deletedRecord = await Attendance.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
