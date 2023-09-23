import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { listenToAuthChanges } from './AuthContext';

function RetrievePosts() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = listenToAuthChanges((user) => {
      setCurrentUser(user);
    });

    const fetchPosts = () => {
      if (currentUser) {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('timestamp', 'desc'));

        // Use onSnapshot to listen for real-time updates
        onSnapshot(q, (querySnapshot) => {
          const postList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

          // Filter out posts that do not have a "text" property
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
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(timestamp.toDate()).toLocaleDateString(undefined, options);
    }
    return ''; // Return an empty string if timestamp is null
  };

  const handleDeletePost = async (postId) => {
    try {
      // Delete the post from Firestore
      const postDocRef = doc(db, 'posts', postId);
      await deleteDoc(postDocRef);

      // Remove the deleted post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleReportPost = (postId) => {
    // Implement reporting logic here
    console.log('Reporting post with ID:', postId);
  };

  return (
    <div className="retrieve-posts-container">

      <div className="user-info">
        {currentUser ? (
          <h2>{currentUser.displayName}</h2>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
      <h3>Posts</h3>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <p>
              {post.username} posted on {formatDate(post.timestamp)}:
              {post.title}
            </p>
            <h3>description</h3>
            <p>{post.description}</p>
            {currentUser && currentUser.uid === post.userId ? (
              <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
            ) : (
              <button onClick={() => handleReportPost(post.id)}>Report Post</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RetrievePosts;
