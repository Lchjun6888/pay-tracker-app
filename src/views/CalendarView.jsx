import React, { useState } from 'react';

export default function CalendarView({ jobs }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayMap = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getDaysArray = () => {
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        // Days of current month
        for (let i = 1; i <= totalDays; i++) {
            days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        return days;
    };

    const getDailyJobs = (date) => {
        if (!date) return [];
        const dayOfWeek = date.getDay(); // 0-6

        return jobs.filter(job => {
            if (job.type === 'FREELANCE') {
                // Determine if freelance job falls on this date (e.g. deadline)
                // For simplicity, maybe just show deadline
                return false;
            }
            // For Hourly/Salary, check schedule
            if (job.schedule && job.schedule.days) {
                // job.schedule.days is array like ['MON', 'WED']
                // Check if map value matches dayOfWeek
                return job.schedule.days.some(d => dayMap[d] === dayOfWeek);
            }
            return false;
        });
    };

    const days = getDaysArray();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition text-gray-600 dark:text-gray-300">
                    <i className="fas fa-chevron-left"></i>
                </button>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition text-gray-600 dark:text-gray-300">
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {weekDays.map((day, idx) => (
                    <div key={day} className={`text-center text-xs sm:text-sm font-semibold py-2 ${idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {days.map((date, idx) => {
                    if (!date) return <div key={`empty-${idx}`} className="aspect-square"></div>;

                    const dailyJobs = getDailyJobs(date);
                    const isToday = new Date().toDateString() === date.toDateString();

                    return (
                        <div key={idx} className={`aspect-square rounded-xl border ${isToday ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-50 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50'} p-1 sm:p-2 flex flex-col items-center justify-start relative`}>
                            <span className={`text-xs sm:text-sm font-medium ${isToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                {date.getDate()}
                            </span>

                            <div className="flex flex-wrap justify-center gap-1 mt-1 w-full">
                                {dailyJobs.slice(0, 4).map((job, jIdx) => (
                                    <div
                                        key={job.id}
                                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${job.type === 'SALARY' ? 'bg-green-500' : 'bg-primary-500'}`}
                                        title={job.title}
                                    />
                                ))}
                                {dailyJobs.length > 4 && (
                                    <span className="text-[8px] text-gray-400">+</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                    <span>알바</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>직장</span>
                </div>
            </div>
        </div>
    );
}
