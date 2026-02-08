import React, { useState } from 'react';

const ContractHub = () => {
    const [viewAs, setViewAs] = useState('worker'); // 'employer' or 'worker'

    // Milestones Data
    const milestones = [
        { id: 1, title: 'Milestone 1: 와이어프레임', amount: 1500000, status: 'paid' },
        { id: 2, title: 'Milestone 2: UI 시안', amount: 1500000, status: 'paid' },
        { id: 3, title: 'Milestone 3: 최종 프로토타입', amount: 2000000, status: 'upcoming' },
    ];

    // Activity Feed Data (grouped by date)
    const activityFeed = [
        {
            date: 'TODAY', items: [
                { id: 1, type: 'success', title: '지급 완료', desc: '2차 마일스톤 1,500,000원이 이프리님께 성공적으로 이체되었습니다.', time: '오후 2:45' },
                { id: 2, type: 'approved', title: '지급 승인', desc: '김대표님이 \"UI 시안\" 지급 요청을 승인했습니다.', time: '오전 11:20' },
            ]
        },
        {
            date: 'YESTERDAY', items: [
                { id: 3, type: 'request', title: '지급 요청', desc: '이프리님이 마일스톤 2 완료 후 1,500,000원을 요청했습니다.', time: '오후 5:10', hasAction: true },
            ]
        },
        {
            date: '2026년 2월 1일', items: [
                { id: 4, type: 'success', title: '마일스톤 1 완료', desc: '이프리님이 12개의 에셋을 공유 workspace에 업로드했습니다.', time: '오후 3:00' },
            ]
        },
    ];

    const [totalValue, setTotalValue] = useState(5000000);
    const [released, setReleased] = useState(3000000);
    const [inEscrow, setInEscrow] = useState(2000000); // Funds held in escrow
    const progressPercent = (released / totalValue) * 100;

    const handleReleaseFunds = () => {
        if (inEscrow <= 0) {
            alert('에스크로에 예치된 잔액이 없습니다.');
            return;
        }

        const amountStr = prompt(`현재 에스크로 보관 금액: ${inEscrow.toLocaleString()}원\n작업자에게 승인(지급)할 금액을 입력하세요:`, inEscrow);
        if (!amountStr) return;

        const amount = parseInt(amountStr.replace(/,/g, ''), 10);
        if (isNaN(amount) || amount <= 0) {
            alert('올바른 금액을 입력해주세요.');
            return;
        }

        if (amount > inEscrow) {
            alert('에스크로 잔액을 초과할 수 없습니다.');
            return;
        }

        if (window.confirm(`${amount.toLocaleString()}원을 작업자에게 지급 승인하시겠습니까?\n(승인 즉시 인출 가능해집니다)`)) {
            setInEscrow(prev => prev - amount);
            setReleased(prev => prev + amount);
            alert(`${amount.toLocaleString()}원이 지급 승인되었습니다!`);
        }
    };

    const handleCancelContract = () => {
        if (window.confirm('계약 파기를 요청하시겠습니까?\n\n안전한 거래를 위해 양측(작업자/클라이언트)의 상호 동의가 필요합니다.\n동의 시 에스크로 금액은 환불 규정에 따라 반환됩니다.')) {
            const reason = prompt('취소 사유를 입력해주세요 (상대방에게 전송됨):');
            if (reason) {
                alert('계약 종료 요청이 상대방에게 전송되었습니다.\n상대방이 동의하면 계약이 종료됩니다.');
            }
        }
    };

    const handleMessage = () => {
        const msg = prompt('메시지를 입력하세요:');
        if (msg) {
            alert('메시지가 전송되었습니다.');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Contract Details */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-full font-bold uppercase">Active Contract</span>
                        <span className="text-sm text-slate-500">Started Feb 1, 2026</span>
                    </div>
                </div>

                {/* Contract Info */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex -space-x-2">
                        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">김</div>
                        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm bg-green-500 flex items-center justify-center text-white"><i className="fas fa-check text-sm"></i></div>
                        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-lg">이</div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">UI 디자인 스프린트</h2>
                        <p className="text-sm text-slate-500">김대표 (Employer) & 이프리 (Freelancer)</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-center">
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">TOTAL VALUE</p>
                        <p className="font-mono font-bold text-xl text-slate-900 dark:text-white">{totalValue.toLocaleString()}원</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl text-center border-l-4 border-green-500">
                        <p className="text-xs text-green-600 uppercase tracking-wider mb-1">RELEASED (지급)</p>
                        <p className="font-mono font-bold text-xl text-green-600">{released.toLocaleString()}원</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl text-center">
                        <p className="text-xs text-indigo-600 uppercase tracking-wider mb-1">HELD IN ESCROW</p>
                        <p className="font-mono font-bold text-xl text-indigo-700 dark:text-indigo-400">{inEscrow.toLocaleString()}원</p>
                    </div>
                </div>

                {/* Payment Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-slate-600 dark:text-slate-400">Payment Progress</span>
                        <span className="text-green-600">{progressPercent.toFixed(0)}% Complete</span>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>

                {/* Milestones List */}
                <div className="space-y-3 mb-6">
                    {milestones.map(m => (
                        <div key={m.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${m.status === 'paid' ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                    }`}>
                                    {m.status === 'paid' ? <i className="fas fa-check"></i> : <i className="fas fa-ellipsis-h"></i>}
                                </span>
                                <span className="text-slate-700 dark:text-slate-300">{m.title}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 dark:text-white">{m.amount.toLocaleString()}원</span>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <button
                            onClick={handleReleaseFunds}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                            <i className="fas fa-check-double"></i> Approve & Release
                        </button>
                        <button
                            onClick={handleMessage}
                            className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <i className="fas fa-comment"></i> Message 이프리
                        </button>
                    </div>
                    <button
                        onClick={handleCancelContract}
                        className="w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded-lg text-sm transition-colors"
                    >
                        계약 파기 요청 (Require Mutual Agreement)
                    </button>
                </div>
            </div>

            {/* Right Column: Activity Feed */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Activity Feed</h3>
                    <button className="text-xs text-primary-500 hover:text-primary-600 font-bold uppercase">View All</button>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {activityFeed.map(dateGroup => (
                        <div key={dateGroup.date}>
                            <p className="text-[10px] uppercase text-slate-400 tracking-wider mb-2 font-bold">{dateGroup.date}</p>
                            {dateGroup.items.map(item => (
                                <div key={item.id} className="flex items-start gap-3 mb-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                                        item.type === 'approved' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                                            'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                                        }`}>
                                        {item.type === 'success' && <i className="fas fa-check text-xs"></i>}
                                        {item.type === 'approved' && <i className="fas fa-shield-alt text-xs"></i>}
                                        {item.type === 'request' && <i className="fas fa-file-invoice-dollar text-xs"></i>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm text-slate-800 dark:text-white">{item.title}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed mb-1">{item.desc}</p>
                                        <p className="text-[10px] text-slate-400">{item.time}</p>
                                        {item.hasAction && (
                                            <button
                                                onClick={() => alert(`상세 내역:\n${item.title}\n${item.desc}\n\n[승인] 또는 [거절] 기능을 제공할 수 있습니다.`)}
                                                className="mt-2 text-xs font-bold bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors w-full active:scale-95"
                                            >
                                                VIEW REQUEST
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* View Toggle */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-500 mb-2">Viewing as:</p>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                        <button
                            onClick={() => setViewAs('employer')}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${viewAs === 'employer' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                        >
                            Employer
                        </button>
                        <button
                            onClick={() => setViewAs('worker')}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${viewAs === 'worker' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                        >
                            Worker
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractHub;
