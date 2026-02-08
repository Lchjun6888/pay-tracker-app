import React, { useState } from 'react';

const WalletView = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('escrow');

    // Recent Activity Data
    const recentActivities = [
        { id: 1, type: 'in', title: '외주 계약금', subtitle: 'UI 디자인 마일스톤 #2', amount: 2400000, date: 'TODAY' },
        { id: 2, type: 'out', title: '출금', subtitle: 'To 국민은행 • 8829', amount: 1000000, date: 'TODAY' },
        { id: 3, type: 'in', title: '보너스', subtitle: '추천인 리워드', amount: 150000, date: 'YESTERDAY' },
    ];

    // Payment Methods
    const paymentMethods = [
        { id: 'escrow', name: 'Escrow 서비스', desc: '계약 완료 시까지 안전하게 보관. 프리랜서 추천', recommended: true },
        { id: 'bank', name: '즉시 계좌이체', desc: '연결된 국민은행 계좌로 바로 송금', recommended: false },
        { id: 'card', name: '신용카드 (Visa/Mastercard)', desc: '일회성 결제 또는 플랫폼 수수료 지불', recommended: false },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Main Wallet */}
            <div className="lg:col-span-2 space-y-6">
                {/* Balance Header Card */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-500 mb-1">Total Available Balance</p>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono">12,450,000원</h1>
                            <div className="flex items-center gap-2 mt-2 text-green-600 font-bold text-sm">
                                <i className="fas fa-arrow-up"></i> +1,240,000원 this month
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
                                <i className="fas fa-building-columns"></i> 출금하기
                            </button>
                            <button className="flex-1 md:flex-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold px-5 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                                <i className="fas fa-plus"></i> 충전하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* Connected Banks */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Connected Banks & Cards</h3>
                        <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded flex items-center gap-1">
                            <i className="fas fa-shield-alt"></i> Secure Open Banking
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Bank Card 1 */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-600">
                                    <i className="fas fa-building-columns"></i>
                                </div>
                                <i className="fas fa-ellipsis-v text-slate-300 hover:text-slate-500 cursor-pointer"></i>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">KB국민은행</h4>
                            <p className="text-slate-500 text-sm mb-2">저축예금 •••• 8829</p>
                            <p className="font-mono font-bold text-xl text-slate-900 dark:text-white">4,200,000원</p>
                        </div>

                        {/* Bank Card 2 */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600">
                                    <i className="fas fa-credit-card"></i>
                                </div>
                                <i className="fas fa-ellipsis-v text-slate-300 hover:text-slate-500 cursor-pointer"></i>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white">신한은행</h4>
                            <p className="text-slate-500 text-sm mb-2">입출금통장 •••• 1042</p>
                            <p className="font-mono font-bold text-xl text-slate-900 dark:text-white">8,250,000원</p>
                        </div>

                        {/* Add New Card */}
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl flex flex-col items-center justify-center p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-white min-h-[160px]">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-2">
                                <i className="fas fa-plus"></i>
                            </div>
                            <span className="font-bold text-sm">Link New Account</span>
                            <span className="text-xs text-slate-400">Connect via Open Banking</span>
                        </div>
                    </div>
                </div>

                {/* Default Payment Method */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Default Payment Method</h3>
                    <div className="space-y-3">
                        {paymentMethods.map(method => (
                            <label
                                key={method.id}
                                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPaymentMethod === method.id
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.id}
                                    checked={selectedPaymentMethod === method.id}
                                    onChange={() => setSelectedPaymentMethod(method.id)}
                                    className="mt-1 accent-green-500"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-800 dark:text-white">{method.name}</span>
                                        {method.recommended && (
                                            <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded uppercase">추천</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500">{method.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1 space-y-6">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                        <button className="text-xs text-primary-500 hover:text-primary-600 font-bold">View All</button>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, idx) => (
                            <div key={activity.id}>
                                {(idx === 0 || recentActivities[idx - 1].date !== activity.date) && (
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">{activity.date}</p>
                                )}
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activity.type === 'in' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                                        }`}>
                                        <i className={`fas ${activity.type === 'in' ? 'fa-arrow-down' : 'fa-arrow-up'} text-sm`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm text-slate-800 dark:text-white truncate">{activity.title}</p>
                                        <p className="text-xs text-slate-500 truncate">{activity.subtitle}</p>
                                    </div>
                                    <span className={`font-mono font-bold text-sm ${activity.type === 'in' ? 'text-green-600' : 'text-slate-500'}`}>
                                        {activity.type === 'in' ? '+' : '-'}{activity.amount.toLocaleString()}원
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secure Link Info Box */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-green-500 text-2xl"><i className="fas fa-shield-alt"></i></span>
                        <h4 className="font-bold text-green-700 dark:text-green-400">Secure Link</h4>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-500 mb-3">
                        Your data is protected by bank-grade 256-bit encryption and regulated by national financial authorities.
                    </p>
                    <div className="flex gap-1">
                        <div className="w-8 h-1 bg-green-400 rounded"></div>
                        <div className="w-8 h-1 bg-green-400 rounded"></div>
                        <div className="w-8 h-1 bg-green-300 rounded"></div>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-green-500 mt-2">PROTECTED</p>
                </div>

                {/* Common Questions */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3">Common Questions</h4>
                    <div className="space-y-2">
                        {['출금은 얼마나 걸리나요?', 'Open Banking은 안전한가요?', '결제 분쟁 정책'].map((q, i) => (
                            <button key={i} className="w-full flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                                <span>{q}</span>
                                <i className="fas fa-external-link-alt text-xs"></i>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletView;
