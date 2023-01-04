import { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState()
	return (
		<UserContext.Provider value={{ signedIn, setSignedIn, setUser, user }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
