import React from 'react';

export default function AddJobCard({ onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 border-dashed border-gray-200 dark:border-slate-700 overflow-hidden transition hover:border-primary-300 dark:hover:border-primary-700 cursor-pointer flex flex-col items-center justify-center min-h-[200px] sm:min-h-[240px] group"
        >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition">
                <i className="fas fa-plus text-gray-400 dark:text-gray-500 text-lg sm:text-xl group-hover:text-primary-500 transition"></i>
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary-500 transition">새 알바 추가</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">새로운 알바 등록하기</span>
        </div>
    );
}
