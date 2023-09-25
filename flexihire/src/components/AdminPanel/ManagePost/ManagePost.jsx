import React from 'react'
import RetrievePosts from "../../JobInfo/RetrievePosts";
function ManagePost() {
  const isAdmin = true; 
  return (
    <div>
        <RetrievePosts isAdmin={isAdmin} />
    </div>
  )
}

export default ManagePost;