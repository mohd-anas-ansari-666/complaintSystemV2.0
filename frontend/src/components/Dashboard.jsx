import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import axios from 'axios';

const Dashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [articles, setArticles] = useState([]);
    const [resolvedComplaints, setResolvedComplaints] = useState(0);
    const [pendingComplaints, setPendingComplaints] = useState(0);
    const [latestArticle, setLatestArticle] = useState(null);

    useEffect(() => {
        // Fetch complaints
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/complaints', {
                    headers: { 'x-auth-token': token }
                });
                setComplaints(res.data);

                // Separate counts for resolved and pending complaints
                const resolved = res.data.filter(complaint => complaint.status === 'resolved').length;
                const pending = res.data.filter(complaint => complaint.status === 'pending').length;
                setResolvedComplaints(resolved);
                setPendingComplaints(pending);
            } catch (err) {
                console.error('Error fetching complaints', err);
            }
        };

        // Fetch articles
        const fetchArticles = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/articles', {
                    headers: { 'x-auth-token': token }
                });
                setArticles(res.data);

                // Assuming articles are sorted by date, fetch the latest
                if (res.data.length > 0) {
                    setLatestArticle(res.data[0]);
                }
            } catch (err) {
                console.error('Error fetching articles', err);
            }
        };

        fetchComplaints();
        fetchArticles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
                Welcome to the Environmental and Developmental Issues Platform
            </h1>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
                <Link to="/login">
                    <button className="btn">Login</button>
                </Link>
                <Link to="/register">
                    <button className="btn">Register</button>
                </Link>
                <Link to="/complaints">
                    <button className="btn">Complaints</button>
                </Link>
                <Link to="/articles">
                    <button className="btn">Articles</button>
                </Link>
                <Link to="/admin">
                    <button className="btn">Admin Panel</button>
                </Link>
            </div>

            {/* Dashboard Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="stat-card">
                    <h3 className="text-xl font-semibold text-gray-700">Total Complaints</h3>
                    <p className="text-2xl font-bold text-indigo-600">{complaints.length}</p>
                </div>
                <div className="stat-card">
                    <h3 className="text-xl font-semibold text-gray-700">Resolved Complaints</h3>
                    <p className="text-2xl font-bold text-green-600">{resolvedComplaints}</p>
                </div>
                <div className="stat-card">
                    <h3 className="text-xl font-semibold text-gray-700">Pending Complaints</h3>
                    <p className="text-2xl font-bold text-yellow-600">{pendingComplaints}</p>
                </div>
            </div>

            {/* Latest Article */}
            <div className="latest-section mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Latest Article</h2>
                {latestArticle ? (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-gray-800">{latestArticle.title}</h3>
                        <p className="text-gray-600 mt-2">{latestArticle.content.substring(0, 150)}...</p>
                        <Link to={`/articles/${latestArticle._id}`} className="text-indigo-600 hover:underline mt-2 inline-block">
                            Read more
                        </Link>
                    </div>
                ) : (
                    <p>No articles available at the moment.</p>
                )}
            </div>

            {/* Complaints Overview */}
            <div className="complaints-overview mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Complaints</h2>
                {complaints.length > 0 ? (
                    <ul className="space-y-4">
                        {complaints.slice(0, 5).map((complaint) => (
                            <li key={complaint._id} className="bg-white p-4 rounded-lg shadow-md">
                                <strong className="text-gray-800">{complaint.description}</strong> - 
                                <span className={`text-sm ${complaint.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {complaint.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No complaints submitted yet.</p>
                )}
                <Link to="/complaints" className="text-indigo-600 hover:underline mt-4 inline-block">
                    View All Complaints
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
