import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return(
    <>
    <div  className="grid justify-items-center items-center fixed min-h-screen min-w-full">
      <div className="flex">
        <div
          className="
            animate-spin
            rounded-full
            h-32
            w-32
            border-t-2 border-b-2 border-yellow-500
          "
        ></div>
      </div>
    </div>
    </>
    ) 
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
