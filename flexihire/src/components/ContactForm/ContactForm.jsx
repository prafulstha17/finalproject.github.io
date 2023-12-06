import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import "./ContactForm.css";

function ContactForm() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    console.log('ContactForm component is being rendered.');
  }, []);

  const [userData, setUserData] = useState({
    Name: "",
    email: "",
    message: "",
  });

  const postUserData = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { Name, email, message } = userData;
  
    if (Name && email && message) {
      try {
        const res = await fetch(
          `https://flexihire-8f227-default-rtdb.firebaseio.com/ContactFormData.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Name,
              email,
              message,
            }),
          }
        );
  
        if (res.ok) {
          setUserData({
            Name: "",
            email: "",
            message: "",
          });
  
          // Reload the page to /mailReceived
          window.location.href = '/mailReceived';
        } else {
          console.error("Failed to submit data.");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
  };
  

  return (
    <>
      <div className="contactUS">
        <div className="container">
          <div className="front side">
            <div className="content">
              <h1>Instruction</h1>
              <p>
                If you have any doubts or suggestions, please feel free to write
                to us. Just hover or click <italic>(for smaller devices)</italic> over this box to get started.
              </p>
            </div>
          </div>
          <div className="back side">
            <div className="content">
              <h1>Contact Us</h1>
              <form onSubmit={submitData}>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="Name"
                  value={userData.Name}
                  onChange={postUserData}
                />
                <input
                  type="text"
                  placeholder="Your Email"
                  name="email"
                  value={userData.email}
                  onChange={postUserData}
                />
                <textarea
                  placeholder="Your Message"
                  name="message"
                  value={userData.message}
                  onChange={postUserData}
                ></textarea>
                <input type="submit" value="Send" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
