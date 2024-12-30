import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState();

  const setActiveItem = (item) => {
    setActiveMenuItem(item);
  };

  return (
    <MyContext.Provider value={{ activeMenuItem, setActiveItem }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export { MyContextProvider, useMyContext };
