import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/complaints/mycomplaints', {
                    headers: { 'x-auth-token': token }
                });
                setComplaints(res.data);
            } catch (err) {
                alert('Error fetching complaints');
            }
        };
        fetchComplaints();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">My Complaints</h2>

            <ul className="space-y-4">
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <li key={complaint._id} className="p-4 bg-gray-50 rounded-lg shadow-md">
                            <p className="text-lg font-medium text-gray-800">{complaint.description}</p>
                            <p className="mt-2 text-sm text-gray-600">Status: <span className="font-semibold">{complaint.status}</span></p>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No complaints submitted yet.</p>
                )}
            </ul>

            <div className="mt-6 text-center">
                <Link to="/register-complaint">
                    <button className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                        Register Complaint
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MyComplaints;
