import React from 'react'
import RetrievePosts from "../../JobInfo/RetrievePosts";
function ManagePost() {
  const isAdmin = true; 
  return (
    <div className='retrievePost'>
        <RetrievePosts isAdmin={isAdmin} />
    </div>
  )
}

export default ManagePost;