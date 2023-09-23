// // src/context/AuthContext.js
// import React, { useContext, useState, useEffect } from 'react';
// import { auth } from '../../config/firebase';

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }


// auth.js

import { auth } from '../../config/firebase';

export const listenToAuthChanges = (callback) => {
  const unsubscribe = auth.onIdTokenChanged((user) => {
    callback(user);
  });

  return unsubscribe;
};
