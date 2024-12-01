import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

function Reports() {
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Users");
  const [selectedSection, setSelectedSection] = useState("users");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    if (!timestamp) return "Invalid Date";
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString(); // Firestore Timestamp
    }
    const date = new Date(timestamp);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  const revokeAccount = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        disabled: true,
        disabledTime: serverTimestamp(),
      });
      console.log("User account disabled successfully");
    } catch (error) {
      console.error("Error disabling user account:", error);
    }
  };

  const enableAccount = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        disabled: false,
        enabledTime: serverTimestamp(),
      });
      console.log("User account enabled successfully");
    } catch (error) {
      console.error("Error enabling user account:", error);
    }
  };

  const confirmAction = (action, userId) => {
    const actionText = action === "enable" ? "Enable" : "Revoke";
    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} the account?`
    );

    if (confirmed) {
      if (action === "enable") enableAccount(userId);
      else revokeAccount(userId);
    }
  };

  useEffect(() => {
    const fetchReports = () => {
      const reportsCollectionRef = collection(db, "reports");
      const q = query(reportsCollectionRef, orderBy("timestamp", "desc"));

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const reportsList = [];
        for (const queryDocSnapshot of querySnapshot.docs) {
          const reportData = queryDocSnapshot.data();
          let referenceData = null;

          if (reportData.user && selectedCategory === "Users") {
            const userDoc = await getDoc(doc(db, "users", reportData.user));
            referenceData = userDoc.data();
          } else if (reportData.post && selectedCategory === "Posts") {
            const postDoc = await getDoc(doc(db, "posts", reportData.post));
            referenceData = postDoc.data();
          }

          if (referenceData) {
            reportsList.push({
              ...reportData,
              id: queryDocSnapshot.id,
              referenceData,
            });
          }
        }
        setFilteredReports(reportsList);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    };

    fetchReports();
  }, [selectedCategory]);

  const handleCategoryChange = (category, section) => {
    setSelectedCategory(category);
    setSelectedSection(section);
  };

  const handleUserClick = (userData) => {
    setSelectedUser(userData);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setIsPopupOpen(false);
  };
  const UserDetailPopup = ({ user, onClose }) => {
    if (!user) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <strong>Username:</strong> {user.displayName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Account Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  user.disabled ? "text-red-600" : "text-green-600"
                }`}
              >
                {user.disabled ? "Disabled" : "Active"}
              </span>
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button
          className={`py-2 px-4 rounded ${
            selectedSection === "users" ? "btn btn-outline-primary" : "bg-gray-200"
          }`}
          onClick={() => handleCategoryChange("Users", "users")}
        >
          Users
        </button>
        <button
          className={`py-2 px-4 rounded ${
            selectedSection === "posts" ? "btn btn-outline-primary" : "bg-gray-200"
          }`}
          onClick={() => handleCategoryChange("Posts", "posts")}
        >
          Posts
        </button>
      </div>

      <ul className="space-y-4">
        {filteredReports.map((report) => (
          <li
            key={report.id}
            className="bg-gray-100 p-4 rounded shadow-md border"
          >
            <p>
              <strong>ID:</strong> {report.id}
            </p>
            {report.referenceData && (
              <div>
                <p>
                  <strong>{report.user ? "Username: " : "Post Title: "}</strong>
                  {report.user
                    ? report.referenceData.displayName
                    : report.referenceData.title}
                </p>
                <p>
                  <strong>
                    {report.user ? "User Email: " : "Post Description: "}
                  </strong>
                  {report.user
                    ? report.referenceData.email
                    : report.referenceData.description}
                </p>
                <p>
                  <strong>Reason:</strong> {report.reason}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(report.timestamp)}
                </p>
                <div className="flex gap-4 mt-4">
                  {report.user && (
                    <button
                      onClick={() => handleUserClick(report.referenceData)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View User
                    </button>
                  )}
                  <button
                    onClick={() =>
                      confirmAction(
                        report.referenceData.disabled ? "enable" : "revoke",
                        report.user
                      )
                    }
                    className={`px-4 py-2 rounded text-white ${
                      report.referenceData.disabled
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {report.referenceData.disabled
                      ? "Enable Account"
                      : "Revoke Account"}
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {isPopupOpen && (
        <UserDetailPopup user={selectedUser} onClose={closePopup} />
      )}
    </div>
  );
}

export default Reports;
