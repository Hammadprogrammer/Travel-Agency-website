'use client';
import React, { useState, FormEvent, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import style from './popup.module.scss';

// Add initialService to props
const Popup = ({ onClose, initialService = '' }: { onClose?: () => void, initialService?: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    nic: '',
    category: '',
    email: '',
    phone: '',
    // Use initialService for the default value
    service: initialService, 
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, fatherName, nic, email, phone, message, category, service } = formData;

    if (!name.trim()) return 'Name is required';
    if (!fatherName.trim()) return 'Father Name is required';
    if (!/^\d{13}$/.test(nic)) return 'CNIC must be 13 digits';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
    if (!/^\d{10,15}$/.test(phone)) return 'Phone must be 10–15 digits';
    if (!category) return 'Please select a category';
    if (!service) return 'Please select a service';
    if (!message.trim() ) return 'Message is required'; // Added validation for message
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setResponseMsg(error);
      setSuccess(false);
      return;
    }

    setLoading(true);
    setResponseMsg('');
    try {
      const response = await fetch(
        'https://dashboard-rho-lake.vercel.app/api/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setResponseMsg('Message Sent Successfully');
        setFormData({
          name: '',
          fatherName: '',
          nic: '',
          category: '',
          email: '',
          phone: '',
          service: initialService, // Reset service to initialService or empty string
          message: ''
        });
      } else {
        setResponseMsg(result.message || 'Something went wrong.');
        setSuccess(false);
      }
    } catch (error) {
      setResponseMsg('An error occurred. Please try again.');
      setSuccess(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setResponseMsg('');
        if (onClose) onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose]);

  return (
    <div className={style.popupOverlay}>
      <div className={style.popupContainer}>
        <div className={style.popupHeader}>
          <h2 className={style.popupTitle}>Contact Form</h2>
          {onClose && (
            <button onClick={onClose} className={style.closeBtn}>
              ✕
            </button>
          )}
        </div>

        <div className={style.popupBody}>
          <form onSubmit={handleSubmit} className={style.form}>
            {/* Row 1 */}
            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>Name</label>
                <input
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label>Father Name</label>
                <input
                  placeholder="Enter your father name"
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>CNIC</label>
                <input
                  placeholder="13 digits CNIC"
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  inputMode="numeric"
                  pattern="\d{13}"
                  maxLength={13}
                  required
                  className={style.noSpinner}
                />
              </div>
              <div className={style.formGroup}>
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Economic">Economic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>Email</label>
                <input
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label>Phone</label>
                <input
                  placeholder="Enter your phone number"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={style.formGroup}>
              <label>Service</label>
              <select name="service" value={formData.service} onChange={handleChange} required>
                <option value="">Select Service</option>
                <option value="Hajj Packages">Hajj Packages</option>
                <option value="Umrah Packages">Umrah Packages</option>
                <option value="International Tours">International Tours</option>
                <option value="Domestic Packages">Domestic Packages</option>
              </select>
            </div>

            <div className={style.formGroup}>
              <label>Message</label>
              <textarea
                placeholder="Write your message..."
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={style.submitBtn}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            {responseMsg && (
              <p
                className={`${style.message} ${
                  success ? style.successMessage : style.errorMessage
                }`}
              >
                {success && <CheckCircleIcon className={style.successIcon} />}
                {responseMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;