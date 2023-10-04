import React, { useEffect, useState } from "react";
import "./UserProfiles.css";

const UserProfiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUsers");
        const usersData = await response.json();
        setUsers(usersData);
        console.log(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-profiles-container">
      <h2>User Profiles</h2>
      <div className="headUser">
      <div className="numberUser">
          <p>#</p>
        </div>
        <div className="nameUser">
          <p>Name</p>
        </div>
        <div className="emailUser">
          <p>Email</p>
        </div>
        <div className="createdUser">
          <p>Creation Date</p>
        </div>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.uid} className="user-card">
            <div className="user-info">
            <div className="numberUser">
                <p>#</p>
              </div>
              <div className="nameUser">
                <p>{user.displayName}</p>
              </div>
              <div className="emailUser">
                <p>{user.email}</p>
              </div>
              <div className="createdUser">
                <p>{user.metadata.creationTime}</p>
              </div>

              {/* Add more fields if needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfiles;
