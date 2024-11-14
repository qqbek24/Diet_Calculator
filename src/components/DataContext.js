import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [sharedVariable, setSharedVariable] = useState('');

  return (
    <DataContext.Provider value={{ sharedVariable, setSharedVariable }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);