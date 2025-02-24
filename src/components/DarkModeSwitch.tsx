import { Switch } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';

const DarkModeSwitch = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window != 'undefined') {
      setIsDark(localStorage.getItem('theme') === 'dark');
    }
  }, []);

  const handelToggle = (checked: boolean) => {
    const html = document.querySelector('html');
    const theme = checked ? 'dark' : 'light';
    if (html) {
      html.classList.toggle('dark', checked);
    }
    localStorage.setItem('theme', theme);
    setIsDark(checked);
  };

  return (
    <label className='mt-2 flex gap-2 items-center'>
      <span className='dark:text-gray-300'>Dark mode:</span>
      <Switch checked={isDark} onCheckedChange={handelToggle} />
    </label>
  );
};

export default DarkModeSwitch;
