import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import "./Message.css";

function Message() {
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [profileImages, setProfileImages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.data().userId,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchProfileImages() {
      const imagePromises = users.map(async (user) => {
        const profileImageRef = ref(storage, `users/${user.userId}/profile.jpg`);
        try {
          const profileImageUrl = await getDownloadURL(profileImageRef);
          return { userId: user.userId, imageUrl: profileImageUrl };
        } catch (error) {
          console.log(`Profile image not found for user ${user.userId}.`);
          return { userId: user.userId, imageUrl: null };
        }
      });
  
      // Wait for all promises to resolve
      const images = await Promise.all(imagePromises);
  
      // Set profile images for all users
      const profileImagesMap = images.reduce((acc, { userId, imageUrl }) => {
        acc[userId] = imageUrl;
        return acc;
      }, {});
  
      setProfileImages(profileImagesMap);
    }
  
    // Introduce a 3-second delay before setting loading to false
    const delayTimeout = setTimeout(() => {
      setLoading(false); // Set loading to false once images are loaded
    }, 3000);
  
    // Fetch profile images
    fetchProfileImages();
  
    // Clear the delay timeout on component unmount
    return () => clearTimeout(delayTimeout);
  }, [users]);
  


  useEffect(() => {
    if (selectedUser) {
      const q = query(
        collection(db, "messages"),
        orderBy("timestamp"),
        where("users", "array-contains", user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs
          .map((doc) => doc.data())
          .filter((message) => message.users.includes(selectedUser.uid));
        setMessages(messagesData);
      });

      return unsubscribe;
    }
  }, [selectedUser, user]);


  function handleClick() {
    if (isExpanded) {
      // If the chat box is expanded, reset selectedUser and collapse the chat box
      setSelectedUser(null);
      setIsExpanded(false);
    } else {
      // If the chat box is collapsed, expand the user list
      setIsExpanded(true);
    }
  }

  function handleUserSelect(userId) {
    // Find the selected user based on the userId
    const selectedUser = users.find(user => user.userId === userId);
    setSelectedUser(selectedUser);
    setIsExpanded(true);
  }
  async function handleSubmit(event) {
    event.preventDefault();

    if (messageText.trim() !== "" && selectedUser) {
      try {
        // Save the message in the Firestore collection
        const messagesRef = collection(db, "messages");
        await addDoc(messagesRef, {
          text: messageText,
          users: [user.uid, selectedUser.uid],
          timestamp: serverTimestamp(),
        });

        setMessageText("");
      } catch (error) {
        console.error("Error submitting message:", error.message);
      }
    }
  }
  // Render JSX based on user authentication state
  return (
    <>
      {user ? (
        <div id="body">
          <div
            id="chat-circle"
            className={`btn sticky-bottom ${isExpanded ? "hidden" : ""}`}
            onClick={handleClick}
          >
            <div id="chat-overlay"></div>
            <i
              className="fa-solid fa-comment fa-flip-horizontal fa-2xl fa-camera"
              id="my-btn"
            ></i>
          </div>

          <div className={`chat-box ${isExpanded ? "expanded" : ""}`}>
            <div className="chat-box-header">
              {selectedUser ? (
                <>
                  <i
                    class="fa-solid fa-circle-arrow-left"
                    onClick={() => setSelectedUser(null)}
                  ></i>
                  {selectedUser.displayName}
                </>
              ) : (
                "FlexiTalk"
              )}
              <span className="chat-box-toggle" onClick={handleClick}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
            {isExpanded && selectedUser ? (
              <div className="chat-box-body">
                <div className="chat-logs">
                  {messages.map((message, index) => (
                    <div key={index} className={`chat ${message.userId === user.uid ? 'self' : 'other'}`}>
                      {message.text}
                    </div>
                  ))}
                </div>
                <div className="chat-form">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Send a message..."
                    className="chat-input"
                  />
                  <button
                    type="submit"
                    className="chat-submit"
                    onClick={handleSubmit}
                  >
                    <i className="material-icons">send</i>
                  </button>
                </div>
              </div>
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <div className="user-list">
                <h2>All Users</h2>
                <ul>
                  {users.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => handleUserSelect(user.userId)}
                    >
                      <div className="user-item">
                        <img
                          src={profileImages[user.userId]}
                          className="profile-pic-chat"
                        />
                        <span>{user.displayName}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Message;