import PostStatus from "../JobInfo/PostStatus";
import RetrievePosts from "../JobInfo/RetrievePosts";
import { useState } from "react";
import "./Jobs.css";

function Jobs() {
  const [status, setStatus] = useState(false);
  const [hidden, setHidden] = useState(true);
  const handlePostSubmit = async () => {
    setStatus(true);
    setHidden(false);
  };

  return (
    <div class="container-xxl py-5">
      <strong>
        <h5 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
          Post a job:{" "}
        </h5>
      </strong>
      {hidden ? <button onClick={handlePostSubmit}>Create New Job</button> : ""}
      {status ? <PostStatus /> : ""}
      <br />
      <div class="container">
        <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
          Job Listing
        </h1>
        <RetrievePosts />
      </div>
    </div>
  );
}

export default Jobs;
