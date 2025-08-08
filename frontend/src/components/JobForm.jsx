import React, { useState, useEffect } from 'react';

const JobForm = ({ job, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    type: 'Full-time',
    remote: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        company: job.company || '',
        location: job.location || '',
        description: job.description || '',
        salary: job.salary || '',
        type: job.type || 'Full-time',
        remote: job.remote || false
      });
    }
  }, [job]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Job title cannot exceed 100 characters';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    } else if (formData.company.length > 100) {
      newErrors.company = 'Company name cannot exceed 100 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.length > 100) {
      newErrors.location = 'Location cannot exceed 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Description cannot exceed 2000 characters';
    }

    if (formData.salary && formData.salary.length > 50) {
      newErrors.salary = 'Salary cannot exceed 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const inputClasses = (fieldName) => {
    const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm focus-ring transition-colors";
    return `${baseClasses} ${errors[fieldName] 
      ? 'border-red-300 focus:border-red-500' 
      : 'border-gray-300 focus:border-primary-500'
    }`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {job ? 'Edit Job' : 'Add New Job'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClasses('title')}
              placeholder="e.g. Frontend Developer"
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClasses('company')}
              placeholder="e.g. Tech Corp"
              maxLength={100}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={inputClasses('location')}
              placeholder="e.g. San Francisco, CA"
              maxLength={100}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
              Salary (Optional)
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={inputClasses('salary')}
              placeholder="e.g. $80,000 - $120,000"
              maxLength={50}
            />
            {errors.salary && (
              <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={inputClasses('type')}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Remote Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remote"
              name="remote"
              checked={formData.remote}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
              Remote work available
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            className={inputClasses('description')}
            placeholder="Describe the job responsibilities, requirements, and other details..."
            maxLength={2000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.description.length}/2000
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus-ring transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 cursor-pointer bg-primary-600 rounded-md hover:bg-primary-700 focus-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {job ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              job ? 'Update Job' : 'Create Job'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;