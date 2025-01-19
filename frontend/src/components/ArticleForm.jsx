import { useState } from 'react';
import axios from 'axios';

const ArticleForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const { title, content } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.REACT_APP_API_URL}/articles`, formData, {
                headers: {
                    'x-auth-token': token
                }
            });
            alert('Article submitted successfully');
        } catch (err) {
            alert('Error submitting article');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit a New Article</h2>

            <form onSubmit={onSubmit}>
                {/* Title Input */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Article Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={onChange}
                        placeholder="Enter the article title"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Content Textarea */}
                <div className="mb-6">
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                    <textarea
                        name="content"
                        id="content"
                        value={content}
                        onChange={onChange}
                        placeholder="Write the content of the article here..."
                        required
                        rows="6"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit Article
                </button>
            </form>
        </div>
    );
};

export default ArticleForm;
