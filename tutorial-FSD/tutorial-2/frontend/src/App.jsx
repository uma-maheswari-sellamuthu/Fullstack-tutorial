import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Users } from 'lucide-react';
import AttendanceCard from './components/AttendanceCard';
import './index.css'; // Make sure styles are imported

const API_URL = 'http://localhost:5000/api/attendance';

function App() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [newRollNumber, setNewRollNumber] = useState('');

  // Fetch Attendance List
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setAttendanceList(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch attendance data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new record (helper for testing)
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudentName || !newRollNumber) return;

    try {
      const response = await axios.post(API_URL, {
        studentName: newStudentName,
        rollNumber: newRollNumber,
        status: 'Present'
      });
      // Instant update
      setAttendanceList([response.data, ...attendanceList]);
      setNewStudentName('');
      setNewRollNumber('');
    } catch (err) {
      console.error('Failed to add student:', err);
    }
  };

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    // Optimistic update
    setAttendanceList(prevList => 
      prevList.map(item => item._id === id ? { ...item, status: newStatus } : item)
    );

    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
    } catch (err) {
      console.error('Failed to update status:', err);
      // Revert on error
      fetchAttendance();
    }
  };

  // Delete Record
  const handleDelete = async (id) => {
    // Optimistic update
    setAttendanceList(prevList => prevList.filter(item => item._id !== id));

    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (err) {
      console.error('Failed to delete record:', err);
      // Revert on error
      fetchAttendance();
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Student Attendance Portal</h1>
        <p>Manage and track student attendance in real-time</p>
      </div>

      <form className="add-student-form" onSubmit={handleAddStudent}>
        <input 
          type="text" 
          placeholder="Student Name" 
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Roll Number" 
          value={newRollNumber}
          onChange={(e) => setNewRollNumber(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          <UserPlus size={20} />
          Add Student
        </button>
      </form>

      {error && <div style={{color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}

      <div className="attendance-list">
        {loading ? (
          <div className="empty-state">Loading...</div>
        ) : attendanceList.length === 0 ? (
          <div className="empty-state">
            <Users size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No attendance records found.</p>
          </div>
        ) : (
          attendanceList.map(student => (
            <AttendanceCard 
              key={student._id} 
              student={student} 
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
