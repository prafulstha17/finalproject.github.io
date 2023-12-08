import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../config/firebase";
import { listenToAuthChanges } from "../../config/AuthContext";
import PendingApplicationsPopup from "./PendingApplicationsPopup";
import "./RetrievePosts.css";
import ApplyButton from "./ApplyButton";

function RetrievePosts({ isAdmin }) {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState("available");
  const [pendingApplications, setPendingApplications] = useState([]);
  const [showPendingApplications, setShowPendingApplications] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = listenToAuthChanges((user) => {
      setCurrentUser(user);
    });

    const fetchPosts = () => {
      if (currentUser) {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("timestamp", "desc"));

        onSnapshot(q, (querySnapshot) => {
          const postList = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const validPosts = postList.filter((post) => post && post.title);

          setPosts(validPosts);
        });
      }
    };

    fetchPosts();

    return () => {
      unsubscribeAuth();
    };
  }, [currentUser]);

  const formatDate = (timestamp) => {
    if (timestamp) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(timestamp.toDate()).toLocaleDateString(
        undefined,
        options
      );
    }
    return "";
  };

  const handleDeletePost = async (postId) => {
    try {
      const postDocRef = doc(db, "posts", postId);
      await deleteDoc(postDocRef);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleApplyPost = (postId, postUploaderUserId, postUploaderUsername) => {
    console.log(
      `Applying post with ID: ${postId}. Notifying ${postUploaderUsername}.`
    );
    // Add your logic for handling applications here
  };

  const handleReportPost = async (postId) => {
    try {
      if (currentUser) {
        // Prompt the user to enter a reason for reporting
        const reportReason = prompt('Please enter the reason for reporting this post:');

        if (reportReason !== null) {
          // Use the 'reports' collection reference to automatically generate a reportId
          const reportsCollectionRef = collection(db, 'reports');

          // Get the current timestamp
          const timestamp = serverTimestamp();

          // Add a new document to the 'reports' collection with the postId, reason, and timestamp
          await addDoc(reportsCollectionRef, {
            post: postId,
            reason: reportReason,
            timestamp: timestamp,
          });

          console.log('Post reported successfully with reason:', reportReason);
        } else {
          console.log('Post report canceled.');
        }
      } else {
        console.error('User details not available.');
      }
    } catch (error) {
      console.error('Error reporting post:', error);
    }
  };


  const handleApplication = (postId, postUploaderUserId, postUploaderUsername) => {
    console.log(`Handling application for post with ID: ${postId}. Notifying ${postUploaderUsername}.`);
    // Add your logic for handling applications here
  };

  const handleApplicationButton = async (postId, postUploaderUserId, postUploaderUsername) => {
    console.log(`Handling application for post with ID: ${postId}. Notifying ${postUploaderUsername}.`);

    try {
      const applicationsRef = collection(db, "applications");
      const q = query(applicationsRef, where("postId", "==", postId));
      const querySnapshot = await getDocs(q);
      const pendingApplicationsData = querySnapshot.docs
        .filter((doc) => doc.exists())
        .map((doc) => {
          const applicationData = doc.data();

          return {
            ...applicationData,
            username: applicationData.username,
          };
        });

      setPendingApplications(pendingApplicationsData);
      setSelectedPostId(postId);  // Set the selected post ID
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error handling application:", error);
    }
  };

  const handleApproveReject = async (applicationId, status) => {
    try {
      const applicationDocRef = doc(db, "applications", applicationId);
      await updateDoc(applicationDocRef, { approved: status });

      // Update the state to reflect the change
      setPendingApplications((prevApplications) => {
        const updatedApplications = prevApplications.map((app) =>
          app.applicationId === applicationId
            ? { ...app, approved: status }
            : app
        );

        return updatedApplications;
      });
    } catch (error) {
      console.error("Error approving/rejecting application:", error);
    }
  };

  const availablePosts = posts.filter(
    (post) => (!post.userId || post.userId !== currentUser?.uid) && !isAdmin
  );

  const createdPosts = posts.filter(
    (post) => post.userId === currentUser?.uid && !isAdmin
  );

  return (
    <div className="retrieve-posts-container">
      {currentUser ? (
        <>
          {isAdmin && (
            <ul>
              {posts.map((post) => (
                <li key={post.id} className="job-post">
                  {/* Render job post for admin */}
                  <div className="job-header">
                    <div className="title">{post.title}</div>
                    <div className="postDetails">
                      <p>
                        <a
                          href={`/users/${post.userId}`}
                          className="username-link"
                        >
                          {post.username}
                        </a>{" "}
                        posted on {formatDate(post.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="job-description">
                    {post.description && <>{post.description}</>}
                  </div>
                  <div className="job-details">
                    <div className="exp">Experience: {post.experience}</div>
                    <div className="deadline">Deadline: {post.deadline}</div>
                    <div className="workinghrs">Est. time: {post.timing}</div>
                    <div className="salary">Salary: {post.salary}</div>
                  </div>
                  <div className="job-actions">
                    <button onClick={() => handleDeletePost(post.id)}>
                      Remove Job Opening
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!isAdmin && (
            <div className="section-wrapper">
              <h6
                className={`section-title ${selectedSection === "available" && "active"
                  }`}
                onClick={() => setSelectedSection("available")}
              >
                Available Jobs
              </h6>
              <h6
                className={`section-title ${selectedSection === "created" && "active"
                  }`}
                onClick={() => setSelectedSection("created")}
              >
                Your Created Jobs
              </h6>
            </div>
          )}
          {selectedSection === "available" && (
            <div className="available-posts">
              <ul>
                {availablePosts.map((post) => (
                  <li key={post.id} className="job-post">
                    <div className="job-header">
                      <div className="title">{post.title}</div>
                      <div className="postDetails">
                        <p>
                          <a
                            href={`/users/${post.userId}`}
                            className="username-link"
                          >
                            {post.username}
                          </a>{" "}
                          posted on {formatDate(post.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="job-description">
                      {post.description && (
                        <>
                          <pre>{post.description}</pre>
                        </>
                      )}
                    </div>
                    <div className="job-details">
                      <div className="exp">Experience: {post.experience}</div>
                      <div className="deadline">Deadline: {post.deadline}</div>
                      <div className="workinghrs">Est. time: {post.timing}</div>
                      <div className="salary">Salary: {post.salary}</div>
                    </div>
                    <div className="job-actions">
                      <div className="handleButton">
                        <ApplyButton
                          postId={post.id}
                          recipientUserId={post.userId}
                          currentUserId={currentUser.uid}
                          applicationMessage="Your application message here"
                          handleApplication={() => handleApplyPost(post.id, post.userId, post.username)}
                        />
                        <button
                          className="report"
                          onClick={() => handleReportPost(post.id)}
                        >
                          Report
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedSection === "created" && (
            <div className="created-posts">
              <ul>
                {createdPosts.map((post) => (
                  <li key={post.id} className="job-post">
                    <div className="job-header">
                      <div className="title">{post.title}</div>
                      <div className="postDetails">
                        <p>
                          <a
                            href={`/users/${post.userId}`}
                            className="username-link"
                          >
                            {post.username}
                          </a>{" "}
                          posted on {formatDate(post.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="job-description">
                      {post.description && (
                        <>
                          <pre>{post.description}</pre>
                        </>
                      )}
                    </div>
                    <div className="job-details">
                      <div className="exp">Experience: {post.experience}</div>
                      <div className="deadline">Deadline: {post.deadline}</div>
                      <div className="workinghrs">Est. time: {post.timing}</div>
                      <div className="salary">Salary: {post.salary}</div>
                    </div>
                    <div className="job-actions">
                      <div className="handleButton">
                        <button onClick={() => handleApplicationButton(post.id, post.userId, post.username)}>
                          Show Pending Applications
                        </button>
                        <button onClick={() => handleDeletePost(post.id)}>
                          Remove Job Opening
                        </button>
                        {isModalOpen && selectedPostId === post.id && (
                          <div>
                            <ul>
                              {pendingApplications.map((application) => (
                                <li key={application.userId}>
                                  <p>
                                    <a
                                      href={`/users/${application.userId}`}
                                    >
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
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <center>
          <div className="login-signup-message">
            <p>
              Please join to be a <a href="/member">member</a> to start surfing
              the available jobs.
            </p>
          </div>
        </center>
      )}

      {isModalOpen && (
        <div className="pending-applications-popup-container">
          <PendingApplicationsPopup
            pendingApplications={pendingApplications}
            isAdmin={isAdmin}
            handleApproveReject={handleApproveReject}
            setShowPendingApplications={setShowPendingApplications}
          />
        </div>
      )}

    </div>
  );
}

export default RetrievePosts;
