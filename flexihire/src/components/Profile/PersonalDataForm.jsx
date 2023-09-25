import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../../config/firebase";
import "../JobInfo/PostStatus.css";

const PersonalDataForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNo: "",
    email: "",
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
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        experience: formData.experience,
        address: formData.address,
        education: formData.education,
        fieldOfExpertise: formData.fieldOfExpertise,
        languages: formData.languages,
        gitHub: formData.gitHub,
        skills: formData.skills,
        aboutYou: formData.aboutYou,
        phoneNo: formData.phoneNo,
        email: formData.email,
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
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNo: "",
        email: "",
        address: "",
        education: "",
        experience: "",
        fieldOfExpertise: "",
        aboutYou: "",
        languages: "",
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
        {/* firstName */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <label
            htmlFor="firstName"
            className={formData.firstName ? "active" : ""}
            onClick={() => handleLabelClick("firstName")}
          >
            firstName :
          </label>
        </div>

        {/* middleName */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
          />
          <label
            htmlFor="middleName"
            className={formData.middleName ? "active" : ""}
            onClick={() => handleLabelClick("middleName")}
          >
            middleName :
          </label>
        </div>

        {/* lastName */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <label
            htmlFor="lastName"
            className={formData.lastName ? "active" : ""}
            onClick={() => handleLabelClick("lastName")}
          >
            lastName :
          </label>
        </div>

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
            phoneNo :
          </label>
        </div>

        {/* email */}
        <div className="input-group">
          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label
            htmlFor="email"
            className={formData.email ? "active" : ""}
            onClick={() => handleLabelClick("email")}
          >
            email :
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
            address
          </label>
        </div>

        {/* education */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
          />
          <label
            htmlFor="education"
            className={formData.education ? "active" : ""}
            onClick={() => handleLabelClick("education")}
          >
            education
          </label>
        </div>

        {/* fieldOfExpertise */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="fieldOfExpertise"
            name="fieldOfExpertise"
            value={formData.fieldOfExpertise}
            onChange={handleInputChange}
          />
          <label
            htmlFor="fieldOfExpertise"
            className={formData.fieldOfExpertise ? "active" : ""}
            onClick={() => handleLabelClick("fieldOfExpertise")}
          >
            fieldOfExpertise
          </label>
        </div>

        {/* languages */}
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
          />
          <label
            htmlFor="languages"
            className={formData.languages ? "active" : ""}
            onClick={() => handleLabelClick("languages")}
          >
            languages
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
            aboutYou
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
            gitHub
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
            skills
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
