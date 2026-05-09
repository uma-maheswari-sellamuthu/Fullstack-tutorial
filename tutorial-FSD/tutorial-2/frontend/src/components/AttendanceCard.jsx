import React from 'react';
import { CheckCircle2, XCircle, Trash2 } from 'lucide-react';

const AttendanceCard = ({ student, onUpdateStatus, onDelete }) => {
  const isPresent = student.status === 'Present';
  const dateStr = new Date(student.date).toLocaleDateString();

  return (
    <div className="attendance-card">
      <div className="student-info">
        <h3 className="student-name">{student.studentName}</h3>
        <div className="student-meta">
          <span>Roll No: {student.rollNumber}</span>
          <span>Date: {dateStr}</span>
        </div>
      </div>
      <div className="card-actions">
        <button 
          className={`status-badge ${isPresent ? 'status-present' : 'status-absent'}`}
          onClick={() => onUpdateStatus(student._id, isPresent ? 'Absent' : 'Present')}
          title="Toggle Status"
        >
          {isPresent ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {student.status}
        </button>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(student._id)}
          title="Delete Record"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default AttendanceCard;
