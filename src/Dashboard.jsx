import React, { useState, useMemo } from 'react';
import JobCard from './components/JobCard';
import AddJobCard from './components/AddJobCard';
import CalendarView from './views/CalendarView';
import RewardGoalCard from './components/RewardGoalCard';
import DataManagementCard from './components/DataManagementCard';

export default function Dashboard({ jobs, stats, filter, setFilter, onAddClick, onJobClick, onDeleteJob, searchQuery, userInfo }) {
    const [viewMode, setViewMode] = useState('HOURLY');

    const AVATAR_OPTIONS = [
        { id: 'dog', emoji: '🐶' },
        { id: 'cat', emoji: '🐱' },
        { id: 'rabbit', emoji: '🐰' },
        { id: 'hamster', emoji: '🐹' },
        { id: 'bear', emoji: '🐻' },
        { id: 'fox', emoji: '🦊' },
    ];

    const userAvatar = AVATAR_OPTIONS.find(a => a.id === userInfo?.avatar) || AVATAR_OPTIONS[0];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW',
            maximumFractionDigits: 0
        }).format(value);
    };

    const motivationMessage = useMemo(() => {
        const messages = [
            "오늘의 노력이 내일의 자유를 만듭니다. 💪",
            "차곡차곡 쌓이는 정산액, 정말 멋져요! ✨",
            "가장 빛나는 투자는 당신의 시간입니다. 🌟",
            "효율적인 관리로 더 여유로운 하루를! ☕",
            "꿈을 향한 한 걸음, PayTrack이 함께합니다. 🚀"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }, []);

    const displayedJobs = jobs.filter(job => {
        if (viewMode === 'CALENDAR') return true;
        if (viewMode === 'HOURLY') return (!job.type || job.type === 'HOURLY' || job.type === 'SALARY');
        if (viewMode === 'FREELANCE') return job.type === 'FREELANCE';
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
            {/* Mobile Top Navigation Tabs */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl pt-4 pb-3 mb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="flex bg-gray-100 dark:bg-slate-800/80 p-1.5 rounded-2xl shadow-inner">
                    <button
                        onClick={() => setViewMode('CALENDAR')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
                            ${viewMode === 'CALENDAR'
                                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-md scale-[1.02]'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        <i className="fas fa-calendar-alt"></i>
                        <span className="hidden sm:inline">월간</span> 캘린더
                    </button>
                    <button
                        onClick={() => setViewMode('HOURLY')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
                            ${viewMode === 'HOURLY'
                                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-md scale-[1.02]'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        <i className="fas fa-briefcase"></i>
                        근무 (고정)
                    </button>
                    <button
                        onClick={() => setViewMode('FREELANCE')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
                            ${viewMode === 'FREELANCE'
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-md scale-[1.02]'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        <i className="fas fa-laptop-code"></i>
                        프리랜서
                    </button>
                </div>
            </div>

            {/* Welcome Greeting */}
            <div className="mb-6 animate-fadeIn">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    {userAvatar.emoji} 안녕하세요, <span className="text-primary-500">{userInfo?.name || '회원'}</span>님!
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">오늘도 멋진 하루 되세요!</p>
            </div>

            {/* Motivation Banner */}
            {viewMode !== 'CALENDAR' && (
                <div className="mb-8 animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 opacity-80">
                            {motivationMessage}
                        </p>
                    </div>
                    <RewardGoalCard currentTotalPay={viewMode === 'FREELANCE' ? stats.pendingIncome : stats.monthlyIncome} />
                </div>
            )}

            {/* Header Title Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                        {viewMode === 'CALENDAR' ? '일정 캘린더' :
                            viewMode === 'HOURLY' ? '고정 수입 관리' : '외주 & 프로젝트'}
                        {searchQuery && (
                            <span className="text-base font-normal text-gray-400 dark:text-gray-500 ml-2">
                                / "{searchQuery}"
                            </span>
                        )}
                    </h1>
                </div>

                <button
                    onClick={onAddClick}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl shadow-lg shadow-primary-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer text-sm font-bold text-white
                        ${viewMode === 'FREELANCE' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-primary-500 hover:bg-primary-600'}`}
                >
                    <i className="fas fa-plus"></i>
                    <span>{viewMode === 'FREELANCE' ? '외주 추가' : '직업 추가'}</span>
                </button>
            </div>

            {/* Main Stats (Conditional Rendering for cleaner look) */}
            {viewMode !== 'CALENDAR' && (
                <div className="bg-white dark:bg-slate-800/40 rounded-3xl p-6 mb-8 border border-gray-100 dark:border-slate-700/50 shadow-sm">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        {/* Summary Section */}
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                {viewMode === 'FREELANCE' ? '진행중인 외주 총액' : '예상 실질 수령액'}
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                                {formatCurrency(viewMode === 'FREELANCE' ? stats.pendingIncome : stats.monthlyIncome)}
                            </h2>
                        </div>

                        {/* Breakdown Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 flex-1 lg:max-w-2xl">
                            {viewMode === 'HOURLY' ? (
                                <>
                                    <StatItem label="평균 시급" value={formatCurrency(stats.avgHourly)} icon="fa-coins" />
                                    <StatItem label="활성 근무" value={`${stats.activeHourly}개`} icon="fa-check-circle" />
                                    <StatItem label="주간 시간" value={`${stats.totalHours}h`} icon="fa-clock" />
                                </>
                            ) : (
                                <>
                                    <StatItem label="활성 프로젝트" value={`${stats.activeProjects}건`} icon="fa-project-diagram" />
                                    <StatItem label="가장 빠른 마감" value={stats.nextDeadline || '-'} icon="fa-calendar-check" />
                                    <StatItem label="완료 대기" value={`${stats.archivedJobs?.length || 0}건`} icon="fa-archive" opacity="opacity-50" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Tabs */}
            {viewMode !== 'CALENDAR' && (
                <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
                    <FilterButton active={filter === 'all'} label="전체" count={displayedJobs.length} onClick={() => setFilter('all')} />
                    <FilterButton active={filter === 'active'} label="진행중" onClick={() => setFilter('active')} />
                    <FilterButton active={filter === 'archived'} label="보관됨" onClick={() => setFilter('archived')} />
                </div>
            )}

            {/* Content Area */}
            {viewMode === 'CALENDAR' ? (
                <div className="animate-fadeIn">
                    <CalendarView jobs={jobs} />
                </div>
            ) : (
                <div className="animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {displayedJobs.map(job => (
                            <JobCard key={job.id} job={job} onClick={onJobClick} onDelete={onDeleteJob} />
                        ))}
                        <AddJobCard onClick={onAddClick} />
                    </div>

                    {displayedJobs.length === 0 && (
                        <EmptyState message={searchQuery ? `"${searchQuery}" 결과가 없습니다.` : "아직 등록된 항목이 없습니다."} />
                    )}

                    <DataManagementCard jobs={jobs} />
                </div>
            )}

            <footer className="mt-20 py-10 border-t border-gray-100 dark:border-slate-800 text-center">
                <p className="text-sm font-medium text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2">
                    Made with <i className="fas fa-heart text-rose-500"></i> for PayTrackers
                </p>
                <p className="text-[11px] text-gray-400 mt-1 opacity-60 uppercase tracking-widest font-bold">© 2026 PayTrack. v2.0</p>
            </footer>
        </div>
    );
}

// Sub-components for cleaner internal structure
function StatItem({ label, value, icon, opacity = "" }) {
    return (
        <div className={`space-y-1 ${opacity}`}>
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <i className={`fas ${icon} text-[10px]`}></i>
                <p className="text-[10px] font-bold uppercase tracking-wider">{label}</p>
            </div>
            <p className="text-lg font-black text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    );
}

function FilterButton({ active, label, onClick, count }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap
                ${active
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
        >
            {label} {count !== undefined && <span className="ml-1 opacity-50">{count}</span>}
        </button>
    );
}

function EmptyState({ message }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-folder-open text-gray-300 dark:text-gray-600 text-2xl"></i>
            </div>
            <p className="text-gray-400 dark:text-gray-500 font-medium">{message}</p>
        </div>
    );
}

