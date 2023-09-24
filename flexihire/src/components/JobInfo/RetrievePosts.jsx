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
import "./RetrievePosts.css"; // Import your CSS file for styling

function RetrievePosts() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = listenToAuthChanges((user) => {
      setCurrentUser(user);
    });

    
    const fetchPosts = () => {
      if (currentUser) {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("timestamp", "desc"));

        // Use onSnapshot to listen for real-time updates
        onSnapshot(q, (querySnapshot) => {
          const postList = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          // Filter out posts that do not have a "title" property
          const validPosts = postList.filter((post) => post && post.title);

          setPosts(validPosts);
        });
      }
    };

    // Call fetchPosts whenever the currentUser state changes
    fetchPosts();

    return () => {
      unsubscribeAuth(); // Unsubscribe from authentication changes when the component unmounts
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
    return ""; // Return an empty string if timestamp is null
  };

  const handleDeletePost = async (postId) => {
    try {
      // Delete the post from Firestore
      const postDocRef = doc(db, "posts", postId);
      await deleteDoc(postDocRef);

      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleApplyPost = (postId) => {
    // Implement reporting logic here
    console.log("Applying post with ID:", postId);
  };

  const handleReportPost = (postId) => {
    // Implement reporting logic here
    console.log("Reporting post with ID:", postId);
  };

  return (
    <div className="retrieve-posts-container">
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="job-post">
            <div className="job-header">
              <div className="title">{post.title}</div>
              <div className="postDetails">
                <p>
                  {post.username} posted on {formatDate(post.timestamp)}
                </p>
              </div>
            </div>
            <div className="job-details">
              <div className="exp">Experience: {post.experience}</div>
              <div className="deadline">Deadline: {post.deadline}</div>
              <div className="workinghrs">Est. time: {post.timing}</div>
              <div className="salary">Salary: {post.salary}</div>
            </div>
            <div className="job-description">{post.description}</div>
            <div className="job-actions">
              {currentUser && currentUser.uid === post.userId ? (
                <button onClick={() => handleDeletePost(post.id)}>
                  Remove Job Opening
                </button>
              ) : (
                <div className="handleButton">
                <button className="apply" onClick={() => handleApplyPost(post.id)}>Apply</button>
                <button className="report" onClick={() => handleReportPost(post.id)}>Report</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RetrievePosts;
