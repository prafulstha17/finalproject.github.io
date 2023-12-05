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

function ApplyButton({ postId, currentUserId, applicationMessage }) {
  const [isApplicationSent, setIsApplicationSent] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(0); // 0: Pending, -1: Rejected, 1: Approved
  const [completed, setCompleted] = useState(0); // 0: Not completed, 1: Completed
  const [file, setFile] = useState(null);

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
        completed: 0, // Initial value: 0 (not completed)
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


  const handleFileUpload = async () => {
    try {
      // Check if a file is selected
      if (file) {
        // Create a storage reference with the desired path
        const storageRef = ref(storage, `submissions/${currentUserId}/${postId}`);

        // Upload the file
        const uploadTask = uploadBytes(storageRef, file);

        // Wait for the upload to complete
        await uploadTask;

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update the completed field and add the downloadURL to the database
        await updateDoc(doc(db, "applications", `${postId}_${currentUserId}`), {
          completed: 1,
          fileDownloadURL: downloadURL,
        });

      }
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const applicationsCollection = collection(db, "applications");
        const q = query(
          applicationsCollection,
          where("userId", "==", currentUserId),
          where("postId", "==", postId)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          const applicationData = querySnapshot.docs[0].data();
          setIsApplicationSent(true);
          setApprovalStatus(applicationData.approved);
          setCompleted(applicationData.completed);
        }
      } catch (error) {
        console.error("Error checking application status:", error);
      }
    };

    checkApplicationStatus();
  }, [currentUserId, postId]);

  return (
    <>
      {isApplicationSent ? (
        <>
          {approvalStatus === 0 && (
            <strong>
              <p
                className="applicationSent"
                style={{ color: "yellow", margin: "0.5rem", fontWeight: "bold" }}
              >
                Application Pending
              </p>
            </strong>
          )}
          {approvalStatus === -1 && (
            <strong>
              <p
                className="applicationRejected"
                style={{ color: "red", margin: "0.5rem", fontWeight: "bold" }}
              >
                Application Rejected
              </p>
            </strong>
          )}
          {approvalStatus === 1 && completed === 0 && (
            <>
              <strong>
                <p
                  className="applicationApproved"
                  style={{ color: "green", margin: "0.5rem", fontWeight: "bold" }}
                >
                  Application Approved
                </p>
              </strong>
              <div>
                {/* File upload section */}
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={handleFileUpload}>Turn In</button>
              </div>
            </>
          )}
        </>
      ) : (
        <button onClick={handleApply}>Apply</button>
      )}
    </>
  );
}

export default ApplyButton;
