import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es'); // Idioma inicial por defecto

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usarlo fácilmente en cualquier componente
export const useLanguage = () => useContext(LanguageContext);