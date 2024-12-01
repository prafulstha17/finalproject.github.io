import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Adjust path as needed

const Recommendation = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      // Fetch all applications
      const applicationsRef = collection(db, 'applications');
      const applicationsSnapshot = await getDocs(applicationsRef);
      
      return applicationsSnapshot.docs.map(doc => ({
        userId: doc.data().userId,
        postId: doc.data().postId
      }));
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err);
      return [];
    }
  };

  const fetchJobDetails = async (postIds) => {
    const postsRef = collection(db, "posts"); 
    const postsSnapshot = await getDocs(postsRef);
    const posts = postsSnapshot.docs
      .filter(doc => postIds.includes(doc.id)) // Filter posts by the recommended post IDs
      .map(doc => ({
        id: doc.id,
       
        
        ...doc.data(),
      }));
      
    return posts;
    
  };
  


  const recommendJobs = (applications, targetUserId, numRecommendations = 5) => {
    const userInteractions = {};
    applications.forEach(app => {
      if (!userInteractions[app.userId]) {
        userInteractions[app.userId] = new Set();
      }
      userInteractions[app.userId].add(app.postId);
    });

    const similarUsers = Object.keys(userInteractions)
      .filter(userId => userId !== targetUserId)
      .filter(userId => {
        const targetUserJobs = userInteractions[targetUserId] || new Set();
        const otherUserJobs = userInteractions[userId];
        
        const intersection = new Set(
          [...targetUserJobs].filter(job => otherUserJobs.has(job))
        );
        const union = new Set([...targetUserJobs, ...otherUserJobs]);
        
        return intersection.size / union.size > 0.2;
      });

    const targetUserJobs = userInteractions[targetUserId] || new Set();
    const recommendations = new Set();

    const formatDate = (timestamp) => {
        if (timestamp) {
          const options = { year: "numeric", month: "short", day: "numeric" };
          return new Date(timestamp.toDate()).toLocaleDateString(
            undefined,
            options
          );
        }
        return "";
      };

    similarUsers.forEach(userId => {
      userInteractions[userId].forEach(job => {
        if (!targetUserJobs.has(job) && recommendations.size < numRecommendations) {
          recommendations.add(job);
        }
      });
    });

    return Array.from(recommendations);
  };

  useEffect(() => {
    const generateRecommendations = async () => {
      try {
        const applications = await fetchApplications();
        const recommendedJobs = recommendJobs(applications, userId);

        // Fetch detailed information for recommended job posts
        const detailedPosts = await fetchJobDetails(recommendedJobs);
        setRecommendations(detailedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Recommendation error:', error);
        setError(error);
        setLoading(false);
      }
    };

    if (userId) {
      generateRecommendations();
    }
  }, [userId]);

  if (error) {
    return <div>Error loading recommendations: {error.message}</div>;
  }

  return (
   
    <div>
    <h2>Recommended Jobs for You</h2>
    {loading ? (
      <p>Loading recommendations...</p>
    ) : recommendations.length > 0 ? (
      <ul>
        {recommendations.length > 0 ? (
          recommendations.map((post) => (

            <li key={post.id} className="items-center bg-white border border-gray-200 rounded-lg shadow m-3 p-5 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="job-header">
              <div className="title">{post.title}</div>
                <div className="postDetails">
                  <p>
                    <a href={`/users/${post.userId}`} className="username-link">
                      {post.username}
                    </a> {""}
                    
                  </p>
                </div>
              </div>
              <div className="job-description">
                        {post.description && <>{post.description}</>}
                      </div>

                      <div className="job-details">
                        <div className="exp">Experience: {post.experience}</div>
                        <div className="deadline">
                          Deadline: {post.deadline}
                        </div>
                        <div className="workinghrs">
                          Est. time: {post.timing}
                        </div>
                        <div className="salary">Salary: {post.salary}</div>
                        <div className="categories">
                          categories:{post.category}
                        </div>
                      </div>
              
            </li>
           
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </ul>
    ) : (
      <p>No recommendations available at the moment.</p>
    )}
  </div>
  );
};

export default Recommendation;