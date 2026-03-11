import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estilo consistente con el Header
  const inputStyle = {
    padding: '12px 20px',
    borderRadius: '25px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box' // Asegura que el padding no desborde el ancho
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
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data.user);
      navigate('/');
    } catch (err) {
      alert('Credenciales incorrectas');
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
        <h2 style={{ color: '#722f37', textAlign: 'center', margin: '0 0 10px 0' }}>Login</h2>
        
        <input 
          type="email" 
          placeholder="Email" 
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Contraseña" 
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a242a'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#722f37'}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;