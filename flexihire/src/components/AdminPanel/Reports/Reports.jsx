import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    getDoc,
    doc,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import './Reports.css';

function Reports() {
    const [filteredReports, setFilteredReports] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Users');
    const [selectedSection, setSelectedSection] = useState("users");


    const navigate = useNavigate();

    const handleUserRedirect = (userId) => {
        navigate('/users');
    };

    const handlePostRedirect = (postId) => {
        navigate('/managepost');
    };

    useEffect(() => {
        const fetchReports = () => {
            try {
                const reportsCollectionRef = collection(db, 'reports');
                const q = query(reportsCollectionRef, orderBy('timestamp', 'desc'));

                onSnapshot(q, (querySnapshot) => {
                    const processReports = async () => {
                        const reportsList = [];

                        for (const queryDocSnapshot of querySnapshot.docs) {
                            const reportData = queryDocSnapshot.data();

                            let referenceData = null;

                            if (reportData.user && selectedCategory === 'Users') {
                                const userDoc = await getDoc(doc(db, 'users', reportData.user));
                                referenceData = userDoc.data();
                            } else if (reportData.post && selectedCategory === 'Posts') {
                                const postDoc = await getDoc(doc(db, 'posts', reportData.post));
                                referenceData = postDoc.data();
                            }

                            if (referenceData) {
                                reportsList.push({
                                    ...reportData,
                                    id: queryDocSnapshot.id,
                                    referenceData: referenceData,
                                });
                            }
                        }

                        setFilteredReports(reportsList);
                    };

                    processReports();
                });
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [selectedCategory]);

    const handleCategoryChange = (category, section) => {
        setSelectedCategory(category);
        setSelectedSection(section);
      };

    return (
        <div className="reports-container">
            <div className="category-selector">
                <div className="section-wrapper">
                    <h6 className={`section-title ${selectedSection === 'users' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('Users', 'users')}>
                        Users
                    </h6>
                    <h6 className={`section-title ${selectedSection === 'posts' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('Posts', 'posts')}>
                        Posts
                    </h6>
                </div>
            </div>

            <div className="reports-list">
                <ul>
                    {filteredReports.map((report) => (
                        <li key={report.id}>
                            <p>
                                <strong>ID:</strong> {report.id}
                            </p>
                            {report.referenceData && (
                                <>
                                    <div className="redirect">
                                        <div className="infoReport">
                                            <p>
                                                <strong>{report.user ? 'Username: ' : 'Post Title: '}</strong>
                                                {report.user ? report.referenceData.displayName : report.referenceData.title}
                                            </p>
                                            <p>
                                                <strong>{report.user ? 'User Email: ' : 'Post Description: '}</strong>
                                                {report.user ? report.referenceData.email : report.referenceData.description}
                                            </p>
                                            <p>
                                                <strong>Reason:</strong> {report.reason}
                                            </p>
                                        </div>
                                        <div className="redirectButton">
                                            {report.user ? (
                                                <button onClick={() => handleUserRedirect()}>
                                                    View User
                                                </button>
                                            ) : (
                                                <button onClick={() => handlePostRedirect()}>
                                                    Manage Post
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Reports;