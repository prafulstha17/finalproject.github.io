import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import './UserProfiles.css';

const UserProfiles = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (timestamp) => {
    if (timestamp instanceof Date) {
      // If timestamp is already a Date object, no conversion needed
      return timestamp.toLocaleString();
    } else if (timestamp && timestamp.toDate) {
      // If timestamp is a Firestore timestamp, convert it to a Date object
      return timestamp.toDate().toLocaleString();
    } else if (typeof timestamp === 'number' && !isNaN(timestamp)) {
      // If timestamp is a number and not NaN, treat it as milliseconds since epoch
      return new Date(timestamp).toLocaleString();
    } else if (typeof timestamp === 'string') {
      // If timestamp is a string, try to parse it
      const parsedDate = new Date(timestamp);
  
      if (!isNaN(parsedDate)) {
        return parsedDate.toLocaleString();
      }
    }
  
    return 'Invalid Date';
  };
  
  useEffect(() => {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');

    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching users from Firestore:', error);
      setError('Error fetching users. Please try again later.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const revokeAccount = async (userId) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');

      // Reference the user document by its ID
      const userDocRef = doc(usersCollection, userId);

      // Update the user document to disable the account
      await updateDoc(userDocRef, {
        disabled: true,
        disabledTime: serverTimestamp(),
      });

      console.log('User account disabled successfully');
    } catch (error) {
      console.error('Error disabling user account:', error);
    }
  };

  const enableAccount = async (userId) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');

      // Reference the user document by its ID
      const userDocRef = doc(usersCollection, userId);

      // Update the user document to enable the account
      await updateDoc(userDocRef, {
        disabled: false,
        enabledTime: serverTimestamp(),
      });

      console.log('User account enabled successfully');
    } catch (error) {
      console.error('Error enabling user account:', error);
    }
  };

  const confirmAction = (action, userId) => {
    const actionText = action === 'enable' ? 'Enable' : 'Revoke';

    const confirmed = window.confirm(`Are you sure you want to ${actionText} the account?`);

    if (confirmed) {
      if (action === 'enable') {
        enableAccount(userId);
      } else {
        revokeAccount(userId);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-profiles-container">
      <h2>User Profiles</h2>
      <div className="user-list">
        <div className="headUser">
          <div className="numberUser">
            <p>#</p>
          </div>
          <div className="nameUser">
            <p>Name</p>
          </div>
          <div className="emailUser">
            <p>Email</p>
          </div>
          <div className="createdUser">
            <p>Creation Date</p>
          </div>
          <div className="actionUser">
            <p>Action</p>
          </div>
        </div>
        {users.map((user, index) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <div className="numberUser">
                <p>{index + 1}</p>
              </div>
              <div className="nameUser">
                <p>{user.displayName}</p>
              </div>
              <div className="emailUser">
                <p>{user.email}</p>
              </div>
              <div className="createdUser">
                {/* Conditional rendering based on metadata availability */}
                <p>{user.metadata ? formatDate(user.metadata.creationTime) : formatDate(user.appliedAt)}</p>
              </div>
              <div className="actionUser">
                {user.disabled ? (
                  <button
                    style={{
                      backgroundColor: '#66cc66',
                      color: '#fff',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      marginTop: '5px',
                    }}
                    onClick={() => confirmAction('enable', user.id)}
                  >
                    Enable Account
                  </button>
                ) : (
                  <button
                    style={{
                      backgroundColor: '#ff6666',
                      color: '#fff',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      marginTop: '5px',
                    }}
                    onClick={() => confirmAction('revoke', user.id)}
                  >
                    Revoke Account
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfiles;
