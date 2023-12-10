// CreatedPosts.js
import React from 'react';
import PendingApplicationsPopup from "./PendingApplicationsPopup";

function CreatedPosts({
    posts,
    currentUser,
    feedbackMessages,
    acceptedPosts,
    handleDownloadFile,
    handlePay,
    handleApplicationButton,
    handleDeletePost,
    handleApproveReject,
    selectedPostId,
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
        <div className="created-posts">
            <ul>
                {posts.map((post) => (
                    <li key={post.id} className="job-post">
                        <div className="job-header">
                            <div className="title">{post.title}</div>
                            <div className="postDetails">
                                <p>
                                    <a href={`/profile`} className="username-link">
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
                        {feedbackMessages[post.id] && (
                            <div
                                className={`feedback-message ${feedbackMessages[post.id].action === "accept"
                                    ? "accept"
                                    : "reject"
                                    }`}
                            >
                                {feedbackMessages[post.id].message}
                            </div>
                        )}
                        {acceptedPosts.some((acceptedPost) => acceptedPost.postId === post.id) ? (
                            <strong>
                                <p>Application Accepted</p>
                                <div>
                                    Username:{" "}
                                    {acceptedPosts.find(
                                        (acceptedPost) => acceptedPost.postId === post.id
                                    )?.username}
                                </div>
                                {acceptedPosts.find(
                                    (acceptedPost) => acceptedPost.postId === post.id
                                )?.completed === 1 && (
                                        <div className="finalApproval">
                                            <div className="downloadFinal">
                                                <button onClick={() => handleDownloadFile(post.id)}>
                                                    Download
                                                </button>
                                            </div>
                                            <div className="payFinal">
                                                <button onClick={handlePay}>Pay</button>
                                            </div>
                                        </div>
                                    )}
                            </strong>
                        ) : (
                            <div className="job-actions">
                                <div className="handleButton">
                                    <>
                                        <button
                                            onClick={() =>
                                                handleApplicationButton(
                                                    post.id,
                                                    post.userId,
                                                    post.username
                                                )
                                            }
                                        >
                                            Show Pending Applications
                                        </button>
                                        <button onClick={() => handleDeletePost(post.id)}>
                                            Remove Job Opening
                                        </button>
                                    </>
                                </div>
                            </div>
                        )}
                        {isModalOpen && (
                            <PendingApplicationsPopup
                                isOpen={isModalOpen}
                                handleClose={() => setIsModalOpen(false)}
                                pendingApplications={pendingApplications}
                                handleApproveReject={handleApproveReject}
                                postTitle={
                                    selectedPostId
                                        ? posts.find((post) => post.id === selectedPostId)?.title
                                        : ""
                                }
                                postDescription={
                                    selectedPostId
                                        ? posts.find((post) => post.id === selectedPostId)?.description
                                        : ""
                                }
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CreatedPosts;
