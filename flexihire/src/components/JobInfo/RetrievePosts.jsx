// RetrievePosts.js
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { listenToAuthChanges } from "./AuthContext";
import "./RetrievePosts.css";
import ApplyButton from "./ApplyButton";

function RetrievePosts({ isAdmin }) {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState("available");

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

  const handleApplyPost = (
    postId,
    postUploaderUserId,
    postUploaderUsername
  ) => {
    console.log(
      `Applying post with ID: ${postId}. Notifying ${postUploaderUsername}.`
    );
  };

  const handleReportPost = (postId) => {
    console.log("Reporting post with ID:", postId);
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
                          href={`/profile/${post.userId}`}
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
                className={`section-title ${
                  selectedSection === "available" && "active"
                }`}
                onClick={() => setSelectedSection("available")}
              >
                Available Jobs
              </h6>
              <h6
                className={`section-title ${
                  selectedSection === "created" && "active"
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
                    {/* Render job post for available section */}
                    <div className="job-header">
                      <div className="title">{post.title}</div>
                      <div className="postDetails">
                        <p>
                          <a
                            href={`/profile/${post.userId}`}
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
                      {(currentUser && currentUser.uid === post.userId) ||
                      isAdmin ? (
                        <button onClick={() => handleDeletePost(post.id)}>
                          Remove Job Opening
                        </button>
                      ) : (
                        <div className="handleButton">
                          <ApplyButton
                            postId={post.id}
                            recipientUserId={post.userId}
                            currentUserId={currentUser.uid}
                            applicationMessage="Your application message here"
                          />

                          <button
                            className="report"
                            onClick={() => handleReportPost(post.id)}
                          >
                            Report
                          </button>
                        </div>
                      )}
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
                    {/* Render job post for created section */}
                    <div className="job-header">
                      <div className="title">{post.title}</div>
                      <div className="postDetails">
                        <p>
                          <a
                            href={`/profile/${post.userId}`}
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
                      {(currentUser && currentUser.uid === post.userId) ||
                      isAdmin ? (
                        <button onClick={() => handleDeletePost(post.id)}>
                          Remove Job Opening
                        </button>
                      ) : (
                        <div className="handleButton">
                          <ApplyButton
                            postId={post.id}
                            recipientUserId={post.userId}
                            currentUserId={currentUser.uid}
                            applicationMessage="Your application message here"
                          />

                          <button
                            className="report"
                            onClick={() => handleReportPost(post.id)}
                          >
                            Report
                          </button>
                        </div>
                      )}
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
    </div>
  );
}

export default RetrievePosts;
