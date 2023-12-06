import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { auth, db } from './config/firebase';
import {
  getDoc,
  doc,
} from 'firebase/firestore';
import Navbar from './components/Navbar/Navbar';
import PageFooter from './components/PageFooter/PageFooter';
import Message from './components/Message/Message';
import Admin from './components/AdminPanel/Admin';
import Loading from './components/Loading/Loading';
import Revoked from './components/Revoked/Revoked';
import AppRoutes from './AppRoutes';

const AdminContext = React.createContext(false);

function App() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRevoked, setIsRevoked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        setUserName(user.displayName);
        setUser(user);
        setIsAdmin(user.email === 'flexihirenepal@gmail.com');

        // Fetch user data from Firestore to check the revoked status
        try {
          const userDoc = await getUserDocFromFirestore(user.uid);
          setIsRevoked(!!userDoc.disabled);
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
        }
      } else {
        setUserName('');
        setUser(null);
        setIsAdmin(false);
        setIsRevoked(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getUserDocFromFirestore = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return userData;
      } else {
        throw new Error('User document not found in Firestore');
      }
    } catch (error) {
      console.error('Error fetching user data from Firestore:', error);
      throw error;
    }
  };

  if (loading) {
    // Show a loading indicator or skeleton screen while checking authentication state
    return <Loading />;
  }

  return (
    <>
      <AdminContext.Provider value={isAdmin}>
        <Router>
          {isRevoked && (
            <>
              {console.log('Redirecting to /revoked')}
              <Revoked />
            </>
          )}
          {!isAdmin && !isRevoked && (
            <>
              <Navbar />
              <AppRoutes userName={userName} />
              <PageFooter />
              <Message />
            </>
          )}
          {isAdmin && <Admin />}
        </Router>
      </AdminContext.Provider>
    </>
  );
}

export default App;
