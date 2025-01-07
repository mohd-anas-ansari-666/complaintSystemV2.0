import { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        category: '',
        location: '',
        imageUrl: ''
    });

    const { description, category, location, imageUrl } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/complaints', formData, {
                headers: {
                    'x-auth-token': token
                }
            });
            alert('Complaint submitted successfully');
        } catch (err) {
            alert('Error submitting complaint');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Submit a Complaint</h2>

            <form onSubmit={onSubmit} className="space-y-6">
                <textarea
                    name="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Describe the issue"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                ></textarea>

                <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={onChange}
                    placeholder="Category (e.g., Plumbing)"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                />

                <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={onChange}
                    placeholder="Location (e.g., Hostel)"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                />

                <input
                    type="text"
                    name="imageUrl"
                    value={imageUrl}
                    onChange={onChange}
                    placeholder="Image URL (optional)"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />

                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Submit Complaint
                </button>
            </form>
        </div>
    );
};

export default ComplaintForm;
