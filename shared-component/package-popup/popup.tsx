'use client';
import React, { useState, FormEvent } from 'react';
import style from './popup.module.scss';

const Popup = ({ onClose }: { onClose?: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    nic: '',
    category: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
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
      setMessage(result.message);
      if (response.ok) {
        setFormData({
          name: '',
          fatherName: '',
          nic: '',
          category: '',
          email: '',
          phone: ''

        });
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            <div className={style.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                placeholder='Enter your name' 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="fatherName">Father Name</label>
              <input
                placeholder='Enter your father name'
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="cnic">CNIC</label>
              <input
                placeholder="Enter your CNIC"
                type="number"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                maxLength={13}
                pattern="\d{13}"
                title="CNIC must be exactly 13 digits" 
                required
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="category">Category</label>
              <input
                placeholder='Enter category'
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                placeholder='Enter your email address'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                placeholder='Enter your phone number'
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={style.submitBtn}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            {message && <p className={style.message}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;


