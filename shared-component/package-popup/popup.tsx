'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ReCAPTCHA from 'react-google-recaptcha';
import style from './popup.module.scss';

interface PopupProps {
  onClose?: () => void;
  initialService?: string;
}

interface FormData {
  name: string;
  fatherName: string;
  nic: string;
  category: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, initialService = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    fatherName: '',
    nic: '',
    category: '',
    email: '',
    phone: '',
    service: initialService,
    message: '',
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const validateForm = (): string | null => {
    const { name, fatherName, nic, email, phone, category, service } = formData;

    if (!name.trim()) return 'Name is required';
    if (!fatherName.trim()) return 'Father Name is required';
    if (nic && !/^\d{13}$/.test(nic)) return 'CNIC must be 13 digits if provided';
    if (email && !/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
    if (!/^\d{10,15}$/.test(phone)) return 'Phone must be 10–15 digits';
    if (!category) return 'Please select a category';
    if (!service) return 'Please select a service';
    if (!recaptchaToken) return 'Please complete the reCAPTCHA';

    return null;
  };

  // Handle form submit
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
      const response = await fetch('https://dashboard-rho-lake.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

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
          service: initialService,
          message: '',
        });
        setRecaptchaToken(null);
      } else {
        setResponseMsg(result.message || 'Something went wrong.');
        setSuccess(false);
      }
    } catch (error) {
      console.error('Form submit error:', error);
      setResponseMsg('An error occurred. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Auto-close on success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setResponseMsg('');
        if (onClose) onClose();
      }, 1200);
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

            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>CNIC (optional)</label>
                <input
                  placeholder="13 digits CNIC"
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  inputMode="numeric"
                  pattern="\d{13}"
                  maxLength={13}
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

            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>Email (optional)</label>
                <input
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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

            {/* Service */}
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
              <label>Message (optional)</label>
              <textarea
                placeholder="Write your message..."
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className={style.formGroup}>
              {siteKey ? (
                <ReCAPTCHA sitekey={siteKey} onChange={handleRecaptchaChange} />
              ) : (
                <p style={{ color: 'red' }}>reCAPTCHA site key missing!</p>
              )}
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
