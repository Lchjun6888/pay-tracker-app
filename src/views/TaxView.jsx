import React, { useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import { usePremium } from '../context/PremiumContext';
import { calculateMonthlyBreakdown, calculateFreelanceTax, formatKRW, KOREAN_LABOR } from '../utils/koreanLabor';
import PremiumModal from '../components/PremiumModal';

export default function TaxView() {
    const { isPremium } = usePremium();
    const { allJobs } = useJobs();
    const [premiumModalOpen, setPremiumModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('salary'); // 'salary' | 'freelance'

    const activeJobs = allJobs.filter(j => j.isActive);
    const salaryJobs = activeJobs.filter(j => !j.type || j.type === 'HOURLY' || j.type === 'SALARY');
    const freelanceJobs = activeJobs.filter(j => j.type === 'FREELANCE');

    // Calculate breakdowns for salary/hourly jobs
    const salaryBreakdowns = salaryJobs.map(job => ({
        job,
        breakdown: calculateMonthlyBreakdown({
            ...job,
            taxType: job.type === 'SALARY' ? 'INSURANCE' : (job.taxType || 'NONE')
        })
    }));

    // Calculate freelance tax
    const totalFreelanceIncome = freelanceJobs.reduce((sum, j) => sum + j.hourlyRate, 0);
    const freelanceTax = calculateFreelanceTax(totalFreelanceIncome);

    // Totals
    const totalGross = salaryBreakdowns.reduce((sum, s) => sum + s.breakdown.grossPay, 0) + totalFreelanceIncome;
    const totalTax = salaryBreakdowns.reduce((sum, s) => sum + s.breakdown.taxAmount, 0) + freelanceTax.withholdingTax;
    const totalNet = totalGross - totalTax;

    const handlePremiumClick = () => {
        if (!isPremium) setPremiumModalOpen(true);
    };

    // Generate monthly dummy data for annual chart (based on current month's data)
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const currentMonth = new Date().getMonth();

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                        <i className="fas fa-calculator text-white"></i>
                    </div>
                    세금 계산기
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">실수령액을 한눈에 확인하세요</p>
            </div>

            {/* Summary Cards — FREE */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <SummaryCard label="총 수입" value={formatKRW(totalGross)} icon="fa-wallet" gradient="from-blue-500 to-indigo-500" />
                <SummaryCard label="총 공제액" value={`-${formatKRW(totalTax)}`} icon="fa-receipt" gradient="from-red-400 to-rose-500" negative />
                <SummaryCard label="실수령액" value={formatKRW(totalNet)} icon="fa-hand-holding-usd" gradient="from-emerald-400 to-teal-500" highlight />
            </div>

            {/* Tab Toggle */}
            <div className="flex bg-gray-100 dark:bg-slate-800/80 p-1.5 rounded-2xl shadow-inner mb-6">
                <button
                    onClick={() => setSelectedTab('salary')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
                        ${selectedTab === 'salary'
                            ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-md'
                            : 'text-gray-500 dark:text-gray-400'}`}
                >
                    <i className="fas fa-building"></i>
                    급여 / 시급 ({salaryJobs.length})
                </button>
                <button
                    onClick={() => setSelectedTab('freelance')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
                        ${selectedTab === 'freelance'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md'
                            : 'text-gray-500 dark:text-gray-400'}`}
                >
                    <i className="fas fa-laptop-code"></i>
                    프리랜서 3.3% ({freelanceJobs.length})
                </button>
            </div>

            {/* FREE: Basic Tax Summary */}
            {selectedTab === 'salary' ? (
                <div className="space-y-4 mb-8">
                    {salaryBreakdowns.length === 0 ? (
                        <EmptyCard message="등록된 급여/시급 근무가 없습니다" />
                    ) : (
                        salaryBreakdowns.map(({ job, breakdown }) => (
                            <div key={job.id} className="bg-white dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/50 p-5 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                                        <i className={`${job.icon || 'fas fa-briefcase'} text-emerald-600 dark:text-emerald-400`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{job.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{job.company}</p>
                                    </div>
                                    <span className="ml-auto px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">
                                        {job.type === 'SALARY' ? '월급' : '시급'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <MiniStat label="총 급여" value={formatKRW(breakdown.grossPay)} />
                                    <MiniStat label="공제액" value={`-${formatKRW(breakdown.taxAmount)}`} negative />
                                    <MiniStat label="실수령" value={formatKRW(breakdown.netPay)} highlight />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="space-y-4 mb-8">
                    {freelanceJobs.length === 0 ? (
                        <EmptyCard message="등록된 프리랜서 프로젝트가 없습니다" />
                    ) : (
                        <>
                            {/* Individual project cards */}
                            {freelanceJobs.map(job => {
                                const tax = calculateFreelanceTax(job.hourlyRate);
                                return (
                                    <div key={job.id} className="bg-white dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/50 p-5 shadow-sm">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                                                <i className={`${job.icon || 'fas fa-laptop-code'} text-indigo-600 dark:text-indigo-400`}></i>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white">{job.title}</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{job.company}</p>
                                            </div>
                                            <span className="ml-auto px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-bold">
                                                3.3%
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <MiniStat label="계약금액" value={formatKRW(tax.totalIncome)} />
                                            <MiniStat label="원천징수 (3.3%)" value={`-${formatKRW(tax.withholdingTax)}`} negative />
                                            <MiniStat label="실수령" value={formatKRW(tax.netIncome)} highlight />
                                        </div>
                                    </div>
                                );
                            })}
                            {/* 5월 종소세 안내 */}
                            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4">
                                <div className="flex items-start gap-3">
                                    <i className="fas fa-info-circle text-amber-500 mt-0.5"></i>
                                    <div>
                                        <p className="font-bold text-amber-800 dark:text-amber-300 text-sm">5월 종합소득세 신고 안내</p>
                                        <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                                            3.3% 원천징수된 금액은 기납부세액입니다. 5월에 종합소득세를 신고하면 실제 소득에 따라 환급 받거나 추가 납부할 수 있습니다.
                                        </p>
                                        <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mt-2">
                                            총 수입금액: {formatKRW(freelanceTax.totalIncome)} | 기납부세액: {formatKRW(freelanceTax.withholdingTax)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* PREMIUM: Detailed Breakdown — Locked/Unlocked */}
            <div className="relative">
                {!isPremium && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl">
                        <button
                            onClick={handlePremiumClick}
                            className="flex flex-col items-center gap-3 cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                <i className="fas fa-crown text-white text-2xl"></i>
                            </div>
                            <div className="text-center">
                                <p className="font-black text-gray-900 dark:text-white">Premium 기능</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">탭하여 잠금 해제</p>
                            </div>
                        </button>
                    </div>
                )}

                <div className={`space-y-6 ${!isPremium ? 'pointer-events-none select-none' : ''}`}>
                    {/* Detailed Tax Breakdown Table */}
                    <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-gray-100 dark:border-slate-700/50 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="fas fa-chart-pie text-amber-500"></i>
                            <h2 className="font-black text-gray-900 dark:text-white">세금 상세 분석</h2>
                            {isPremium && <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold">PREMIUM</span>}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-slate-700">
                                        <th className="text-left py-3 px-2 text-xs font-bold text-gray-400 uppercase">항목</th>
                                        <th className="text-right py-3 px-2 text-xs font-bold text-gray-400 uppercase">요율</th>
                                        <th className="text-right py-3 px-2 text-xs font-bold text-gray-400 uppercase">월 공제액</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
                                    <TaxRow label="국민연금" rate="4.5%" amount={Math.floor(totalGross * 0.045)} />
                                    <TaxRow label="건강보험" rate="3.545%" amount={Math.floor(totalGross * 0.03545)} />
                                    <TaxRow label="장기요양보험" rate="0.46%" amount={Math.floor(totalGross * 0.0046)} />
                                    <TaxRow label="고용보험" rate="0.9%" amount={Math.floor(totalGross * 0.009)} />
                                    <tr className="font-bold">
                                        <td className="py-3 px-2 text-gray-900 dark:text-white">합계</td>
                                        <td className="py-3 px-2 text-right text-gray-900 dark:text-white">~9.4%</td>
                                        <td className="py-3 px-2 text-right text-red-500">{formatKRW(Math.floor(totalGross * 0.0945))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Annual Income Chart */}
                    <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-gray-100 dark:border-slate-700/50 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="fas fa-chart-bar text-amber-500"></i>
                            <h2 className="font-black text-gray-900 dark:text-white">연간 소득 추이</h2>
                            {isPremium && <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-bold">PREMIUM</span>}
                        </div>

                        <div className="flex items-end gap-1.5 h-40">
                            {months.map((m, i) => {
                                const isCurrentOrPast = i <= currentMonth;
                                const height = isCurrentOrPast ? (20 + Math.random() * 60) : 10;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div
                                            className={`w-full rounded-t-lg transition-all ${isCurrentOrPast
                                                ? 'bg-gradient-to-t from-emerald-500 to-teal-400'
                                                : 'bg-gray-100 dark:bg-slate-700'}`}
                                            style={{ height: `${height}%` }}
                                        ></div>
                                        <span className={`text-[9px] font-bold ${i === currentMonth ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                                            {m}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* PDF Export Button */}
                    <button
                        onClick={() => window.print()}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-sm hover:from-amber-600 hover:to-orange-600 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <i className="fas fa-file-pdf"></i>
                        PDF 급여명세서 다운로드
                    </button>
                </div>
            </div>

            {/* Premium Badge (if premium) */}
            {isPremium && (
                <div className="mt-6 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full">
                        <i className="fas fa-crown text-amber-500"></i>
                        <span className="text-sm font-bold text-amber-700 dark:text-amber-400">Premium 활성화됨</span>
                    </span>
                </div>
            )}

            <PremiumModal isOpen={premiumModalOpen} onClose={() => setPremiumModalOpen(false)} />
        </div>
    );
}

// Sub-components
function SummaryCard({ label, value, icon, gradient, negative, highlight }) {
    return (
        <div className={`rounded-2xl p-5 border shadow-sm ${highlight
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800/50'
            : 'bg-white dark:bg-slate-800/60 border-gray-100 dark:border-slate-700/50'}`}
        >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-3`}>
                <i className={`fas ${icon} text-white text-xs`}></i>
            </div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</p>
            <p className={`text-xl font-black mt-1 ${negative ? 'text-red-500' : highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                {value}
            </p>
        </div>
    );
}

function MiniStat({ label, value, negative, highlight }) {
    return (
        <div className="text-center">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-sm font-black ${negative ? 'text-red-500' : highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                {value}
            </p>
        </div>
    );
}

function TaxRow({ label, rate, amount }) {
    return (
        <tr>
            <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{label}</td>
            <td className="py-3 px-2 text-right text-gray-500 dark:text-gray-400">{rate}</td>
            <td className="py-3 px-2 text-right text-red-500 font-medium">{formatKRW(amount)}</td>
        </tr>
    );
}

function EmptyCard({ message }) {
    return (
        <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700/50 p-10 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center">
                <i className="fas fa-search text-gray-300 dark:text-gray-600 text-xl"></i>
            </div>
            <p className="text-gray-400 dark:text-gray-500 font-medium">{message}</p>
        </div>
    );
}
