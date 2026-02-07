import React, { useState } from 'react';
import { getCategoryLabel, getCategoryColor } from '../constants/jobConstants';

export default function JobCard({ job, onClick, onDelete }) {

    const handleDelete = (e) => {
        e.stopPropagation();
        if (confirm(`"${job.title}" 항목을 삭제하시겠습니까?`)) {
            onDelete(job.id);
        }
    };

    const isFreelance = job.type === 'FREELANCE';
    const isSalary = job.type === 'SALARY';

    return (
        <div
            onClick={() => onClick && onClick(job)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800 cursor-pointer group relative"
        >
            {/* Delete Button (Visible on mobile/hover on desktop) */}
            {onDelete && (
                <button
                    onClick={handleDelete}
                    className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-red-500/90 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600 shadow-lg"
                    title="삭제"
                >
                    <i className="fas fa-trash text-xs"></i>
                </button>
            )}

            {/* Image/Icon Area */}
            <div className={`relative h-28 sm:h-32 bg-gradient-to-br flex items-center justify-center
        ${isFreelance
                    ? 'from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50'
                    : isSalary
                        ? 'from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50'
                        : 'from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600'}`}>

                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i className={`${job.icon || 'fas fa-briefcase'} text-xl sm:text-2xl ${isFreelance ? 'text-indigo-500' : isSalary ? 'text-green-500' : 'text-primary-500'}`}></i>
                </div>

                {/* Rate Badge */}
                <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shadow
          ${isFreelance ? 'bg-indigo-500' : isSalary ? 'bg-green-500' : 'bg-primary-500'}`}>
                    {isFreelance
                        ? `₩${(job.hourlyRate / 1000).toFixed(0)}K/건`
                        : isSalary
                            ? (job.salaryType === 'ANNUAL' ? `₩${(job.hourlyRate / 10000).toFixed(0)}만/연` : `₩${(job.hourlyRate / 10000).toFixed(0)}만/월`)
                            : `₩${(job.hourlyRate / 1000).toFixed(0)}K/시`}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
                {/* Category Tag */}
                <span className={`inline-block text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md mb-1.5 sm:mb-2 ${getCategoryColor(job.category)}`}>
                    {getCategoryLabel(job.category)}
                </span>

                {/* Title & Company */}
                <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-lg leading-tight line-clamp-1">{job.title}</h3>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5">
                    {isFreelance && <i className="fas fa-user-circle text-[10px]"></i>}
                    <span className="line-clamp-1">{job.company}</span>
                </div>

                {/* Next Shift / Deadline */}
                {job.nextShift && (
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-slate-700">
                        <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                            {isFreelance ? '제출일(마감)' : isSalary ? '급여일' : '다음 근무'}
                        </p>
                        <p className={`text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-1.5 line-clamp-1
              ${isFreelance ? 'text-indigo-600 dark:text-indigo-400' : isSalary ? 'text-green-600 dark:text-green-400' : 'text-primary-600 dark:text-primary-400'}`}>
                            <i className={`fas ${isFreelance ? 'fa-flag-checkered' : isSalary ? 'fa-coins' : 'fa-clock'} text-[10px] sm:text-xs`}></i>
                            {job.nextShift}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
