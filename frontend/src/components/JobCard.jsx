import React, { useState } from 'react';

const JobCard = ({ job, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      onDelete(job._id);
    }
  };

  const getJobTypeColor = (type) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Part-time':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contract':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Internship':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const shouldTruncate = job.description.length > 300;
  const displayDescription = isExpanded || !shouldTruncate 
    ? job.description 
    : `${job.description.substring(0, 300)}...`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <div className="flex items-center text-gray-600 mb-1">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm8-2a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{job.company}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{job.location}</span>
            {job.remote && (
              <span className="ml-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                Remote
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getJobTypeColor(job.type)}`}>
            {job.type}
          </span>
          {job.salary && (
            <span className="text-sm font-semibold text-green-600 mt-2">{job.salary}</span>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-line">
          {displayDescription}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 focus:outline-none focus:underline transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          Posted {formatDate(job.createdAt)}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(job)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;