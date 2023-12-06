// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import "./Message.css";

// Message component definition
function Message() {
  // State for user authentication and chat box
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Effect to set user state based on authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // Effect to fetch users from the database
  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    }

    fetchUsers();
  }, []);

  // Function to handle chat box expansion
  function handleClick() {
    setIsExpanded((prevExpanded) => !prevExpanded);
  }

  // Function to handle user selection
  function handleUserSelect(user) {
    setSelectedUser(user);
    setIsExpanded(true);
  }

  // Function to handle message submission
  async function handleSubmit(event) {
    event.preventDefault();

    if (messageText.trim() !== "") {
      try {
        // Display the sent message in the chat logs
        const chatLogs = document.querySelector(".chat-logs");
        const message = document.createElement("div");
        message.className = "chat self";
        message.innerHTML = messageText;
        chatLogs.appendChild(message);
        setMessageText("");

        // Save the message in the Firestore collection
        const messagesRef = collection(db, "messages");
        await addDoc(messagesRef, {
          text: messageText,
          userId: user.uid,
          timestamp: serverTimestamp(),
        });
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
              {selectedUser
                ? `Messages with ${selectedUser.displayName}`
                : "FlexiTalk"}
              <span className="chat-box-toggle" onClick={handleClick}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </div>
            {users.length > 0 ? (
              <div className="user-list">
                <h2>Available Users</h2>
                <ul>
                  {users.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                    >
                      {user.displayName}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="user-list">
                <p>No available users</p>
              </div>
            )}
            <div className="chat-box-body">
              {isExpanded && selectedUser && (
                <div className="chat-form">
                  <div className="chat-logs"></div>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Send a message..."
                  />
                  <button
                    type="submit"
                    className="chat-submit"
                    onClick={handleSubmit}
                  >
                    <i className="material-icons">send</i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Message;