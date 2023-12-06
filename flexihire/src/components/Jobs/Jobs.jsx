import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import PostStatus from "../JobInfo/PostStatus";
import RetrievePosts from "../JobInfo/RetrievePosts";
import "./Jobs.css";

function Jobs() {
  const [status, setStatus] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [user, setUser] = useState(null);


  const handlePostSubmit = async () => {
    setStatus(true);
    setHidden(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="container-xxl py-5">
      {user ? ( // Check if the user object is present (indicating the user is logged in)
        <>
          <strong>
            <h5 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
              Post a job:{" "}
            </h5>
          </strong>
          <center>
            {hidden ? (
              <button onClick={handlePostSubmit}>Create New Job</button>
            ) : null}
            {status ? <PostStatus /> : ""}
          </center>
          <br />
        </>
      ) : null }
      <div className="containerJob">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
          Job Listing
        </h1>
        <RetrievePosts />
      </div>
    </div>
  );
}

export default Jobs;
