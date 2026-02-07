import React from 'react';
import { calculateMonthlyBreakdown, calculateFreelanceTax, formatKRW, checkMinimumWage } from '../utils/koreanLabor';

export default function JobDetailModal({ job, isOpen, onClose, onEdit }) {
    if (!isOpen || !job) return null;

    const isFreelance = job.type === 'FREELANCE';

    // Enhanced job for calculation
    const enhancedJob = {
        ...job,
        hoursPerWeek: job.hoursPerWeek || 20,
        nightHoursPerWeek: job.nightHoursPerWeek || 0,
        mealAllowance: job.mealAllowance || 0,
        taxType: job.taxType || 'NONE',
    };

    const wageCheck = checkMinimumWage(job.hourlyRate);

    // Calculate Breakdown based on Type
    let breakdown = null;
    let freelanceTax = null;

    if (isFreelance) {
        freelanceTax = calculateFreelanceTax(job.hourlyRate); // HourlyRate is TaskPrice here
    } else {
        breakdown = calculateMonthlyBreakdown(enhancedJob);
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header with Image/Icon */}
                <div className={`relative h-28 bg-gradient-to-br ${isFreelance ? 'from-indigo-400 to-indigo-600' : 'from-primary-400 to-primary-600'}`}>
                    {job.imageUrl ? (
                        <img src={job.imageUrl} alt={job.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                                <i className={`${job.icon || 'fas fa-briefcase'} text-2xl ${isFreelance ? 'text-indigo-500' : 'text-primary-500'}`}></i>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition cursor-pointer"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${job.categoryColor}`}>
                        {job.category}
                    </span>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{job.company}</p>
                    </div>

                    {/* ============ HOURLY VIEW ============ */}
                    {!isFreelance && breakdown && (
                        <>
                            {/* Gross vs Net Visual */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">세전 월급</p>
                                    <p className="text-lg font-bold text-gray-600 dark:text-gray-300">{formatKRW(breakdown.grossPay)}</p>
                                </div>
                                <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-3 border border-primary-100 dark:border-primary-800 text-center">
                                    <p className="text-xs text-primary-600 dark:text-primary-400 uppercase font-semibold">실수령액 (세후)</p>
                                    <p className="text-xl font-bold text-primary-700 dark:text-primary-300">{formatKRW(breakdown.netPay)}</p>
                                </div>
                            </div>

                            {/* Deduction Info */}
                            <div className="mb-4 text-center">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                    ${breakdown.taxRate > 0 ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-gray-600'}`}>
                                    <i className="fas fa-percent mr-1"></i>
                                    {enhancedJob.taxType === 'BUSINESS' ? '3.3% 사업소득세 적용' :
                                        enhancedJob.taxType === 'INSURANCE' ? '4대보험 (~9.4%) 적용' : '세금 미적용'}
                                    {breakdown.taxAmount > 0 && ` (-${formatKRW(breakdown.taxAmount)})`}
                                </span>
                            </div>

                            {/* Monthly Breakdown Detail */}
                            {/* Monthly Breakdown Detail */}
                            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 mb-4">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                                    <i className="fas fa-list-ul text-gray-400 mr-2"></i>급여 상세
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {job.type === 'SALARY' ? '월 기본급 (세전)' : `기본급 (시급 ${formatKRW(job.hourlyRate)})`}
                                        </span>
                                        <span className="font-medium">{formatKRW(breakdown.basePay)}</span>
                                    </div>
                                    {breakdown.weeklyHolidayPay > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">주휴수당</span>
                                            <span className="font-medium text-green-600">{formatKRW(breakdown.weeklyHolidayPay)}</span>
                                        </div>
                                    )}
                                    {breakdown.nightPay > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">야간수당</span>
                                            <span className="font-medium text-purple-600">{formatKRW(breakdown.nightPay)}</span>
                                        </div>
                                    )}
                                    {breakdown.overtimePay > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">연장수당</span>
                                            <span className="font-medium text-orange-600">{formatKRW(breakdown.overtimePay)}</span>
                                        </div>
                                    )}
                                    {breakdown.mealAllowance > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">식비 (비과세)</span>
                                            <span className="font-medium text-blue-600">{formatKRW(breakdown.mealAllowance)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-100 dark:border-slate-700 my-2"></div>
                                    <div className="flex justify-between text-red-500">
                                        <span>공제액 (세금/보험)</span>
                                        <span>-{formatKRW(breakdown.taxAmount)}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ============ FREELANCE VIEW ============ */}
                    {isFreelance && freelanceTax && (
                        <>
                            {/* Payment Details */}
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 mb-4 text-center">
                                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase mb-1">총 계약 금액</p>
                                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{formatKRW(freelanceTax.totalIncome)}</p>
                            </div>

                            {/* Tax Report Guide */}
                            <div className="bg-white dark:bg-slate-800 border-l-4 border-indigo-500 shadow-sm rounded-r-xl p-4 mb-4">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                    <i className="fas fa-file-invoice-dollar text-indigo-500 mr-2"></i>
                                    5월 종합소득세 신고 안내
                                </h3>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-700/50 p-2 rounded-lg">
                                        <span className="text-gray-600 dark:text-gray-300">신고 대상 금액</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{formatKRW(freelanceTax.reportTarget)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400 text-xs">· 기납부 세액 (3.3% 원천징수 가정)</span>
                                        <span className="text-gray-500 dark:text-gray-400 text-xs">{formatKRW(freelanceTax.withholdingTax)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400 text-xs">· 실수령 예상액</span>
                                        <span className="font-semibold text-indigo-500 text-xs">{formatKRW(freelanceTax.netIncome)}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2">
                                    * 위 금액은 단순 3.3% 공제 기준이며, 실제 신고 시 필요경비에 따라 납부/환급액이 달라질 수 있습니다.
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 mb-4">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">의뢰 정보</h3>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">마감일</span>
                                    <span className="font-medium text-red-500">{job.nextShift}</span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => onEdit(job)}
                            className={`flex-1 text-white font-semibold py-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-2
                ${isFreelance ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-primary-500 hover:bg-primary-600'}`}
                        >
                            <i className="fas fa-edit"></i> 수정
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition cursor-pointer"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
