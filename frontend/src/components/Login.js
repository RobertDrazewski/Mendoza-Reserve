import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const t = {
    es: { title: "Login", email: "Email", pass: "Contraseña", btn: "Entrar", error: "Credenciales incorrectas" },
    en: { title: "Login", email: "Email", pass: "Password", btn: "Sign In", error: "Invalid credentials" }
  };

  const currentT = t[lang] || t['es'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data.user);
      navigate('/');
    } catch (err) {
      alert(currentT.error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">{currentT.title}</h2>
        
        <input 
          type="email" 
          placeholder={currentT.email} 
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder={currentT.pass} 
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" className="auth-btn-submit">
          {currentT.btn}
        </button>
      </form>
    </div>
  );
};

export default Login;