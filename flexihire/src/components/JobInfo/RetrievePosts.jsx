// RetrievePosts.js
import React, { useEffect, useState } from 'react';
import AvailablePosts from './AvailablePosts';
import CreatedPosts from './CreatedPosts';
import { listenToAuthChanges } from '../../config/AuthContext';
import { collection, query, orderBy, onSnapshot, addDoc, getDoc, deleteDoc, updateDoc, doc, getDocs, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './RetrievePosts.css';
import { useNavigate } from 'react-router-dom';

function RetrievePosts({ isAdmin }) {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedSection, setSelectedSection] = useState('available');
    const [pendingApplications, setPendingApplications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [feedbackMessages, setFeedbackMessages] = useState({});
    const [acceptedPosts, setAcceptedPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribeAuth = listenToAuthChanges((user) => {
            setCurrentUser(user);
        });

        const fetchPosts = async () => {
            if (currentUser) {
                const postsRef = collection(db, 'posts');
                const q = query(postsRef, orderBy('timestamp', 'desc'));

                onSnapshot(q, (querySnapshot) => {
                    const postList = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));

                    const validPosts = postList.filter((post) => post && post.title);

                    setPosts(validPosts);
                });
            }
        };

        const fetchAcceptedPosts = async () => {
            try {
                const acceptedCollectionRef = collection(db, 'accepted');
                const acceptedSnapshot = await getDocs(acceptedCollectionRef);
                const acceptedPostsData = acceptedSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        postId: data.postId,
                        userId: data.userId,
                        username: data.username,
                        completed: data.completed,
                        fileDownloadURL: data.fileDownloadURL,
                    };
                });
                setAcceptedPosts(acceptedPostsData);
            } catch (error) {
                console.error('Error fetching accepted posts:', error);
            }
        };

        const unsubscribeAcceptedPosts = onSnapshot(collection(db, 'accepted'), () => {
            fetchAcceptedPosts();
        });

        fetchPosts();
        fetchAcceptedPosts();

        return () => {
            unsubscribeAuth();
            unsubscribeAcceptedPosts();
        };
    }, [currentUser]);

    const formatDate = (timestamp) => {
        if (timestamp) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(timestamp.toDate()).toLocaleDateString(
                undefined,
                options
            );
        }
        return '';
    };

    const handleDeletePost = async (postId) => {
        try {
            const postDocRef = doc(db, 'posts', postId);
            await deleteDoc(postDocRef);

            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleApplyPost = (postId, postUploaderUserId, postUploaderUsername) => {
        console.log(`Applying post with ID: ${postId}. Notifying ${postUploaderUsername}.`);
        // Add your logic for handling applications here
    };

    const handleReportPost = async (postId) => {
        try {
            if (currentUser) {
                const reportReason = prompt('Please enter the reason for reporting this post:');

                if (reportReason !== null) {
                    const reportsCollectionRef = collection(db, 'reports');
                    const timestamp = serverTimestamp();

                    await addDoc(reportsCollectionRef, {
                        post: postId,
                        reason: reportReason,
                        timestamp: timestamp,
                    });

                    console.log('Post reported successfully with reason:', reportReason);
                } else {
                    console.log('Post report canceled.');
                }
            } else {
                console.error('User details not available.');
            }
        } catch (error) {
            console.error('Error reporting post:', error);
        }
    };

    const handleApplicationButton = async (postId, postUploaderUserId, postUploaderUsername) => {
        console.log(`Handling application for post with ID: ${postId}. Notifying ${postUploaderUsername}.`);

        try {
            const applicationsRef = collection(db, 'applications');
            const q = query(applicationsRef, where('postId', '==', postId), where('approved', '==', 0));
            const querySnapshot = await getDocs(q);
            const pendingApplicationsData = querySnapshot.docs
                .filter((doc) => doc.exists())
                .map((doc) => {
                    const applicationData = doc.data();

                    return {
                        ...applicationData,
                        username: applicationData.username,
                    };
                });

            setPendingApplications(pendingApplicationsData);
            setSelectedPostId(postId);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error handling application:', error);
        }
    };

    const handleApproveReject = async (applicationId, status) => {
        try {
            const applicationDocRef = doc(db, 'applications', applicationId);
            const applicationDoc = await getDoc(applicationDocRef);

            if (applicationDoc.exists()) {
                const applicationData = applicationDoc.data();

                if (status === 1) {
                    const acceptedCollectionRef = collection(db, 'accepted');
                    await addDoc(acceptedCollectionRef, {
                        postId: applicationData.postId,
                        userId: applicationData.userId,
                        username: applicationData.username,
                    });

                    // Update the user's status to approved in the "applications" collection
                    await updateDoc(applicationDocRef, { approved: status });

                    // Set feedback message for the specific post
                    setFeedbackMessages((prevMessages) => ({
                        ...prevMessages,
                        [applicationData.postId]: {
                            message: 'User accepted.',
                            action: 'accept',
                        },
                    }));
                } else if (status === -1) {
                    // Update the user's status to rejected in the "applications" collection
                    await updateDoc(applicationDocRef, { approved: status, rejected: true });

                    // Set feedback message for rejection
                    setFeedbackMessages((prevMessages) => ({
                        ...prevMessages,
                        [applicationData.postId]: {
                            message: 'User rejected.',
                            action: 'reject',
                        },
                    }));

                    // Clear the rejection message after 3 seconds
                    setTimeout(() => {
                        setFeedbackMessages((prevMessages) => ({
                            ...prevMessages,
                            [applicationData.postId]: null,
                        }));
                    }, 3000);
                }

                setPendingApplications((prevApplications) => {
                    const updatedApplications = prevApplications.map((app) =>
                        app.applicationId === applicationId ? { ...app, approved: status } : app
                    );
                    return updatedApplications;
                });

                // Clear the acceptance message after 3 seconds
                setTimeout(() => {
                    setFeedbackMessages((prevMessages) => ({
                        ...prevMessages,
                        [applicationData.postId]: null,
                    }));
                }, 3000);

                // Close the modal
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error approving/rejecting application:', error);
        }
    };

    const availablePosts = posts.filter(
        (post) => (!post.userId || post.userId !== currentUser?.uid) && !isAdmin
    );

    const createdPosts = posts.filter(
        (post) => post.userId === currentUser?.uid && !isAdmin
    );

    const handleDownloadFile = (postId) => {
        const acceptedPost = acceptedPosts.find((acceptedPost) => acceptedPost.postId === postId);

        if (acceptedPost && acceptedPost.fileDownloadURL) {
            console.log('Downloading file from:', acceptedPost.fileDownloadURL);
            window.open(acceptedPost.fileDownloadURL, '_blank');
        } else {
            console.error('File download URL is undefined.');
        }
    };

    const handlePay = () => {
        console.log('Navigate to Payment component');
        navigate('/payment');
    };

    return (
        <div className="retrieve-posts-container">
            {currentUser ? (
                <>
                    {isAdmin && (
                        <ul>
                            {posts.map((post) => (
                                <li key={post.id} className="job-post">
                                    <div className="job-header">
                                        <div className="title">{post.title}</div>
                                        <div className="postDetails">
                                            <p>
                                                <a
                                                    href={`/users/${post.userId}`}
                                                    className="username-link"
                                                >
                                                    {post.username}
                                                </a>{' '}
                                                posted on {formatDate(post.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="job-description">
                                        {post.description && <>{post.description}</>}
                                    </div>
                                    <div className="job-details">
                                        <div className="exp">Experience: {post.experience}</div>
                                        <div className="deadline">Deadline: {post.deadline}</div>
                                        <div className="workinghrs">Est. time: {post.timing}</div>
                                        <div className="salary">Salary: {post.salary}</div>
                                    </div>
                                    <div className="job-actions">
                                        <button onClick={() => handleDeletePost(post.id)}>
                                            Remove Job Opening
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {!isAdmin && (
                        <div className="section-wrapper">
                            <h6
                                className={`section-title ${selectedSection === 'available' && 'active'
                                    }`}
                                onClick={() => setSelectedSection('available')}
                            >
                                Available Jobs
                            </h6>
                            <h6
                                className={`section-title ${selectedSection === 'created' && 'active'
                                    }`}
                                onClick={() => setSelectedSection('created')}
                            >
                                Your Created Jobs
                            </h6>
                        </div>
                    )}
                    {selectedSection === 'available' && (
                        <AvailablePosts
                            posts={availablePosts}
                            currentUser={currentUser}
                            handleApplyPost={handleApplyPost}
                            handleReportPost={handleReportPost}
                            feedbackMessages={feedbackMessages}
                            acceptedPosts={acceptedPosts}
                            handleDownloadFile={handleDownloadFile}
                            handlePay={handlePay}
                            handleApplicationButton={handleApplicationButton}
                            handleDeletePost={handleDeletePost}
                            isModalOpen={isModalOpen}
                            pendingApplications={pendingApplications}
                            setSelectedPostId={setSelectedPostId}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                    {selectedSection === 'created' && (
                        <CreatedPosts
                            posts={createdPosts}
                            currentUser={currentUser}
                            feedbackMessages={feedbackMessages}
                            acceptedPosts={acceptedPosts}
                            handleDownloadFile={handleDownloadFile}
                            handlePay={handlePay}
                            handleApplicationButton={handleApplicationButton}
                            handleDeletePost={handleDeletePost}
                            handleApproveReject={handleApproveReject}
                            selectedPostId={selectedPostId}
                            isModalOpen={isModalOpen}
                            pendingApplications={pendingApplications}
                            setSelectedPostId={setSelectedPostId}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                </>
            ) : (
                <center>
                    <div className="login-signup-message">
                        <p>
                            Please join to be a <a href="/member">member</a> to start surfing
                            the available jobs.
                        </p>
                    </div>
                </center>
            )}
        </div>
    );
}

export default RetrievePosts;
