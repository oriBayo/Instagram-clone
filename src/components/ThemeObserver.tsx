'use client';
import { useEffect } from 'react';

export default function ThemeObserver() {
  useEffect(() => {
    const html = document.querySelector('html');
    const theme = window.localStorage.getItem('theme') || 'light';
    if (html) {
      html.classList.toggle('dark', theme === 'dark');
    }
  }, []);
  return null;
}
