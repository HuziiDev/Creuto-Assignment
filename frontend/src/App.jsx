import React, { useState, useEffect } from 'react';
import { jobsAPI } from './services/api';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import Toast from './components/Toast';

function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' });

  // Load jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await jobsAPI.getAll();
      setJobs(response.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      showToast('Failed to load jobs. Please refresh the page.', 'error');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleAddJob = () => {
    console.log('handleAddJob called'); // Debug log
    setEditingJob(null);
    setShowForm(true);
    console.log('showForm set to true'); // Debug log
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const handleFormSubmit = async (jobData) => {
    try {
      setIsSubmitting(true);
      
      if (editingJob) {
        // Update existing job
        const response = await jobsAPI.update(editingJob._id, jobData);
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job._id === editingJob._id ? response.data : job
          )
        );
        showToast('Job updated successfully!', 'success');
      } else {
        // Create new job
        const response = await jobsAPI.create(jobData);
        setJobs(prevJobs => [response.data, ...prevJobs]);
        showToast('Job created successfully!', 'success');
      }
      
      setShowForm(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error submitting job:', error);
      const errorMessage = error.message || 'An error occurred while saving the job.';
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await jobsAPI.delete(jobId);
      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      showToast('Job deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting job:', error);
      showToast('Failed to delete job. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm6-1a1 1 0 00-1-1H9a1 1 0 00-1 1v1h4V5zM4 9a1 1 0 100 2v5h12V9a1 1 0 100-2H4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h1 className="ml-3 text-2xl font-bold text-gray-900">JobBoard</h1>
                </div>
              </div>
            </div>
            
            {!showForm && (
              <button
                onClick={() => {
                  console.log('Add New Job button clicked'); // Debug log
                  handleAddJob();
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
                style={{ backgroundColor: '#2563eb' }} // Fallback inline style
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Job
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {showForm ? (
          <div className="max-w-4xl mx-auto">
            <JobForm
              job={editingJob}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isSubmitting}
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <JobList
              jobs={jobs}
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
              onAddJob={handleAddJob}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2024 JobBoard. Built with React, Node.js, and MongoDB.</p>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;