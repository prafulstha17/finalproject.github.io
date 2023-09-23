import { db, auth } from '../../config/firebase'; // Import auth from Firebase for user information
import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function PostStatus() {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [deadline, setDeadline] = useState('');
  const [timing, setTiming] = useState('');
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
      address:address,
      salary:salary,
      deadline:deadline,
      timing:timing,
    
      timestamp: serverTimestamp(),
      userId: currentUser.uid,
      username: currentUser.displayName, // Include the user's display name
    });

    // Clear the input field
    setStatus('');
    setDescription('');
    setAddress('');
    setDeadline('');
    setTiming('');
    setSalary('');
  };

  return (
    <div className="post-status-container">
        <h3>Title:</h3>
        <input type="text" name="title" id="title" rows="3"
        placeholder="What's on your mind?"
        value={status}
        onChange={(e) => setStatus(e.target.value)} /><br/>
      

      <input type="text" placeholder="address" name="address" id="address" value={address}
        onChange={(e) => setAddress(e.target.value)}/><br/>

<input type="text" placeholder="deadline" name="deadline" id="deadline" value={deadline}
        onChange={(e) => setDeadline(e.target.value)}/><br/>

<input type="text" placeholder="timing" name="timing" id="timing" value={timing}
        onChange={(e) => setTiming(e.target.value)}/><br/>

<input type="text" placeholder="salary" name="salary" id="salary"  value={salary}
        onChange={(e) => setSalary(e.target.value)}/><br/>


    <input type="text" name="title" id="title" rows="3"
        placeholder="description?"
        value={description}
        onChange={(f) => setDescription(f.target.value)} /><br/>

      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
}

export default PostStatus;
