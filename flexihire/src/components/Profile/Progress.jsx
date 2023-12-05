import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import './Progress.css';

function Progress({ currentUserId }) {
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationsCollection = collection(db, "applications");
        const q = query(applicationsCollection, where("userId", "==", currentUserId));
        const querySnapshot = await getDocs(q);

        // Count the number of applications with different approval statuses
        let rejected = 0;
        let pending = 0;
        let approved = 0;

        querySnapshot.forEach((doc) => {
          const { approved: approvalStatus } = doc.data();

          if (approvalStatus === -1) {
            rejected++;
          } else if (approvalStatus === 0) {
            pending++;
          } else if (approvalStatus === 1) {
            approved++;
          }
        });

        // Update state with the counts
        setRejectedCount(rejected);
        setPendingCount(pending);
        setApprovedCount(approved);
      } catch (error) {
        console.error("Error fetching application data:", error);
      }
    };

    fetchData();
  }, [currentUserId]);

  return (
    <div>
      <h1>Progress</h1>
      <div className="progress-container">
        <div className="progress-circle">
          <div className="outer-circle-rejected">
            <div className="inner-circle">{rejectedCount}</div>
          </div>
          <div className="label">Application Rejected</div>
        </div>
        <div className="progress-circle">
          <div className="outer-circle-pending">
            <div className="inner-circle">{pendingCount}</div>
          </div>
          <div className="label">Application Pending</div>
        </div>
        <div className="progress-circle">
          <div className="outer-circle-accepted">
            <div className="inner-circle">{approvedCount}</div>
          </div>
          <div className="label">Application Approved</div>
        </div>
      </div>
    </div>
  );
}

export default Progress;