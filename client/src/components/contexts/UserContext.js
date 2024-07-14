import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : { firstName: "", lastName: "", email: "" };
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && userData.firstName) {
      setLoggedIn(true);
    }
  }, [userData]);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setUserData(user);
    setLoggedIn(true);
    console.log("User data: ", user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData({ firstName: "", lastName: "", email: "" });
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ loggedIn, login, logout, userData }}>
      {children}
    </UserContext.Provider>
  );
};
