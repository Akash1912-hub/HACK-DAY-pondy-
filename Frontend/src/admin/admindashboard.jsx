import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5008';

// Utility functions for API calls
const fetchApplications = async () => {
  try {
    const response = await axios.get(`${API_URL}/applications`);
    return response.data.applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

const updateApplicationStatus = async (id, status) => {
  try {
    await axios.put(`${API_URL}/applications/${id}/status`, { status });
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

// Header Component
const Header = () => (
  <header className="bg-blue-600 text-white shadow-md">
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-bold">Insurance Admin Dashboard</h1>
    </div>
  </header>
);

// Application Table Component
const ApplicationTable = ({ applications, onStatusUpdate }) => (
  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="w-screen p-5 m-90">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 md:px-6 py-3 text-left">Insurance Type</th>
          <th className="px-4 md:px-6 py-3 text-left">Status</th>
          <th className="px-4 md:px-6 py-3 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="px-4 md:px-6 py-3">{app.insuranceType}</td>
            <td className="px-4 md:px-6 py-3">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                app.status === 'approved' ? 'bg-green-200 text-green-800' :
                app.status === 'rejected' ? 'bg-red-200 text-red-800' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </td>
            <td className="px-4 md:px-6 py-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onStatusUpdate(app._id, 'approved')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm"
                  disabled={app.status !== 'pending'}
                >
                  Approve
                </button>
                <button
                  onClick={() => onStatusUpdate(app._id, 'rejected')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                  disabled={app.status !== 'pending'}
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main App Component
const App = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError('Failed to load applications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      setApplications(apps => apps.map(app => 
        app._id === id ? { ...app, status } : app
      ));
    } catch (err) {
      setError('Failed to update application status. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">Insurance Applications</h2>
        {isLoading ? (
          <p className="text-center">Loading applications...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ApplicationTable 
            applications={applications} 
            onStatusUpdate={handleStatusUpdate} 
          />
        )}
      </main>
    </div>
  );
};

export default App;

