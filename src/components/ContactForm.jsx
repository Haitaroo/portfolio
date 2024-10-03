import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';
import Popup from './Popup';

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    user_name: '',
    user_email: '',
    user_subject: '',
    message: ''
  });
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.sendForm('service_mrc6v0i', 'template_ot7dlpt', form.current, 'LjQ8TBPk5RejcFce9')
      .then((result) => {
        setPopup({ show: true, message: 'Message envoyé avec succès!', type: 'success' });
        setTimeout(() => {
          setPopup({ ...popup, show: false });
        }, 2000); // Disappear after 2 seconds
      }, (error) => {
        setPopup({ show: true, message: 'Erreur lors de l\'envoi du message.', type: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });

    setFormData({
      from_name: '',
      user_name: '',
      user_email: '',
      user_subject: '',
      message: ''
    });
  };

  const closePopup = () => {
    setPopup({ ...popup, show: false });
  };

  return (
    <div>
      {popup.show && <Popup message={popup.message} type={popup.type} onClose={closePopup} />}
      <form className="contact-form" ref={form} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from_name">Prénom</label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_name">Nom</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_email">Email</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_subject">Sujet</label>
          <input
            type="text"
            id="user_subject"
            name="user_subject"
            value={formData.user_subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
      {isLoading && <div className="spinner"></div>}
    </div>
  );
};

export default ContactForm;