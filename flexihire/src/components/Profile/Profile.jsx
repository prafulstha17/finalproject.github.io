import React, { useEffect, useState } from 'react';
import { auth, storage } from '../../confg/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { BsCamera } from 'react-icons/bs';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    auth.onIdTokenChanged((user) => {
      if (user) {
        const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
        setUser(user);
        getDownloadURL(storageRef)
          .then((url) => {
            setProfilePicUrl(url);
          })
          .catch((error) => {
            console.log(error.message);
            const defaultStorageRef = ref(storage, `default/profile.jpg`);
            getDownloadURL(defaultStorageRef)
              .then((url) => {
                setProfilePicUrl(url);
              })
              .catch((error) => {
                console.log(error.message);
                setProfilePicUrl(null);
              });
          });
      } else {
        setUser(null);
        setProfilePicUrl(null);
      }
    });

    // Check device size on mount and whenever the window is resized
    const checkDeviceSize = () => {
      setIsSmallDevice(window.innerWidth <= 768);
    };

    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);

    return () => {
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      uploadBytes(storageRef, file)
        .then(() => {
          // Get the URL of the uploaded file and update the state
          getDownloadURL(storageRef)
            .then((url) => {
              setProfilePicUrl(url);
              console.log("profilePicUrl set to:", profilePicUrl);
            })
            .catch((error) => {
              console.log(error.message);
              setProfilePicUrl(null);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleProfilePicHover = () => {
      setIsHovered(true);
  };

  const handleProfilePicHoverExit = () => {
      setIsHovered(false);
  };

  const handleProfilePicClick = () => {
    setZoomedIn(!zoomedIn);
  };

  return (
    <div className="profile">
      {user ? (
        <>
          <div
            className="profile-pic-container"
            onMouseOver={handleProfilePicHover}
            onMouseOut={handleProfilePicHoverExit}
          >
            {profilePicUrl ? (
              <div onClick={handleProfilePicClick}>
                <img src={profilePicUrl} alt="Profile" className="profile-pic" />
              </div>
            ) : (
              <div className="profile-pic profile-initial" onClick={handleProfilePicClick}>{user.displayName ? user.displayName[0] : ''}</div>
            )}
            {(isSmallDevice || isHovered) ? (
              <label htmlFor="profile-pic-input">
                <div className="camera-icon-container">
                  <BsCamera size={30} />
                </div>
              </label>
            ) : null}
          </div>
          {zoomedIn && (
            <div className="zoom-overlay" onClick={handleProfilePicClick}>
              <img src={profilePicUrl} alt="Profile" />
            </div>
          )}

          <input
            type="file"
            id="profile-pic-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <br />
          <p className="profile-name">{user.displayName ? user.displayName : 'Anonymous'}</p>
        </>
      ) : (
        <p className='profile-name'>Please log in to view your profile</p>
      )}
    </div>
  );
}

export default Profile;
