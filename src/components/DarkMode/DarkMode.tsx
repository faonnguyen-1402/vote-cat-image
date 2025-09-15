import React, { useEffect } from 'react';
import styles from './DarkMode.module.css';

interface DarkModeProps {
  darkMode: boolean;
  onchange: (value: boolean) => void;
}

function DarkMode({ darkMode, onchange }: DarkModeProps) {
  const toggleTheme = () => {
    onchange(!darkMode);

    const newTheme = darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      onchange(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <div className={styles['toggle-container']} onClick={toggleTheme}>
      <div className={`${styles['toggle-btn']} ${darkMode ? styles.dark : ''}`}>
        <div className={styles.icon}>{darkMode ? '🌙' : '☀️'}</div>
      </div>
      <span>{darkMode ? 'Dark mode' : 'Light mode'}</span>
    </div>
  );
}

export default DarkMode;
