import React, { useState } from 'react';
import JobCard from './components/JobCard';
import AddJobCard from './components/AddJobCard';
import CalendarView from './views/CalendarView';

export default function Dashboard({ jobs, stats, filter, setFilter, onAddClick, onJobClick, onDeleteJob, searchQuery }) {
    const [viewMode, setViewMode] = useState('HOURLY'); // 'CALENDAR', 'HOURLY', 'FREELANCE'

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
            maximumFractionDigits: 0
        }).format(value);
    };

    // Filter jobs explicitly by viewMode
    const displayedJobs = jobs.filter(job => {
        if (viewMode === 'CALENDAR') return true; // Calendar handles filtering internally or we pass all
        // If HOURLY mode, show jobs that are HOURLY or SALARY or undefined (legacy)
        if (viewMode === 'HOURLY') return (!job.type || job.type === 'HOURLY' || job.type === 'SALARY');
        // If FREELANCE mode, show FREELANCE jobs
        if (viewMode === 'FREELANCE') return job.type === 'FREELANCE';
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Mobile Top Navigation Tabs */}
            <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 pt-4 pb-2 mb-4 px-1">
                <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl shadow-sm">
                    <button
                        onClick={() => setViewMode('CALENDAR')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2
                            ${viewMode === 'CALENDAR'
                                ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        <i className="fas fa-calendar-alt"></i>
                        캘린더
                    </button>
                    <button
                        onClick={() => setViewMode('HOURLY')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2
                            ${viewMode === 'HOURLY'
                                ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        <i className="fas fa-briefcase"></i>
                        근무 (고정)
                    </button>
                    <button
                        onClick={() => setViewMode('FREELANCE')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2
                            ${viewMode === 'FREELANCE'
                                ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        <i className="fas fa-laptop-code"></i>
                        프리랜서
                    </button>
                </div>
            </div>

            {/* Header Title (Optional, simplified for mobile as tabs take prominence) */}
            <div className="flex justify-between items-center mb-6 px-1">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        {viewMode === 'CALENDAR' ? '월간 근무 일정' :
                            viewMode === 'HOURLY' ? '내 직업 (알바/직장)' : '프리랜서 / 외주'}
                        {searchQuery && (
                            <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">
                                · "{searchQuery}"
                            </span>
                        )}
                    </h1>
                </div>

                <button
                    onClick={onAddClick}
                    className={`px-4 py-2 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer text-sm font-semibold text-white
                        ${viewMode === 'FREELANCE' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-primary-500 hover:bg-primary-600'}`}
                >
                    <i className="fas fa-plus"></i>
                    <span className="hidden sm:inline">{viewMode === 'FREELANCE' ? '외주 추가' : '직업 추가'}</span>
                    <span className="sm:hidden">추가</span>
                </button>
            </div>

            {/* Stats Card - Always visible or conditional? Keeping for now but maybe simplified logic needed if Calendar */}
            {viewMode !== 'CALENDAR' && (
                <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border 
                    ${viewMode === 'FREELANCE'
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30'
                        : 'bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700'}`}>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
                        {/* Main Stat */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
                  ${viewMode === 'FREELANCE' ? 'bg-indigo-100 dark:bg-indigo-800' : 'bg-primary-100 dark:bg-primary-900/50'}`}>
                                <i className={`text-lg sm:text-xl ${viewMode === 'FREELANCE'
                                    ? 'fas fa-money-check-alt text-indigo-600 dark:text-indigo-400'
                                    : 'fas fa-wallet text-primary-600 dark:text-primary-400'}`}></i>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    {viewMode === 'FREELANCE' ? '진행 중 외주 총액' : '예상 월수입 (합계)'}
                                </p>
                                <div className="flex items-baseline gap-2 sm:gap-3">
                                    <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(viewMode === 'FREELANCE' ? stats.pendingIncome : stats.monthlyIncome)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Sub Stats - Grid */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 w-full lg:w-auto">
                            {viewMode === 'HOURLY' ? (
                                <>
                                    <div className="text-center sm:text-left">
                                        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">평균 시급 (알바)</p>
                                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-0.5 sm:mt-1">{formatCurrency(stats.avgHourly)}</p>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">활성 근무</p>
                                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-0.5 sm:mt-1">{stats.activeHourly}개</p>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">주간 시간 (알바)</p>
                                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-0.5 sm:mt-1">{stats.totalHours}시간</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-center sm:text-left">
                                        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">활성 프로젝트</p>
                                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-0.5 sm:mt-1">{stats.activeProjects}건</p>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">다음 마감</p>
                                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-0.5 sm:mt-1 truncate max-w-[100px] sm:max-w-none">{stats.nextDeadline || '-'}</p>
                                    </div>
                                    <div className="text-center sm:text-left opacity-0">
                                        {/* Spacer */}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Tabs - Only show in List Views */}
            {viewMode !== 'CALENDAR' && (
                <div className="flex items-center gap-0.5 sm:gap-1 mb-4 sm:mb-6 border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap
                ${filter === 'all'
                                ? 'text-gray-900 dark:text-white border-b-2 border-primary-500'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        <i className="fas fa-th"></i> 전체
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap
                ${filter === 'active'
                                ? 'text-gray-900 dark:text-white border-b-2 border-primary-500'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        <i className="fas fa-bolt"></i> 진행중
                    </button>
                    <button
                        onClick={() => setFilter('archived')}
                        className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap
                ${filter === 'archived'
                                ? 'text-gray-900 dark:text-white border-b-2 border-primary-500'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        <i className="fas fa-archive"></i> 완료/종료
                    </button>
                </div>
            )}

            {/* Views Content */}
            {viewMode === 'CALENDAR' ? (
                <CalendarView jobs={jobs} />
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                        {displayedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onClick={onJobClick}
                                onDelete={onDeleteJob}
                            />
                        ))}
                        <AddJobCard onClick={onAddClick} />
                    </div>

                    {displayedJobs.length === 0 && !searchQuery && (
                        <div className="text-center py-8 sm:py-12">
                            <i className={`fas ${viewMode === 'FREELANCE' ? 'fa-laptop-code' : 'fa-briefcase'} text-4xl sm:text-5xl text-gray-300 dark:text-gray-600 mb-4`}></i>
                            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                                {viewMode === 'FREELANCE' ? '진행 중인 외주가 없습니다.' : '등록된 알바가 없습니다.'}
                            </p>
                        </div>
                    )}

                    {displayedJobs.length === 0 && searchQuery && (
                        <div className="text-center py-8 sm:py-12">
                            <i className="fas fa-search text-4xl sm:text-5xl text-gray-300 dark:text-gray-600 mb-4"></i>
                            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">"{searchQuery}" 검색 결과가 없습니다</p>
                        </div>
                    )}
                </>
            )}

            {/* Footer */}
            <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-slate-700 text-center">
                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                    © 2026 Job Tracker. 알바생 & 프리랜서를 위해 💪
                </p>
            </footer>
        </div>
    );
}
