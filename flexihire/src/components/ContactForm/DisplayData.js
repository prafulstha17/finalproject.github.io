import React, { useState, useEffect } from "react";
import "./ContactForm";
import firebase from 'firebase/app';
import 'firebase/database';

//display contectdata
function DisplayData() {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {

    // Reference the Firebase Realtime Database
    const database = firebase.database();
    const contactDataRef = database.ref("ContactFormData");

    // Attach an event listener to retrieve the data
    contactDataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data to an array if it's an object
        const dataArray = Object.values(data);
        setContactData(dataArray);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      contactDataRef.off("value");
    };
  }, []);

  return (
    <div>
      <h1>Contact Form Data</h1>
      <ul>
        {contactData.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.Name}
            <br />
            <strong>Email:</strong> {item.email}
            <br />
            <strong>Message:</strong> {item.message}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayData;
