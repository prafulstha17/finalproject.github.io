// AvailablePosts.js
import React from 'react';
import ApplyButton from './ApplyButton';

function AvailablePosts({
    posts,
    currentUser,
    handleApplyPost,
    handleReportPost,
    feedbackMessages,
    acceptedPosts,
    handleDownloadFile,
    handlePay,
    handleApplicationButton,
    handleDeletePost,
    isModalOpen,
    pendingApplications,
    setSelectedPostId,
    setIsModalOpen,
}) {
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

    return (
        <div className="available-posts">
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
                                    </a>{" "}
                                    posted on {formatDate(post.timestamp)}
                                </p>
                            </div>
                        </div>
                        <div className="job-description">
                            {post.description && (
                                <>
                                    <pre>{post.description}</pre>
                                </>
                            )}
                        </div>
                        <div className="job-details">
                            <div className="exp">Experience: {post.experience}</div>
                            <div className="deadline">Deadline: {post.deadline}</div>
                            <div className="workinghrs">Est. time: {post.timing}</div>
                            <div className="salary">Salary: {post.salary}</div>
                        </div>
                        <div className="job-actions">
                            <div className="handleButton">
                                <ApplyButton
                                    postId={post.id}
                                    recipientUserId={post.userId}
                                    currentUserId={currentUser.uid}
                                    applicationMessage="Your application message here"
                                    handleApplication={() =>
                                        handleApplyPost(post.id, post.userId, post.username)
                                    }
                                />
                                <button
                                    className="report"
                                    onClick={() => handleReportPost(post.id)}
                                >
                                    Report
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AvailablePosts;
