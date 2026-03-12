import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const t = {
    es: { 
      title: "Registro", 
      name: "Nombre", 
      email: "Email", 
      pass: "Contraseña", 
      btn: "Registrarse", 
      success: "Registro exitoso", 
      error: "Error en el registro: Verifica los datos" 
    },
    en: { 
      title: "Register", 
      name: "Name", 
      email: "Email", 
      pass: "Password", 
      btn: "Register", 
      success: "Registration successful", 
      error: "Registration error: Please check your data" 
    }
  };

  const currentT = t[lang] || t['es'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(currentT.success);
      navigate('/login');
    } catch (err) {
      alert(currentT.error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">{currentT.title}</h2>
        
        <input 
          type="text" 
          placeholder={currentT.name} 
          className="auth-input"
          onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
          required 
        />
        <input 
          type="email" 
          placeholder={currentT.email} 
          className="auth-input"
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder={currentT.pass} 
          className="auth-input"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        
        <button type="submit" className="auth-btn-submit">
          {currentT.btn}
        </button>
      </form>
    </div>
  );
};

export default Register;