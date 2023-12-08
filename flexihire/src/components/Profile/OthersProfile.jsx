import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    doc,
    addDoc,
    getDoc,
    collection,
    serverTimestamp,
} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import Progress from './Progress';
import './OthersProfile.css';

const OthersProfile = () => {
    const { userId } = useParams();
    console.log('UserId from URL parameters:', userId);
    const [userDetails, setUserDetails] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [initials, setInitials] = useState(null); // New state for initials

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                console.log('The user Id is', userId);
                const userInfoDoc = doc(db, 'users', userId);
                const userInfoSnapshot = await getDoc(userInfoDoc);

                if (userInfoSnapshot.exists) {
                    const userData = userInfoSnapshot.data();
                    setUserDetails(userData);

                    const appliedAt = userData?.appliedAt || userData?.metadata?.creationTime;
                    console.log('Applied At:', appliedAt);

                    const profileImageRef = ref(storage, `users/${userId}/profile.jpg`);
                    const cvFileRef = ref(storage, `user-files/${userId}/cv.pdf`);

                    try {
                        const profileImageUrl = await getDownloadURL(profileImageRef);
                        // Set profile image
                        setProfileImage(profileImageUrl);
                    } catch (error) {
                        console.log('Profile image not found.');
                    }

                    // Check if CV file exists
                    try {
                        const cvFileUrl = await getDownloadURL(cvFileRef);
                        setCvFile(cvFileUrl);
                    } catch (error) {
                        console.log('CV file not found.');
                        // Set a message or handle the absence of CV file as needed
                    }
                } else {
                    console.log('User not found.');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    useEffect(() => {
        // Set initials if profileImage is not available and userDetails has displayName
        if (!profileImage && userDetails?.displayName && !initials) {
            setInitials(userDetails.displayName[0].toUpperCase());
        }
    }, [profileImage, userDetails?.displayName, initials]);

    if (!userDetails) {
        return <p>Loading...</p>;
    }

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

    const handleReportButtonClick = async () => {
        try {
            if (userDetails) {
                // Prompt the user to enter a reason for reporting
                const reportReason = prompt('Please enter the reason for reporting this user:');
    
                if (reportReason !== null) {
                    // Use the 'reports' collection reference to automatically generate a reportId
                    const reportsCollectionRef = collection(db, 'reports');
                    const timestamp = serverTimestamp();
                    
                    // Add a new document to the 'reports' collection with the user's ID and reason
                    const newReportDocRef = await addDoc(reportsCollectionRef, {
                        user: userDetails.userId,
                        reason: reportReason,
                        timestamp: timestamp,
                    });
    
                    console.log('User reported successfully with reason:', reportReason);
                    console.log('Generated reportId:', newReportDocRef.id);
                } else {
                    console.log('User report canceled.');
                }
            } else {
                console.error('User details not available.');
            }
        } catch (error) {
            console.error('Error reporting user:', error);
        }
    };
  
    return (
        <div className="user-container">
            {profileImage ? (
                <div>
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-pic"
                    />
                </div>
            ) : (
                <div
                    className="profile-pic profile-initial"
                >
                    {initials || (userDetails?.displayName ? userDetails.displayName[0].toUpperCase() : "")}
                </div>
            )}
            <h1>{userDetails?.displayName}</h1>
            <p>Email: {userDetails?.email}</p>
            <p>Account created in: {userDetails?.metadata ? formatDate(userDetails.metadata.creationTime) : userDetails?.appliedAt ? formatDate(userDetails.appliedAt) : 'Unknown Date'}</p>

            {!cvFile && <p>CV not uploaded</p>}
            {cvFile && (
                <div className="cv-container">
                    <p>CV:</p>
                    {/* Use the cvFile URL directly */}
                    <a href={cvFile} target="_blank" rel="noopener noreferrer">
                        View CV
                    </a>

                    {/* Add a button to report the user */}
                </div>
            )}
            <button onClick={handleReportButtonClick}>Report User</button>
            <Progress currentUserId={userDetails?.userId} />
        </div>
    );
};

export default OthersProfile;
