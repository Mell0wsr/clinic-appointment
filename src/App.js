import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import AppointmentForm from './components/AppointmentForm';
import AdminView from './components/AdminView'; // Add if Admin view is implemented
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Header or Navigation */}
        <header className="app-header">
          <h1>Welcome to RSA Clinic Appointment System</h1>
             {/* Admin Button */}
              <Link to="/admin" className="admin-button">
            Admin Panel
          </Link>
        </header>

        {/* Routes */}
        <Routes>
         <Route path="/" element={<AppointmentForm />} /> 
          <Route path="/admin" element={<AdminView />} /> {/* Optional for admin */}
        </Routes>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            Made with ❤️ by <a href="https://your-portfolio.com" target="_blank" rel="noopener noreferrer">Wiseka M. Khosa, Sr</a>
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
