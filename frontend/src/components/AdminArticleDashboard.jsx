import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminArticleDashboard = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/articles', {
                    headers: { 'x-auth-token': token }
                });
                setArticles(res.data);
            } catch (err) {
                alert('Error fetching articles');
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
                Article Submissions
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                {articles.length > 0 ? (
                    <ul className="space-y-6">
                        {articles.map((article) => (
                            <li key={article._id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
                                <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
                                <p className="text-gray-600">By: <strong>{article.user.name}</strong></p>
                                <p className="text-sm text-gray-500">Status: <span className={`font-semibold ${article.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>{article.status}</span></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">No articles submitted yet.</p>
                )}
            </div>
        </div>
    );
};

export default AdminArticleDashboard;
