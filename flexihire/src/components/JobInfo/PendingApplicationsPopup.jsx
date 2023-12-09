// PendingApplicationsPopup.js
import React from "react";
import './PendingApplicationsPopup.css';

const PendingApplicationsPopup = ({ isOpen, handleClose, pendingApplications, handleApproveReject, postTitle, postDescription }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="pending-applications-popup">
      <div className="forPost">
        <strong>
          <div className="popup-header">
            <h2>Applications for "{postTitle}"</h2>
          </div>
        </strong>
        <div className="popup-content">
          <p>{postDescription}</p>
        </div>
        <ul>
          {pendingApplications.map((application) => (
            <li key={application.userId}>
              <p>
                <a href={`/users/${application.userId}`}>
                  {application.username}
                </a>{" "}
                <button onClick={() => handleApproveReject(application.applicationId, 1)}>
                  Accept
                </button>{" "}
                <button onClick={() => handleApproveReject(application.applicationId, -1)}>
                  Reject
                </button>
              </p>
            </li>
          ))}
        </ul>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default PendingApplicationsPopup;
