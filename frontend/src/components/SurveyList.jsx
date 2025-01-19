import { useEffect, useState } from 'react';
import axios from 'axios';

const SurveyList = () => {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/surveys`, {
                    headers: { 'x-auth-token': token }
                });
                setSurveys(res.data);
            } catch (err) {
                alert('Error fetching surveys');
            }
        };
        fetchSurveys();
    }, []);

    const handleResponse = async (surveyId, response) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/surveys/respond/${surveyId}`, { response }, {
                headers: { 'x-auth-token': token }
            });
            alert('Response submitted');
        } catch (err) {
            alert('Error submitting response');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Surveys</h2>

            {surveys.length > 0 ? (
                surveys.map((survey) => (
                    <div key={survey._id} className="p-4 bg-gray-50 rounded-lg shadow-md mb-6">
                        <p className="text-xl font-medium text-gray-800 mb-4">{survey.question}</p>
                        <div className="space-y-2">
                            {survey.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleResponse(survey._id, option)}
                                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">No surveys available.</p>
            )}
        </div>
    );
};

export default SurveyList;
