import React, { useEffect, useState } from 'react';
import { auth, storage } from '../../confg/firebase';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        storage.ref(`users/${user.uid}/profile.jpg`).getDownloadURL().then(url => {
          setProfilePicUrl(url);
        }).catch(error => {
          console.log(error.message);
          setProfilePicUrl(null);
        });
      } else {
        setUser(null);
        setProfilePicUrl(null);
      }
    });
  }, []);

  return (
    <div className="profile">
      {user ? (
        <>
          {profilePicUrl ? (
            <img src={profilePicUrl} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-pic profile-initial">{user.displayName[0]}</div>
          )}
          <p className="profile-name">{user.displayName}</p>
          <p className="profile-email">{user.email}</p>
        </>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;
