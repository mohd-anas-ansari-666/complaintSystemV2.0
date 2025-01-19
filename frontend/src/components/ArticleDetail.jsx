import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ArticleDetail = () => {
    const { id } = useParams(); // Get the article ID from the URL
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/articles/${id}`);
                setArticle(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching article', err);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <p className="text-center text-xl text-gray-600">Loading article...</p>;
    }

    if (!article) {
        return <p className="text-center text-xl text-red-600">Article not found.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{article.title}</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{article.content}</p>

            {/* Back Button */}
            <div className="text-center">
                <Link to="/articles">
                    <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Back to Articles
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ArticleDetail;
