import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const CountryProvider = ({ children }) => {
	const [sharedCountry, setSharedCountry] = useState('');

	return (
		<DataContext.Provider value={{ sharedCountry, setSharedCountry }}>
			{children}
		</DataContext.Provider>
	);
};

export const useCountry = () => useContext(DataContext);