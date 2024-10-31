import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import "./PostStatus.css";

const PostStatus = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experience: "",
    salary: "",
    deadline: "",
    timing: "",
    category: "", // Add category to formData
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
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

  const handleLabelClick = (inputId) => {
    const inputElement = document.getElementById(inputId);
    inputElement.focus();
  };

  const handlePostSubmit = async () => {
    console.log("handlePostSubmit called");
    try {
      if (formData.title.trim() === "" || !currentUser) {
        console.log("Validation failed");
        return;
      }

      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        title: formData.title,
        description: formData.description,
        experience: formData.experience,
        salary: formData.salary,
        deadline: formData.deadline,
        timing: formData.timing,
        category: formData.category, // Add category to Firestore data
        timestamp: serverTimestamp(),
        userId: currentUser.uid,
        username: currentUser.displayName,
      });

      console.log("Data added to Firestore");

      setFormData({
        title: "",
        description: "",
        experience: "",
        salary: "",
        deadline: "",
        timing: "",
        category: "",
      });
    } catch (error) {
      console.error("Error posting to Firestore:", error);
    }
  };

  return (
    <div className="post-status-container">
      <h3>About Your Job</h3>
      <div className="post-area">
        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <label
            htmlFor="title"
            className={formData.title ? "active" : ""}
            onClick={() => handleLabelClick("title")}
          >
            Job Title
          </label>
        </div>

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
            Qualifications
          </label>
        </div>

        <div className="input-group">
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            placeholder="Select a Deadline"
            min={new Date().toISOString().split('T')[0]}
          />
          <label
            htmlFor="deadline"
            className={formData.deadline ? "active" : ""}
            onClick={() => handleLabelClick("deadline")}
          >
            Deadline
          </label>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="timing"
            name="timing"
            value={formData.timing}
            onChange={handleInputChange}
          />
          <label
            htmlFor="timing"
            className={formData.timing ? "active" : ""}
            onClick={() => handleLabelClick("timing")}
          >
            Working Hours
          </label>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder=""
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
          <label
            htmlFor="salary"
            className={formData.salary ? "active" : ""}
            onClick={() => handleLabelClick("salary")}
          >
            Salary Per Hour
          </label>
        </div>

        <div className="input-group">
          <textarea
            placeholder=""
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label
            htmlFor="description"
            className={formData.description ? "active" : ""}
            onClick={() => handleLabelClick("description")}
          >
            Description
          </label>
        </div>

        <div className="input-group">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="Writing & Translation">Writing & Translation</option>
            <option value="Graphic Design & Creative Arts">Graphic Design & Creative Arts</option>
            <option value="Digital Marketing & Advertising">Digital Marketing & Advertising</option>
            <option value="Web, Mobile & Software Development">Web, Mobile & Software Development</option>
            <option value="IT & Networking">IT & Networking</option>
            <option value="Data Science & Analytics">Data Science & Analytics</option>
            <option value="Administrative Support">Administrative Support</option>
            <option value="Finance & Accounting">Finance & Accounting</option>
            <option value="Consulting & Project Management">Consulting & Project Management</option>
            <option value="Legal Services">Legal Services</option>
            <option value="Engineering & Architecture">Engineering & Architecture</option>
            <option value="Sales & Business Development">Sales & Business Development</option>
            <option value="Lifestyle & Wellness">Lifestyle & Wellness</option>
            <option value="Education & Tutoring">Education & Tutoring</option>
          </select>
          <label
            htmlFor="category"
            className={formData.category ? "active" : ""}
            onClick={() => handleLabelClick("category")}
          >
          </label>
        </div>
      </div>

      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
};

export default PostStatus;
