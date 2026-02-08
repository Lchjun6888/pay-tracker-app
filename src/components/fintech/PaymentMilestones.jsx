import React, { useState } from 'react';

const PaymentMilestones = () => {
    const [activeTab, setActiveTab] = useState('freelance');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', amount: '', date: '', type: 'freelance' });

    // 1. 외주 (Freelance) - Stitch 디자인 기준 마일스톤 방식
    const [freelanceProjects, setFreelanceProjects] = useState([
        {
            id: 1,
            name: "웹사이트 리뉴얼 프로젝트",
            client: "스타트업 A",
            currency: "KRW",
            taxSetup: "원천징수 3.3%",
            totalAmount: 5000000,
            milestones: [
                { id: 101, title: '계약금 (20%)', description: '계약 시작 후 지급', amount: 1000000, due: '2026-02-01', status: 'paid' },
                { id: 102, title: '중도금 (40%)', description: '1차 프로토타입 완료 시', amount: 2000000, due: '2026-02-15', status: 'pending' },
                { id: 103, title: '잔금 (40%)', description: '최종 납품 및 인수인계', amount: 2000000, due: '2026-02-28', status: 'upcoming' },
            ]
        }
    ]);

    // 2. 알바 (Part-time)
    const [albaJobs, setAlbaJobs] = useState([
        { id: 1, name: "편의점 주말 알바", hourlyRate: 10000, workedHours: 32, totalPay: 320000, nextPayDate: "2026-02-10", status: 'upcoming' },
        { id: 2, name: "쿠팡 물류 단기", hourlyRate: 13000, workedHours: 8, totalPay: 104000, nextPayDate: "2026-02-09", status: 'pending' }
    ]);

    // 3. 월급 (Salary)
    const [salaryJobs, setSalaryJobs] = useState([
        { id: 1, company: "(주)테크솔루션", monthlyPay: 3500000, payDay: 25, dDay: 17, status: 'regular' }
    ]);

    const handleRequestPayment = (projectId, milestoneId) => {
        const updatedProjects = freelanceProjects.map(p => {
            if (p.id === projectId) {
                return {
                    ...p,
                    milestones: p.milestones.map(m =>
                        m.id === milestoneId ? { ...m, status: 'requested' } : m
                    )
                };
            }
            return p;
        });
        setFreelanceProjects(updatedProjects);
        alert(`청구서가 발송되었습니다! (ID: ${milestoneId})`);
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.amount) return;
        const amount = parseInt(newItem.amount.replace(/,/g, ''), 10);
        if (newItem.type === 'freelance') {
            const newProject = {
                id: Date.now(), name: newItem.name, client: "(직접 입력)", currency: "KRW", taxSetup: "미정", totalAmount: amount,
                milestones: [{ id: Date.now() + 1, title: '전체 금액', description: '직접 추가됨', amount: amount, due: newItem.date, status: 'pending' }]
            };
            setFreelanceProjects([...freelanceProjects, newProject]);
        } else if (newItem.type === 'alba') {
            setAlbaJobs([...albaJobs, { id: Date.now(), name: newItem.name, hourlyRate: 0, workedHours: 0, totalPay: amount, nextPayDate: newItem.date, status: 'pending' }]);
        } else {
            setSalaryJobs([...salaryJobs, { id: Date.now(), company: newItem.name, monthlyPay: amount, payDay: new Date(newItem.date).getDate(), dDay: 30, status: 'regular' }]);
        }
        setShowAddForm(false);
        setNewItem({ name: '', amount: '', date: '', type: 'freelance' });
    };

    // ========== Freelance: Stitch "Structured Payment Plan" Style ==========
    const renderFreelance = () => (
        <div className="space-y-8">
            {freelanceProjects.map(project => {
                const paid = project.milestones.filter(m => m.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
                const pending = project.totalAmount - paid;
                const progressPercent = (paid / project.totalAmount) * 100;

                return (
                    <div key={project.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Milestones Timeline */}
                        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="text-2xl">💰</span> Payment Milestones
                                </h3>
                                <button className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
                                    <i className="fas fa-plus-circle"></i> 마일스톤 추가
                                </button>
                            </div>

                            {/* Milestone Cards */}
                            <div className="space-y-4 relative">
                                {/* Timeline Line */}
                                <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700 z-0"></div>

                                {project.milestones.map((m, idx) => (
                                    <div key={m.id} className="relative z-10 flex items-start gap-4">
                                        {/* Status Icon */}
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white dark:border-slate-800 shadow-sm ${m.status === 'paid' ? 'bg-green-500 text-white' :
                                                m.status === 'pending' || m.status === 'requested' ? 'bg-primary-500 text-white' :
                                                    'bg-slate-200 dark:bg-slate-600 text-slate-400'
                                            }`}>
                                            {m.status === 'paid' ? <i className="fas fa-check text-xs"></i> :
                                                m.status === 'pending' || m.status === 'requested' ? <i className="fas fa-clock text-xs"></i> :
                                                    <i className="fas fa-hourglass-half text-xs"></i>}
                                        </div>

                                        {/* Milestone Card */}
                                        <div className={`flex-1 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border ${m.status === 'pending' ? 'border-primary-200 dark:border-primary-700' : 'border-slate-100 dark:border-slate-700'
                                            }`}>
                                            <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                                                <div>
                                                    <h4 className="font-bold text-slate-800 dark:text-white">{m.title}</h4>
                                                    <p className="text-xs text-slate-500">{m.description}</p>
                                                </div>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${m.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                                                        m.status === 'requested' ? 'bg-purple-100 text-purple-700' :
                                                            m.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    {m.status === 'paid' ? 'PAID' : m.status === 'requested' ? 'PENDING REQUEST' : m.status === 'pending' ? '청구 가능' : 'UPCOMING'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-3">
                                                <div>
                                                    <p className="text-[10px] uppercase text-slate-400 tracking-wider mb-1">AMOUNT</p>
                                                    <p className="font-mono font-bold text-lg text-slate-900 dark:text-white">{m.amount.toLocaleString()}원</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase text-slate-400 tracking-wider mb-1">DUE DATE</p>
                                                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                        <i className="far fa-calendar text-slate-400"></i> {m.due}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Request Payment Button */}
                                            {m.status === 'pending' && (
                                                <button
                                                    onClick={() => handleRequestPayment(project.id, m.id)}
                                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg text-sm transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                                                >
                                                    <i className="fas fa-paper-plane"></i> REQUEST PAYMENT
                                                </button>
                                            )}
                                            {m.status === 'requested' && (
                                                <button disabled className="w-full bg-slate-200 text-slate-400 font-bold py-2.5 rounded-lg text-sm cursor-not-allowed flex items-center justify-center gap-2">
                                                    <i className="fas fa-check"></i> 청구 완료
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Contract Summary Sidebar */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* Contract Summary Card */}
                            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
                                <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-3">CONTRACT SUMMARY</h4>
                                <p className="text-sm text-slate-500 mb-1">Total Project Value</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white font-mono mb-4">{project.totalAmount.toLocaleString()}원</p>

                                {/* Progress Bar */}
                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                                <div className="flex justify-between text-xs mb-4">
                                    <span className="text-green-600 font-bold">{paid.toLocaleString()}원 Paid</span>
                                    <span className="text-slate-400">{pending.toLocaleString()}원 Remaining</span>
                                </div>

                                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3 text-sm">
                                    <div className="flex justify-between"><span className="text-slate-500">Client</span><span className="font-bold text-slate-800 dark:text-white">{project.client}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-500">Currency</span><span className="font-bold text-slate-800 dark:text-white">{project.currency}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-500">Tax Setup</span><span className="font-bold text-slate-800 dark:text-white">{project.taxSetup}</span></div>
                                </div>
                            </div>

                            {/* Secure Escrow Notice */}
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-start gap-3">
                                <span className="text-green-500 text-xl"><i className="fas fa-shield-alt"></i></span>
                                <div>
                                    <p className="font-bold text-green-700 dark:text-green-400 text-sm">Secure Escrow</p>
                                    <p className="text-xs text-green-600 dark:text-green-500">Funds are protected and released only upon your approval.</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2">
                                <button className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2">
                                    <i className="far fa-save"></i> Save Draft
                                </button>
                                <button className="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                                    <i className="fas fa-check-circle"></i> Finalize Agreement
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    // ========== Alba Render ==========
    const renderAlba = () => (
        <div className="space-y-4">
            {albaJobs.map(job => (
                <div key={job.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <i className="fas fa-store"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{job.name}</h3>
                                <p className="text-xs text-slate-500">시급 {job.hourlyRate.toLocaleString()}원</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-400">이번 달 예상</p>
                            <p className="text-xl font-bold text-slate-800 dark:text-white">{job.totalPay.toLocaleString()}원</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 flex justify-between items-center text-sm">
                        <span className="text-slate-500">급여일: <span className="font-bold text-slate-700 dark:text-slate-300">{job.nextPayDate}</span></span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${job.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-200 text-slate-500'}`}>
                            {job.status === 'pending' ? '지급 대기' : '근무중'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

    // ========== Salary Render ==========
    const renderSalary = () => (
        <div className="space-y-4">
            {salaryJobs.map(job => (
                <div key={job.id} className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div><h3 className="text-2xl font-bold">{job.company}</h3><p className="text-slate-400 text-sm">정규직 / 월급제</p></div>
                            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[80px]">
                                <p className="text-xs text-slate-300 uppercase">D-Day</p>
                                <p className="text-xl font-bold text-lime-400">{job.dDay}일</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div><p className="text-sm text-slate-400 mb-1">이번 달 실수령액 (예상)</p><p className="text-3xl font-mono font-bold">{job.monthlyPay.toLocaleString()}원</p></div>
                            <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden"><div className="bg-blue-500 h-full rounded-full" style={{ width: `${((30 - job.dDay) / 30) * 100}%` }}></div></div>
                            <p className="text-xs text-right text-slate-500">급여일: 매월 {job.payDay}일</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <span className="text-green-500"><i className="fas fa-money-check-alt"></i></span>
                    Structured Payment Plan
                </h2>
                <button onClick={() => setShowAddForm(!showAddForm)} className="text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-bold px-3 py-2 rounded-lg flex items-center gap-2">
                    <i className={`fas ${showAddForm ? 'fa-times' : 'fa-plus'}`}></i> {showAddForm ? '취소' : '+ New Project'}
                </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <form onSubmit={handleAddItem} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6">
                    <h3 className="text-sm font-bold mb-3 text-slate-700 dark:text-slate-300">새로운 수입 항목 추가</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <select value={newItem.type} onChange={(e) => setNewItem({ ...newItem, type: e.target.value })} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm">
                            <option value="freelance">외주 (건별)</option><option value="alba">알바</option><option value="salary">월급</option>
                        </select>
                        <input type="text" placeholder="항목 이름" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" required />
                        <input type="number" placeholder="금액 (원)" value={newItem.amount} onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" required />
                        <input type="date" value={newItem.date} onChange={(e) => setNewItem({ ...newItem, date: e.target.value })} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm" required />
                    </div>
                    <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 rounded-lg text-sm">추가하기</button>
                </form>
            )}

            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-full mb-6">
                {['alba', 'freelance', 'salary'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                        {tab === 'alba' ? '알바' : tab === 'freelance' ? '외주 (건별)' : '월급'}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="animate-fade-in min-h-[200px]">
                {activeTab === 'alba' && renderAlba()}
                {activeTab === 'freelance' && renderFreelance()}
                {activeTab === 'salary' && renderSalary()}
            </div>
        </div>
    );
};

export default PaymentMilestones;
