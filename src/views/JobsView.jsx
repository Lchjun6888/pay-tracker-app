import React from 'react';

export default function JobsView({ jobs, onEdit, onDelete, onArchive }) {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">All Jobs</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all your part-time jobs and shifts</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-700/50">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pay Rate / Details</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                        {jobs.map(job => (
                            <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg
                      ${job.type === 'FREELANCE' ? 'bg-indigo-100 text-indigo-500 dark:bg-indigo-900/50' :
                                                job.type === 'SALARY' ? 'bg-green-100 text-green-500 dark:bg-green-900/50' :
                                                    'bg-primary-100 text-primary-500 dark:bg-primary-900/50'}`}>
                                            <i className={job.icon || 'fas fa-briefcase'}></i>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{job.title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${job.categoryColor}`}>
                                        {job.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {job.type === 'FREELANCE' ? (
                                            <span>₩{job.hourlyRate.toLocaleString()} <span className="text-xs text-gray-400">/ 건</span></span>
                                        ) : job.type === 'SALARY' ? (
                                            <span>
                                                ₩{(job.hourlyRate / 10000).toLocaleString()}만
                                                <span className="text-xs text-gray-400"> / {job.salaryType === 'ANNUAL' ? '연' : '월'}</span>
                                            </span>
                                        ) : (
                                            <span>₩{job.hourlyRate.toLocaleString()} <span className="text-xs text-gray-400">/ 시</span></span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
                    ${job.isActive
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${job.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                        {job.isActive ? 'Active' : 'Archived'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(job)}
                                            className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition cursor-pointer flex items-center justify-center"
                                            title="Edit"
                                        >
                                            <i className="fas fa-edit text-sm"></i>
                                        </button>
                                        <button
                                            onClick={() => onArchive(job.id)}
                                            className="w-8 h-8 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition cursor-pointer flex items-center justify-center"
                                            title={job.isActive ? 'Archive' : 'Restore'}
                                        >
                                            <i className={`fas ${job.isActive ? 'fa-archive' : 'fa-undo'} text-sm`}></i>
                                        </button>
                                        <button
                                            onClick={() => onDelete(job.id)}
                                            className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition cursor-pointer flex items-center justify-center"
                                            title="Delete"
                                        >
                                            <i className="fas fa-trash text-sm"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {jobs.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fas fa-briefcase text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                        <p className="text-gray-500 dark:text-gray-400">No jobs found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
