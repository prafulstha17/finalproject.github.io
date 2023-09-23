import { db, auth } from '../../config/firebase'; // Import auth from Firebase for user information
import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function PostStatus() {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Use Firebase auth to get the current user's information
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  const handlePostSubmit = async () => {
    if (status.trim() === '' || !currentUser) {
      return;
    }

    // Add the status post to Firestore
    const postsRef = collection(db, 'posts');
    await addDoc(postsRef, {
      title: status,
      description:description,

      timestamp: serverTimestamp(),
      userId: currentUser.uid,
      username: currentUser.displayName, // Include the user's display name
    });

    // Clear the input field
    setStatus('');
    setDescription('');
  };

  return (
    <div className="post-status-container">
        <h3>Title:</h3>
      <textarea
        rows="3"
        placeholder="What's on your mind?"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      ></textarea>
     <h3>Description:</h3>
      <textarea
        rows="3"
        placeholder="description?"
        value={description}
        onChange={(f) => setDescription(f.target.value)}
      ></textarea>
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
}

export default PostStatus;
