import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/articles');
                setArticles(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching articles', err);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-600">Loading articles...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Articles</h1>

            {articles.length > 0 ? (
                <>
                    <ul className="space-y-6">
                        {articles.map((article) => (
                            <li key={article._id} className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all">
                                <h2 className="text-2xl font-semibold text-gray-800">{article.title}</h2>
                                <p className="text-gray-600">{article.content.substring(0, 150)}...</p>
                                <Link to={`/articles/${article._id}`}>
                                    <button className="mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                                        Read more
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link to="/register-article">
                        <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                            Register New Article
                        </button>
                    </Link>
                </>
            ) : (
                <p className="text-center text-gray-600">No articles available.</p>
            )}
        </div>
    );
};

export default Articles;
