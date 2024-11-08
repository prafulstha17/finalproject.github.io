import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import "./UserProfiles.css";

const UserProfiles = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (timestamp) => {
    if (timestamp instanceof Date) {
      // If timestamp is already a Date object, no conversion needed
      return timestamp.toLocaleString();
    } else if (timestamp && timestamp.toDate) {
      // If timestamp is a Firestore timestamp, convert it to a Date object
      return timestamp.toDate().toLocaleString();
    } else if (typeof timestamp === "number" && !isNaN(timestamp)) {
      // If timestamp is a number and not NaN, treat it as milliseconds since epoch
      return new Date(timestamp).toLocaleString();
    } else if (typeof timestamp === "string") {
      // If timestamp is a string, try to parse it
      const parsedDate = new Date(timestamp);

      if (!isNaN(parsedDate)) {
        return parsedDate.toLocaleString();
      }
    }

    return "Invalid Date";
  };

  useEffect(() => {
    const db = getFirestore();
    const usersCollection = collection(db, "users");

    const unsubscribe = onSnapshot(
      usersCollection,
      (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching users from Firestore:", error);
        setError("Error fetching users. Please try again later.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const revokeAccount = async (userId) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, "users");

      // Reference the user document by its ID
      const userDocRef = doc(usersCollection, userId);

      // Update the user document to disable the account
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
      const db = getFirestore();
      const usersCollection = collection(db, "users");

      // Reference the user document by its ID
      const userDocRef = doc(usersCollection, userId);

      // Update the user document to enable the account
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
      if (action === "enable") {
        enableAccount(userId);
      } else {
        revokeAccount(userId);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-profiles-container">
      <div class="flex flex-col">
      <h2 className="test-center">User Profiles</h2>
        <div class=" overflow-x-auto">
          <div class="min-w-full inline-block align-middle">
            <div class="relative  text-gray-500 focus-within:text-gray-900 mb-4">
             
            </div>
            <div class="overflow-hidden ">
              <table class=" min-w-full rounded-xl">
                <thead>
                  <tr class="bg-gray-50">
                    <th
                      scope="col"
                      class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                    >
                      {" "}
                      SN{" "}
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      User Name{" "}
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Email{" "}
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {" "}
                      Creation Date{" "}
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                    >
                      {" "}
                      Actions{" "}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-300 ">

                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        {user.displayName}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        {user.email}
                      </td>
                      <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                        {user.metadata
                          ? formatDate(user.metadata.creationTime)
                          : formatDate(user.appliedAt)}
                      </td>
                      <td>
                        {user.disabled ? (
                          <button
                            style={{
                              backgroundColor: "#66cc66",
                              color: "#fff",
                              cursor: "pointer",
                              padding: "5px 10px",
                              border: "none",
                              borderRadius: "5px",
                              marginTop: "5px",
                            }}
                            onClick={() => confirmAction("enable", user.id)}
                          >
                            Enable Account
                          </button>
                        ) : (
                          <button
                            style={{
                              backgroundColor: "#ff6666",
                              color: "#fff",
                              cursor: "pointer",
                              padding: "5px 10px",
                              border: "none",
                              borderRadius: "5px",
                              marginTop: "5px",
                            }}
                            onClick={() => confirmAction("revoke", user.id)}
                          >
                            Revoke Account
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default UserProfiles;
