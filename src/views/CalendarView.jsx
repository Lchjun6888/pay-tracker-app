import React, { useState } from 'react';
import { generateICS, shareOrDownloadICS } from '../utils/icsGenerator';

export default function CalendarView({ jobs = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const days = ['일', '월', '화', '수', '목', '금', '토'];

    // Month Navigation
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    const handleExport = async () => {
        const icsContent = generateICS(jobs, currentDate);
        const filename = `schedule_${currentDate.getFullYear()}_${currentDate.getMonth() + 1}.ics`;

        await shareOrDownloadICS(icsContent, filename);
    };

    const currentMonthLabel = currentDate.toLocaleString('ko-KR', { month: 'long', year: 'numeric' });

    // Generate Calendar
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startPadding = firstDay.getDay(); // 0 (Sun) ~ 6 (Sat)
    const totalDays = lastDay.getDate();

    const calendarDays = [];
    for (let i = 0; i < startPadding; i++) calendarDays.push(null);
    for (let i = 1; i <= totalDays; i++) calendarDays.push(i);

    // Helper: Get jobs for a specific date
    const getJobsForDate = (day) => {
        if (!day) return [];
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayOfWeek = date.getDay(); // 0(Sun) - 6(Sat)

        const dayMap = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' };
        const dayId = dayMap[dayOfWeek];

        return jobs.filter(job => {
            // Only HOURLY jobs have weekly schedules for now
            if (job.type === 'HOURLY' || !job.type) {
                return job.schedule?.days?.includes(dayId);
            }
            return false;
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'HOSPITALITY': 'bg-amber-500',
            'EDUCATION': 'bg-green-500',
            'GIG ECONOMY': 'bg-emerald-500',
            'RETAIL': 'bg-blue-500',
            'OFFICE': 'bg-purple-500',
            'DESIGN': 'bg-pink-500',
            'MEDIA': 'bg-rose-500',
            'CONSTRUCTION': 'bg-stone-500',
            'FREELANCE': 'bg-indigo-500'
        };
        return colors[category] || 'bg-primary-500';
    };

    // Calculate daily jobs for the selected date
    const selectedJobs = selectedDate ? getJobsForDate(selectedDate) : [];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">캘린더</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">월별 근무 일정을 확인하세요</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Section */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 sm:p-6">
                    {/* Month Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <button onClick={prevMonth} className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white min-w-[100px] text-center">{currentMonthLabel}</h2>
                            <button onClick={nextMonth} className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>

                        <button
                            onClick={handleExport}
                            className="text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-3 py-1.5 rounded-lg transition border border-primary-200 dark:border-primary-800 flex items-center gap-1.5"
                            title="현재 월 일정을 캘린더 파일(.ics)로 내려받습니다"
                        >
                            <i className="fas fa-download"></i>
                            <span className="hidden sm:inline">캘린더 내보내기</span>
                            <span className="sm:hidden">내보내기</span>
                        </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                        {days.map((day, idx) => (
                            <div key={day} className={`text-center text-xs sm:text-sm font-semibold py-2 ${idx === 0 ? 'text-red-400' : idx === 6 ? 'text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                        {calendarDays.map((day, index) => {
                            const dailyJobs = getJobsForDate(day);
                            const hasJobs = dailyJobs.length > 0;
                            const isToday = day === new Date().getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear();
                            const isSelected = day === selectedDate;

                            return (
                                <div
                                    key={index}
                                    onClick={() => day && setSelectedDate(day)}
                                    className={`aspect-square relative flex items-center justify-center rounded-xl text-sm font-medium transition cursor-pointer border
                                        ${day === null ? 'border-transparent cursor-default' :
                                            isSelected
                                                ? 'bg-primary-600 text-white border-primary-600 shadow-md transform scale-105 z-10'
                                                : isToday
                                                    ? 'bg-white dark:bg-slate-800 text-primary-600 border-primary-500 ring-1 ring-primary-500'
                                                    : hasJobs
                                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-gray-900 dark:text-white border-transparent hover:bg-primary-100 dark:hover:bg-primary-900/40'
                                                        : 'bg-white dark:bg-slate-800 text-gray-400 dark:text-gray-500 border-transparent hover:bg-gray-50 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {day}
                                    {/* Job Indicator Dots */}
                                    {hasJobs && day && (
                                        <div className="absolute bottom-1.5 sm:bottom-2 flex gap-0.5 sm:gap-1">
                                            {dailyJobs.slice(0, 3).map((job, i) => (
                                                <div key={i} className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isSelected ? 'bg-white/70' : getCategoryColor(job.category)}`}></div>
                                            ))}
                                            {dailyJobs.length > 3 && (
                                                <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isSelected ? 'bg-white/70' : 'bg-gray-300'}`}></div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Details Section (Widget Style) */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 flex flex-col h-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        {selectedDate ? `${selectedDate}일 일정` : '상세 일정'}
                    </h3>

                    {!selectedDate ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 py-10">
                            <i className="fas fa-calendar-day text-4xl mb-3 opacity-30"></i>
                            <p className="text-sm">날짜를 선택하여<br />근무 일정을 확인하세요.</p>
                        </div>
                    ) : selectedJobs.length > 0 ? (
                        <div className="space-y-3 overflow-y-auto max-h-[400px]">
                            {selectedJobs.map(job => (
                                <div key={job.id} className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600 transition hover:shadow-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-600 shadow-sm text-lg
                                            ${job.type === 'FREELANCE' ? 'text-indigo-500' : 'text-primary-500'}`}>
                                            <i className={job.icon || 'fas fa-briefcase'}></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{job.title}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{job.company}</p>
                                        </div>
                                    </div>

                                    {/* Time info if available */}
                                    <div className="flex items-center justify-between text-xs sm:text-sm mt-2 pt-2 border-t border-gray-200 dark:border-slate-600/50">
                                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                                            <i className="far fa-clock"></i>
                                            {job.schedule?.details?.[['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).getDay()]] ? (
                                                <span>
                                                    {job.schedule.details[['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).getDay()]].start}
                                                    ~
                                                    {job.schedule.details[['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).getDay()]].end}
                                                </span>
                                            ) : (
                                                <span>시간 정보 없음</span>
                                            )}
                                        </div>
                                        <span className="font-bold text-primary-600 dark:text-primary-400">
                                            ₩{(job.hourlyRate / 1000).toFixed(0)}K
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 py-10">
                            <i className="fas fa-mug-hot text-3xl mb-3 opacity-30"></i>
                            <p className="text-sm">일정이 없는 날입니다.<br />푹 쉬세요!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
