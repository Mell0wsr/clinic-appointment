import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Validation schema with added date field
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  rsaId: yup
    .string()
    .matches(/^\d{13}$/, 'RSA ID must be 13 numeric digits')
    .required('RSA ID is required'),
  reason: yup.string().required('Reason for appointment is required'),
  date: yup.string().required('Appointment date is required'),
});

const AppointmentForm = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Generate dates for the next 5 days
  const [availableDates] = useState(() => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      dates.push(futureDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }
    return dates;
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:27017/appointments', data);
      alert('Appointment booked successfully! Await approval via E-mail');
    } catch (error) {
      console.error(error);
      alert(`Failed to book appointment: ${error.response.data.message}`);

    }
    finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="appointment-form">
      <h2>Book Your Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
       
        {/* Rest of the form fields */}
        <div>
          <input {...register('firstName')} placeholder="First Name" />
          <p>{errors.firstName?.message}</p>
        </div>

        <div>
          <input {...register('lastName')} placeholder="Last Name" />
          <p>{errors.lastName?.message}</p>
        </div>

        <div>
          <input {...register('email')} placeholder="Email" />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <input {...register('phone')} placeholder="Phone Number" />
          <p>{errors.phone?.message}</p>
        </div>

        <div>
          <input {...register('address')} placeholder="Residential Address" />
          <p>{errors.address?.message}</p>
        </div>

        <div>
          <input {...register('rsaId')} placeholder="RSA ID (13 Numeric Digits)" />
          <p>{errors.rsaId?.message}</p>
        </div>

        <div>
          <select {...register('reason')}>
            <option value="">Select Reason</option>
            <option value="General Consultation">General Consultation</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Prescription Refill">Prescription Refill</option>
            <option value="Prenatal/Antenatal Care">Prenatal/Antenatal Care</option>
            <option value="Follow-up Visit">Follow-up Visit</option>
            <option value="HIV & AIDS Healthcare">HIV & AIDS Healthcare</option>
            <option value="Chronic Diseases">Chronic Diseases (TB and Cancer)</option>
            <option value="Other">Other</option>
          </select>
          <p>{errors.reason?.message}</p>
        </div>

        <div>
          <textarea {...register('otherReason')} placeholder="Other Reason (Optional)" />
        </div>
         {/* Date Selection */}
         <div>
          <label htmlFor="date">Select Appointment Date:</label>
          <select {...register('date')} id="date">
            <option value="">-- Select a Date --</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toDateString()} {/* Display as human-readable */}
              </option>
            ))}
          </select>
          <p>{errors.date?.message}</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Booking in Progress...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
