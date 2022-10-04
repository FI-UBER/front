import React, { useRef, useState, useContext}  from 'react';
//import Login from './Screen/Login';


let UserContext = React.createContext();

export function currentSession () {
   return useContext(UserContext)
}

export function UserProvider({ children }) {
  let [user, setUser] = useState(false);

  function login() {
    setUser(true);
    console.log('login')
  }

  function logout() {
    setUser(false);
    console.log('logout')
  }
  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}

export function WithSession ({children}) {
  const {user} = useContext(UserContext);
  if (user) {
    return children
  }
  return null;
}

export function WithoutSession ({children}) {
  const {user} = useContext(UserContext);
  if (!user) {
    return children
  }
  return null;
}
