import React from 'react';

const RequestList = ({ requests, onRequestClick }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">Requests</h2>
      <ul className="divide-y divide-gray-200">
        {requests.map((request) => (
          <li
            key={request._id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
            onClick={() => onRequestClick(request)}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-indigo-600">{request.type}</p>
                <p className="text-sm text-gray-500">{request.applicantName}</p>
              </div>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {request.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;

