import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../../config/firebase";
import "../JobInfo/PostStatus.css";

const PersonalDataForm = () => {
  const [formData, setFormData] = useState({
    phoneNo: "",
    address: "",
    education: "",
    experience: "",
    fieldOfExpertise: "",
    aboutYou: "",
    languages: "",
    gitHub: "",
    skills: "",
  });

  const [file, setFile] = useState(null); // State to hold the selected file
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleLabelClick = (inputId) => {
    const inputElement = document.getElementById(inputId);
    inputElement.focus();
  };

  const handlePostSubmit = async () => {
    console.log("handlePostSubmit called");
    try {
      if (formData.firstName.trim() === "" || !currentUser) {
        console.log("Validation failed");
        return;
      }

      const postsRef = collection(db, "portfolio");
      await addDoc(postsRef, {
        experience: formData.experience,
        address: formData.address,
        gitHub: formData.gitHub,
        skills: formData.skills,
        aboutYou: formData.aboutYou,
        phoneNo: formData.phoneNo,
        timestamp: serverTimestamp(),
        userId: currentUser.uid,
        username: currentUser.displayName,
      });

      console.log("Data added to Firestore");

      // Upload the file to Firebase Storage and store its URL in Firestore
      if (file) {
        const storageRef = ref(storage, `user-files/${currentUser.uid}/cv.pdf`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Update the document with the file URL
        const docRef = await addDoc(postsRef, {
          fileURL: downloadURL,
        });
      }

      // Clear the form fields and selected file
      setFormData({
        phoneNo: "",
        address: "",
        experience: "",
        aboutYou: "",
        gitHub: "",
        skills: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Error posting to Firestore:", error);
    }
  };

  return (
    <div className="post-status-container">
      <h3>Enter your Personal Details :</h3>
      <div className="post-area">

        {/* phoneNo */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleInputChange}
          />
          <label
            htmlFor="phoneNo"
            className={formData.phoneNo ? "active" : ""}
            onClick={() => handleLabelClick("phoneNo")}
          >
            Phone No.
          </label>
        </div>

        {/* experience */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
          />
          <label
            htmlFor="experience"
            className={formData.experience ? "active" : ""}
            onClick={() => handleLabelClick("experience")}
          >
            Experience Level
          </label>
        </div>

        {/* address */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <label
            htmlFor="address"
            className={formData.address ? "active" : ""}
            onClick={() => handleLabelClick("address")}
          >
            Address
          </label>
        </div>

        {/* aboutYou */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="aboutYou"
            name="aboutYou"
            value={formData.aboutYou}
            onChange={handleInputChange}
          />
          <label
            htmlFor="aboutYou"
            className={formData.aboutYou ? "active" : ""}
            onClick={() => handleLabelClick("aboutYou")}
          >
            Describe Yourself
          </label>
        </div>

        {/* gitHub */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="gitHub"
            name="gitHub"
            value={formData.gitHub}
            onChange={handleInputChange}
          />
          <label
            htmlFor="gitHub"
            className={formData.gitHub ? "active" : ""}
            onClick={() => handleLabelClick("gitHub")}
          >
            GitHub Account
          </label>
        </div>

        {/* skills */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
          />
          <label
            htmlFor="skills"
            className={formData.skills ? "active" : ""}
            onClick={() => handleLabelClick("skills")}
          >
            Skills
          </label>
        </div>

        {/* import file */}
        <div className="input-group">
        <input type="file" name="file" id="file" onChange={handleFileSelect} />
        <label
            htmlFor="cv"
            className={formData.file ? "active" : ""}
            onClick={() => handleLabelClick("skills")}
          >
            Curriculum Vitae 
          </label>
        </div>
        
      </div>

      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
};

export default PersonalDataForm;
