import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './AdminView.css'; // Optional CSS file for styling

const AdminView = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:27017/appointments');
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-view">
      <h2>Admin Dashboard: All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>RSA ID</th>
              <th>Reason</th>
              <th>Other Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.date}</td>
                <td>{appointment.firstName}</td>
                <td>{appointment.lastName}</td>
                <td>{appointment.email}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.address}</td>
                <td>{appointment.rsaId}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.otherReason || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminView;
