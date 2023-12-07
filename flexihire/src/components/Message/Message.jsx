import React, { useState, useEffect, useRef } from "react";
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
  const chatLogsRef = useRef(null);

  useEffect(() => {
    if (chatLogsRef.current) {
      // Scroll to the bottom
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages]);

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

        // Filter out the current user from the list
        const filteredUsers = usersData.filter(u => u.userId !== user.uid);

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }

    fetchUsers();
  }, [user]);

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

    return () => clearTimeout(delayTimeout);
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      const q = query(
        collection(db, "messages"),
        where("users", "array-contains", user.uid),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs
          .map((doc) => doc.data())
          .filter((message) => message.users.includes(selectedUser.userId));

        setMessages(messagesData);

        // Scroll to the bottom of the chat box when new messages are received
        const chatLogs = document.getElementById("chat-logs");
        if (chatLogs) {
          chatLogs.scrollTop = chatLogs.scrollHeight;
        }

        // Log the fetched messages to the console
        console.log("Fetched messages:", messagesData);
      });

      return unsubscribe;
    }
  }, [selectedUser, user]);


  function handleClick() {
    if (isExpanded) {
      setSelectedUser(null);
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }

  function handleUserSelect(userId) {
    // Find the selected user based on the userId
    const selectedUser = users.find(user => user.userId === userId);

    if (selectedUser) {
      setSelectedUser(selectedUser);
      setIsExpanded(true);
      console.log("The selected user:", selectedUser);
      console.log("Selected user UID:", selectedUser.id);
    } else {
      console.error("Error: selectedUser is undefined for userId:", userId);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (messageText.trim() !== "" && selectedUser && selectedUser.id) {
      try {
        const messagesRef = collection(db, "messages");

        // Add additional check for selectedUser.id
        if (selectedUser.id) {
          await addDoc(messagesRef, {
            senderId: user.uid,
            text: messageText,
            users: [user.uid, selectedUser.id],
            timestamp: serverTimestamp(),
          });

          // Clear the messageText state after submitting
          setMessageText("");

          // Scroll the chat-logs container to the bottom
          const chatLogsContainer = document.getElementById('chat-logs');
          chatLogsContainer.scrollTop = chatLogsContainer.scrollHeight;
        } else {
          console.error("Error: selectedUser.id is undefined");
        }
      } catch (error) {
        console.error("Error submitting message:", error.message);
      }
    } else {
      console.error("Error: selectedUser or selectedUser.id is undefined");
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
                  <div className="userhead">
                    <i
                      class="fa-solid fa-circle-arrow-left"
                      onClick={() => setSelectedUser(null)}
                    ></i>
                    <div className="userHead-name">
                      <img
                        src={profileImages[selectedUser.userId]}
                        className="profile-pic-chat"
                      />
                      {selectedUser.displayName}
                    </div>
                  </div>
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
                <div className="chat-logs" ref={chatLogsRef}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`chat ${message.userId === user.uid ? 'self' : 'other'}`}
                    >
                      <div
                        className={`message-box ${message.senderId === user.uid ? 'sent' : 'received'
                          }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                </div>
                <div className="chat-form">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
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