import React, { useState, useEffect } from "react";
import { auth, db } from "../../confg/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "firebase/app"; // Add this import
import "./Message.css";

function Message() {
  const [user, setUser] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  function handleClick() {
    const chatBox = document.querySelector(".chat-box");
    chatBox.classList.toggle("scale");
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
  }

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (messageText.trim() !== "") {
      const chatLogs = document.querySelector(".chat-logs");
      const message = document.createElement("div");
      message.className = "chat self";
      message.innerHTML = messageText;
      chatLogs.appendChild(message);
      setMessageText("");

      // Save the message to Firebase Firestore
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, {
        text: messageText,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
    }
  }

  return (
    <>
      {user ? (
        <div id="body">
          {!isExpanded && (
            <div
              id="chat-circle"
              className="btn sticky-bottom"
              onClick={handleClick}
            >
              <div id="chat-overlay"></div>
              <i
                className="fa-solid fa-comment fa-flip-horizontal fa-2xl fa-camera"
                id="my-btn"
              ></i>
            </div>
          )}

          {(isExpanded || !isExpanded) && (
            <div className={`chat-box ${isExpanded ? "expanded" : ""}`}>
              <div className="chat-box-header">
                FlexiTalk
                <span className="chat-box-toggle">
                  <i className="fa-solid fa-xmark" onClick={handleClick}></i>
                </span>
              </div>
              <div className="chat-box-body">
                <div className="chat-box-overlay"></div>
                <div className="chat-logs"></div>
              </div>
              {isExpanded && (
                <div className="chat-form">
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
          )}

          {!isExpanded && (
            <div className="expand-button" onClick={handleExpand}>
              Expand
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Message;
