import React, { useState, useEffect } from "react";
import { ref, onValue, off, push } from "firebase/database";
import { database } from "../../config/firebase";
function DisplayData() {
  const [contactData, setContactData] = useState([]);
  const [listener, setListener] = useState(null);

  useEffect(() => {
    const contactDataRef = ref(database, "ContactFormData");
    const post= push(contactDataRef);
    console.log("Data from Firebase:", post);
    const onDataChange = (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const dataArray = Object.values(data);
        //setContactData(dataArray);
      }
    };

    const unsubscribe = onValue(contactDataRef, onDataChange);

    setListener(unsubscribe);

    return () => {
      if (listener) {
        off(listener);
      }
    };
  }, [listener]);

  return (
    <div>
      <h1>Contact Form Data</h1>
      <ul>
        {Array.isArray(contactData) && contactData.map((item, index) => (
          <li key={index}>
            <p>
              <strong>Name:</strong> {item.Name}
            </p>

            <p>
              <strong>Email:</strong> {item.email}
            </p>

            <p>
              <strong>Message:</strong> {item.message}
            </p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayData;