import React, { useState, useEffect } from 'react';

export default function ProfileModal({ isOpen, onClose, userInfo, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        goalIncome: '',
        accountNumber: '',
        bankName: ''
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                name: userInfo.name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                role: userInfo.role || '',
                goalIncome: userInfo.goalIncome || '',
                accountNumber: userInfo.accountNumber || '',
                bankName: userInfo.bankName || ''
            });
        }
    }, [userInfo, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <i className="fas fa-user-circle text-primary-500"></i> 내 정보 입력
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg relative cursor-pointer group">
                            <span className="text-white font-bold text-3xl">
                                {formData.name ? formData.name.substring(0, 2) : 'ME'}
                            </span>
                            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <i className="fas fa-camera text-white"></i>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이름</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition text-sm"
                            placeholder="홍길동"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">역할 / 직업</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition text-sm"
                            placeholder="프리랜서 디자이너, 대학생 등"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">전화번호</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition text-sm"
                                placeholder="010-0000-0000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">목표 월수입</label>
                            <input
                                type="text"
                                value={formData.goalIncome ? Number(formData.goalIncome).toLocaleString() : ''}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/,/g, '');
                                    if (!isNaN(value)) {
                                        setFormData({ ...formData, goalIncome: value });
                                    }
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition text-sm"
                                placeholder="2,000,000"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이메일</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition text-sm"
                            placeholder="example@email.com"
                        />
                    </div>

                    {/* Account Info Section */}
                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 mt-2">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <i className="fas fa-university text-primary-500"></i> 급여 통장 정보 (선택)
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <input
                                    type="text"
                                    value={formData.bankName}
                                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                    placeholder="은행명"
                                />
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    value={formData.accountNumber}
                                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                    placeholder="계좌번호"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl shadow-md transition cursor-pointer mt-4"
                    >
                        <i className="fas fa-check mr-2"></i> 저장하기
                    </button>
                </form>
            </div>
        </div>
    );
}
