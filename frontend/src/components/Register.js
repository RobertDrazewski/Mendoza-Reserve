import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const navigate = useNavigate();

  const inputStyle = {
    padding: '12px 20px',
    borderRadius: '25px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    backgroundColor: '#722f37',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
    transition: 'background 0.3s'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registro exitoso');
      navigate('/login');
    } catch (err) {
      alert('Error en el registro: Verifica que el email no esté en uso');
    }
  };

  return (
    <div style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px', 
          width: '100%', 
          maxWidth: '350px',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          backgroundColor: '#f9f9f9'
        }}
      >
        <h2 style={{ color: '#722f37', textAlign: 'center', margin: '0 0 10px 0' }}>Registro</h2>
        
        <input 
          type="text" 
          placeholder="Nombre" 
          style={inputStyle}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          style={inputStyle}
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          style={inputStyle}
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a242a'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#722f37'}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;