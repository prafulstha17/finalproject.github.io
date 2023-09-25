import React, { useState, useEffect } from "react";

function ApplyButton({ postId, currentUserId, applicationMessage }) {
  const [isApplicationSent, setIsApplicationSent] = useState(
    // Check if the status is stored in localStorage, default to false if not found
    JSON.parse(localStorage.getItem(`applicationStatus_${postId}`)) || false
  );

  const handleApply = async () => {
    try {
      // Save user application data to Firestore (or perform other actions)

      // Set application sent flag in localStorage
      localStorage.setItem(`applicationStatus_${postId}`, JSON.stringify(true));
      setIsApplicationSent(true);
    } catch (error) {
      console.error("Error applying to post:", error);
    }
  };

  useEffect(() => {
    // Check and update the application status when the component mounts
    const storedStatus = JSON.parse(
      localStorage.getItem(`applicationStatus_${postId}`)
    );
    if (storedStatus !== null) {
      setIsApplicationSent(storedStatus);
    }
  }, [postId]);

  return (
    <>
      {isApplicationSent ? (
        <strong>
          <p
            className="applicationSent"
            style={{ color: "green", margin: "0.5rem" }}
          >
            Application Sent
          </p>
        </strong>
      ) : (
        <button onClick={handleApply}>Apply</button>
      )}
    </>
  );
}

export default ApplyButton;
