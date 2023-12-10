import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import './ApplyButton.css';

function ApplyButton({ postId, currentUserId, applicationMessage }) {
  const [isApplicationSent, setIsApplicationSent] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(0); // 0: Pending, -1: Rejected, 1: Approved
  const [completed, setCompleted] = useState(0); // 0: Not completed, 1: Completed
  const [approvedStatus, setApprovedStatus] = useState(0); // 0: Not completed, 1: Completed

  const handleApply = async () => {
    try {
      console.log("Current User ID:", currentUserId);
      console.log("Post ID:", postId);

      // Fetch the user document to get the username
      const userDocRef = doc(db, "users", currentUserId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        console.error("User document not found");
        return;
      }

      const userData = userDocSnapshot.data();

      const applicationsCollection = collection(db, "applications");
      const newApplicationRef = await addDoc(applicationsCollection, {
        userId: currentUserId,
        postId: postId,
        applicationId: "", // Placeholder, this will be updated below
        appliedAt: serverTimestamp(),
        username: userData.displayName,
        approved: 0, // Initial value: 0 (pending)
      });

      setIsApplicationSent(true);

      // Save the applicationId to the application document
      await updateDoc(newApplicationRef, {
        applicationId: newApplicationRef.id,
      });

      // Listen for changes to the application document
      const unsubscribe = onSnapshot(
        doc(db, "applications", postId, currentUserId),
        (snapshot) => {
          const { approved, completed } = snapshot.data();
          setApprovalStatus(approved);
          setCompleted(completed);
        }
      );

      // Cleanup the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Error applying to post:", error);
    }
  };

  const handleApproval = async (status) => {
    try {
      const applicationDocRef = doc(db, "applications", postId);
      await updateDoc(applicationDocRef, {
        approved: status,
      });

      setApprovalStatus(status);
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    try {
      // Check if a file is selected
      if (file) {
        // Display a confirmation dialog
        const userConfirmed = window.confirm("Are you sure you want to submit this file?");

        if (userConfirmed) {
          // Create a storage reference with the desired path
          const storageRef = ref(storage, `submissions/${currentUserId}/${file.name}`);

          // Upload the file
          await uploadBytes(storageRef, file);

          // Get the URL of the uploaded file
          const fileDownloadURL = await getDownloadURL(storageRef);

          // Query the "accepted" collection to find the matching document
          const acceptedCollectionRef = collection(db, "accepted");
          const q = query(
            acceptedCollectionRef,
            where("postId", "==", postId) // Assuming userData contains the username
          );

          const querySnapshot = await getDocs(q);

          if (querySnapshot.size > 0) {
            // Update the matching document in the "accepted" collection
            const acceptedDocRef = querySnapshot.docs[0].ref;
            await updateDoc(acceptedDocRef, {
              completed: 1,
              fileDownloadURL: fileDownloadURL,
            });

            // Set the completion status in the state
            setCompleted(1);

            // Inform the user that the file has been successfully submitted
            alert("File submitted successfully!");
          } else {
            console.error("Matching document not found in the 'accepted' collection");
          }
        }
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if there is an application for the current user and post
        const applicationsCollection = collection(db, "applications");
        const applicationQ = query(
          applicationsCollection,
          where("postId", "==", postId),
          where("userId", "==", currentUserId) // Add this condition to match userId
        );

        const applicationQuerySnapshot = await getDocs(applicationQ);

        // Update isApplicationSent based on the existence of data
        setIsApplicationSent(applicationQuerySnapshot.size > 0);

        if (applicationQuerySnapshot.size > 0) {
          const applicationData = applicationQuerySnapshot.docs[0].data();
          setApprovalStatus(applicationData.approved);

          // If there is an application, check its approval status
          if (applicationData.approved === 0) {
            // Application is pending
            setApprovedStatus(0);
          } else if (applicationData.approved === -1) {
            // Application is rejected
            setApprovedStatus(-1); // Adjust as needed
          } else if (applicationData.approved === 1) {
            setApprovedStatus(1); // Adjust as needed

            // Application is approved, check the "accepted" collection
            const acceptedCollectionRef = collection(db, "accepted");
            const acceptedQ = query(
              acceptedCollectionRef,
              where("postId", "==", postId),
              where("userId", "==", currentUserId) // Add this condition to match userId
            );

            const acceptedQuerySnapshot = await getDocs(acceptedQ);

            if (acceptedQuerySnapshot.size > 0) {
              const acceptedData = acceptedQuerySnapshot.docs[0].data();

              if (acceptedData.completed === 1) {
                // File is turned in
                setCompleted(1);
              } else {
                // File is not turned in, show the option to upload
                setCompleted(0);
              }
            } else {
              // No data in "accepted" collection, show the option to upload
              setCompleted(0);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching application data:", error);
      }
    };

    fetchData();
  }, [currentUserId, postId]);

  return (
    <>
      {!isApplicationSent && (
        <button onClick={handleApply}>Apply</button>
      )}
      {isApplicationSent && (
        <>
          {approvedStatus === 0 && (
            <strong>
              <p
                className="applicationSent"
                style={{ color: "yellow", margin: "0.5rem", fontWeight: "bold" }}
              >
                Application Pending
              </p>
            </strong>
          )}
          {approvedStatus === -1 && (
            <strong>
              <p
                className="applicationRejected"
                style={{ color: "red", margin: "0.5rem", fontWeight: "bold" }}
              >
                Application Rejected
              </p>
            </strong>
          )}
          {approvedStatus === 1 && completed === 0 && (
            <>
              <strong>
                <p
                  className="applicationApproved"
                  style={{ color: "green", margin: "0.5rem", fontWeight: "bold" }}
                >
                  Application Approved
                </p>
              </strong>
              {/* File upload section */}
              <div className="turnIn">
                <label htmlFor="fileInput" className="fileInputLabel">
                  <i className="fa-solid fa-upload"></i>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileUpload}
                />
              </div>
            </>
          )}
          {approvedStatus === 1 && completed === 1 && (
            <strong>
              <p
                className="applicationTurnedIn"
                style={{ color: "blue", margin: "0.5rem", fontWeight: "bold" }}
              >
                Turned In
              </p>
            </strong>
          )}
        </>
      )}
    </>
  );
}

export default ApplyButton;