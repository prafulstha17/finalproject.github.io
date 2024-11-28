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
} from "firebase/firestore";
import { db } from "../../config/firebase";
import './ApplyButton.css';

function ApplyButton({ postId, currentUserId }) {
  const [isApplicationSent, setIsApplicationSent] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(0); // 0: Pending, -1: Rejected, 1: Approved
  const [category, setCategory] = useState(""); // Store post's category

  const handleApply = async () => {
    try {
      console.log("Current User ID:", currentUserId);
      console.log("Post ID:", postId);

      // Fetch the post document to get the category
      const postDocRef = doc(db, "posts", postId);
      const postDocSnapshot = await getDoc(postDocRef);

      if (!postDocSnapshot.exists()) {
        console.error("Post document not found");
        return;
      }

      const postData = postDocSnapshot.data();
      const postCategory = postData.category; // Get the category from the post

      // Fetch the user document to get the username
      const userDocRef = doc(db, "users", currentUserId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        console.error("User document not found");
        return;
      }

      const userData = userDocSnapshot.data();

      // Add application to the "applications" collection
      const applicationsCollection = collection(db, "applications");
      const newApplicationRef = await addDoc(applicationsCollection, {
        userId: currentUserId,
        postId: postId,
        applicationId: "", // Placeholder, this will be updated below
        appliedAt: serverTimestamp(),
        username: userData.displayName,
        category: postCategory, // Store the category in the application
        approved: 0, // Initial value: 0 (pending)
      });

      setIsApplicationSent(true);

      // Save the applicationId to the application document
      await updateDoc(newApplicationRef, {
        applicationId: newApplicationRef.id,
      });

      console.log("Application submitted with category:", postCategory);
    } catch (error) {
      console.error("Error applying to post:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the post category to display it
        const postDocRef = doc(db, "posts", postId);
        const postDocSnapshot = await getDoc(postDocRef);

        if (postDocSnapshot.exists()) {
          setCategory(postDocSnapshot.data().category);
        }

        // Check if there is an existing application for this user and post
        const applicationsCollection = collection(db, "applications");
        const applicationQ = query(
          applicationsCollection,
          where("postId", "==", postId),
          where("userId", "==", currentUserId)
        );

        const applicationQuerySnapshot = await getDocs(applicationQ);
        setIsApplicationSent(applicationQuerySnapshot.size > 0);

        if (applicationQuerySnapshot.size > 0) {
          const applicationData = applicationQuerySnapshot.docs[0].data();
          setApprovalStatus(applicationData.approved);
        }
      } catch (error) {
        console.error("Error fetching application data:", error);
      }
    };

    fetchData();
  }, [currentUserId, postId]);

  return (
    <>
      <p>
        <strong>Category:</strong> {category || "Fetching..."}
      </p>
      {!isApplicationSent && <button onClick={handleApply}>Apply</button>}
      {isApplicationSent && (
        <>
          {approvalStatus === 0 && (
            <p className="applicationPending" style={{ color: "yellow" }}>
              Application Pending
            </p>
          )}
          {approvalStatus === -1 && (
            <p className="applicationRejected" style={{ color: "red" }}>
              Application Rejected
            </p>
          )}
          {approvalStatus === 1 && (
            <p className="applicationApproved" style={{ color: "green" }}>
              Application Approved
            </p>
          )}
        </>
      )}
    </>
  );
}

export default ApplyButton;
