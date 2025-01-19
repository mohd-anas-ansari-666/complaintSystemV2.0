import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ComplaintDetail = () => {
    const { id } = useParams(); // Get the complaint ID from the URL
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaintDetail = async () => {
            console.log('Fetching complaint with ID:', id); // Log the ID
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/complaints/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                setComplaint(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching complaint details', err);
                setLoading(false);
            }
        };

        fetchComplaintDetail();
    }, [id]);

    if (loading) {
        return <p>Loading complaint details...</p>;
    }

    if (!complaint) {
        return <p>Complaint not found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Complaint Details</h1>
            
            {/* Complaint Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">{complaint.description}</h2>
                <p className="text-gray-700 mb-2"><strong>Category:</strong> {complaint.category}</p>
                <p className="text-gray-700 mb-2"><strong>Location:</strong> {complaint.location}</p>
                <p className="text-gray-700 mb-2"><strong>Status:</strong> {complaint.status}</p>
                <p className="text-gray-700 mb-4"><strong>Created At:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>

                {complaint.imageUrl && (
                    <div>
                        <p className="font-semibold">Image:</p>
                        <img src={complaint.imageUrl} alt="Complaint" className="w-full rounded-lg mt-2" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplaintDetail;
