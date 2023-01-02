import { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [signedIn, setSignedIn] = useState(false);
	return (
		<UserContext.Provider value={{ signedIn, setSignedIn }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
