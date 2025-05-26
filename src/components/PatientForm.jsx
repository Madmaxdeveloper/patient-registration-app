import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { executeQuery } from '../db/database.js';
import * as db from '../db/database';
console.log(db);

export default function PatientForm({ onPatientAdded }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const query = `
        INSERT INTO patients (first_name, last_name, date_of_birth, gender, email, phone, address)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      
      await executeQuery(query, [
        formData.firstName,
        formData.lastName,
        formData.dateOfBirth,
        formData.gender,
        formData.email || null,
        formData.phone || null,
        formData.address || null
      ]);
      
      toast.success('Patient registered successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'male',
        email: '',
        phone: '',
        address: ''
      });
      
      onPatientAdded();
    } catch (error) {
      console.error('Error registering patient:', error);
      toast.error('Failed to register patient');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Register New Patient</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dateOfBirth">Date of Birth *</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        
        <div className="pt-2">
          <button type="submit" className="btn-primary w-full">
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
}