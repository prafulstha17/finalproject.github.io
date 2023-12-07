import React from "react";

function PendingApplicationsPopup({
  pendingApplications,
  isAdmin,
  handleApproveReject,
  setShowPendingApplications,
}) {
  return (
    <div className="pending-applications-popup">
      <h2>Applications</h2>
      <ul>
        {pendingApplications.map((application) => (
          <li key={application.userId}>
            <p>
              <a href={`/profile/${application.userId}`}>
                {application.username}
              </a>{" "}
              applied on{" "}
              {application.appliedAt.toDate().toLocaleDateString()} -{" "}
              {application.approved === 1
                ? "Approved"
                : application.approved === -1
                ? "Rejected"
                : "Pending"}
            </p>
            {isAdmin && application.approved === 0 && (
              <div>
                <button
                  onClick={() =>
                    handleApproveReject(application.applicationId, 1)
                  }
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleApproveReject(application.applicationId, -1)
                  }
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        className="close-btn"
        onClick={() => setShowPendingApplications(false)}
      >
        Close
      </button>
    </div>
  );
}

export default PendingApplicationsPopup;
