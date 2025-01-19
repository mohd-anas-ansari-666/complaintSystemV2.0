// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminPanel = () => {
//     const [complaints, setComplaints] = useState([]);

//     useEffect(() => {
//         // Fetch all complaints
//         const fetchComplaints = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const res = await axios.get('http://localhost:5000/api/complaints', {
//                     headers: { 'x-auth-token': token }
//                 });
//                 console.log(res.data); // debugging to inspect complaint data structure
//                 setComplaints(res.data);
//             } catch (err) {
//                 console.error('Error fetching complaints', err);
//             }
//         };

//         fetchComplaints();
//     }, []);

//     const handleStatusChange = async (id, status) => {
//         try {
//             const token = localStorage.getItem('token');
//             console.log("Token:", token);
//             await axios.put(`http://localhost:5000/api/complaints/${id}/status`, { status }, {
//                 headers: {
//                     'x-auth-token': token
//                 },
//             });
//             alert('Status updated successfully');
//             // Refresh the complaints list
//             setComplaints(complaints.map(complaint => 
//                 complaint._id === id ? { ...complaint, status } : complaint
//             ));
//         } catch (err) {
//             console.error('Error updating status', err);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Admin Panel</h1>
            
//             {/* Complaint Table */}
//             <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
//                 <table className="min-w-full table-auto">
//                     <thead className="bg-indigo-600 text-white">
//                         <tr>
//                             <th className="px-4 py-2 text-left">Complaint</th>
//                             <th className="px-4 py-2 text-left">Status</th>
//                             <th className="px-4 py-2 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {complaints.map(complaint => (
//                             <tr key={complaint._id} className="border-t hover:bg-gray-50">
//                                 <td className="px-4 py-2">{complaint.description}</td>
//                                 <td className="px-4 py-2">
//                                     <span className={`font-semibold ${complaint.status === 'resolved' ? 'text-green-600' : complaint.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
//                                         {complaint.status}
//                                     </span>
//                                 </td>
//                                 <td className="px-4 py-2">
//                                     <select
//                                         value={complaint.status}
//                                         onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
//                                         className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                     >
//                                         <option value="pending">Pending</option>
//                                         <option value="resolved">Resolved</option>
//                                         <option value="rejected">Rejected</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminPanel;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link to enable navigation

const AdminPanel = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        // Fetch all complaints
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/complaints`, {
                    headers: { 'x-auth-token': token }
                });
                setComplaints(res.data);
            } catch (err) {
                console.error('Error fetching complaints', err);
            }
        };

        fetchComplaints();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/complaints/${id}/status`, { status }, {
                headers: { 'x-auth-token': token }
            });
            alert('Status updated successfully');
            // Refresh the complaints list
            setComplaints(complaints.map(complaint => 
                complaint._id === id ? { ...complaint, status } : complaint
            ));
        } catch (err) {
            console.error('Error updating status', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Admin Panel</h1>
            
            {/* Complaint Table */}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Complaint</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(complaint => (
                            <tr key={complaint._id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">
                                    <Link to={`/complaint/${complaint._id}`} className="text-indigo-600 hover:underline">
                                        {complaint.description}
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    <span className={`font-semibold ${complaint.status === 'resolved' ? 'text-green-600' : complaint.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                        {complaint.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        value={complaint.status}
                                        onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
