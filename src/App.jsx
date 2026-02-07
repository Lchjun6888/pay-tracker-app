import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './Dashboard';
import CalendarView from './views/CalendarView';
import JobsView from './views/JobsView';
import SettingsView from './views/SettingsView';
import { useJobs } from './hooks/useJobs';
import AddJobModal from './components/AddJobModal';
import JobDetailModal from './components/JobDetailModal';
import ProfileModal from './components/ProfileModal';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // Basic user info state with persistence
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem('user_info');
    return saved ? JSON.parse(saved) : { name: '', role: '', goalIncome: '' };
  });

  const { jobs, allJobs, stats, filter, setFilter, addJob, deleteJob, archiveJob, updateJob } = useJobs();

  const handleSaveProfile = (newInfo) => {
    setUserInfo(newInfo);
    localStorage.setItem('user_info', JSON.stringify(newInfo));
  };

  // Filter jobs by search query
  const filteredJobs = searchQuery
    ? jobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : jobs;

  const handleEdit = (job) => {
    setSelectedJob(null);
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleAddOrUpdate = (jobData) => {
    if (editingJob) {
      updateJob(editingJob.id, jobData);
      setEditingJob(null);
    } else {
      addJob(jobData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleDeleteJob = (jobId) => {
    deleteJob(jobId);
    setSelectedJob(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'calendar':
        return <CalendarView jobs={filteredJobs} />;
      case 'jobs':
        return (
          <JobsView
            jobs={allJobs}
            onEdit={handleEdit}
            onDelete={deleteJob}
            onArchive={archiveJob}
          />
        );
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <Dashboard
            jobs={filteredJobs}
            stats={stats}
            filter={filter}
            setFilter={setFilter}
            onAddClick={() => setIsModalOpen(true)}
            onJobClick={handleJobClick}
            onDeleteJob={handleDeleteJob}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddOrUpdate}
        editingJob={editingJob}
      />

      <JobDetailModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        onEdit={handleEdit}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userInfo={userInfo}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
