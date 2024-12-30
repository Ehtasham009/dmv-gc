import React, { useState, useEffect } from 'react';

const UseDeviceType = () => {
  const [deviceType, setDeviceType] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      if (innerWidth <= 768) {
        setDeviceType('Mobile');
      } else if (innerWidth > 768 && innerWidth <= 1024) {
        setDeviceType('Tablet');
      } else {
        setDeviceType('Desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};

export default UseDeviceType;
