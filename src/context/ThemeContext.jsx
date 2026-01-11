import React, { createContext, useState, useEffect, useContext } from 'react';

// Context তৈরি
const ThemeContext = createContext();

// Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider কম্পোনেন্ট
export const ThemeProvider = ({ children }) => {
  // localStorage বা সিস্টেম থিম চেক
  const getInitialTheme = () => {
    // ১. localStorage চেক
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // ২. সিস্টেম প্রেফারেন্স চেক
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // ৩. ডিফল্ট
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // থিম প্রয়োগ করার ফাংশন
  const applyTheme = (themeName) => {
    // HTML ট্যাগে ডেটা অ্যাট্রিবিউট সেট
    document.documentElement.setAttribute('data-theme', themeName);
    // Tailwind এর dark ক্লাস যোগ/মুছে
    if (themeName === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // localStorage-এ সেভ
    localStorage.setItem('theme', themeName);
  };

  // প্রথম লোডে থিম প্রয়োগ
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // থিম টগল ফাংশন
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};