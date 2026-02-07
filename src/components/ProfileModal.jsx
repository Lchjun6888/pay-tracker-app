import React, { useState, useEffect } from 'react';

const AVATAR_OPTIONS = [
    { id: 'dog', emoji: '🐶', label: '열정 댕댕이', color: 'bg-orange-100', gradient: 'from-orange-400 to-amber-500' },
    { id: 'cat', emoji: '🐱', label: '카페 냥이', color: 'bg-blue-100', gradient: 'from-blue-400 to-indigo-500' },
    { id: 'rabbit', emoji: '🐰', label: '과외 토끼', color: 'bg-pink-100', gradient: 'from-pink-400 to-rose-500' },
    { id: 'hamster', emoji: '🐹', label: '프리 햄찌', color: 'bg-yellow-100', gradient: 'from-yellow-400 to-orange-500' },
    { id: 'bear', emoji: '🐻', label: '믿음 곰돌이', color: 'bg-rose-100', gradient: 'from-rose-400 to-red-500' },
    { id: 'fox', emoji: '🦊', label: '영리 여우', color: 'bg-orange-100', gradient: 'from-orange-500 to-red-600' },
];

export default function ProfileModal({ isOpen, onClose, userInfo, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        goalIncome: '',
        accountNumber: '',
        bankName: '',
        avatar: 'dog' // Default avatar
    });

    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setFormData({
                name: userInfo.name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                role: userInfo.role || '',
                goalIncome: userInfo.goalIncome || '',
                accountNumber: userInfo.accountNumber || '',
                bankName: userInfo.bankName || '',
                avatar: userInfo.avatar || 'dog'
            });
        }
    }, [userInfo, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const selectedAvatar = AVATAR_OPTIONS.find(a => a.id === formData.avatar) || AVATAR_OPTIONS[0];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar border border-white/20"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-700/50 sticky top-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md z-20">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <i className="fas fa-id-card text-primary-500"></i> 프로필 수정
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all cursor-pointer hover:rotate-90"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Avatar Selection Area */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-28 h-28 rounded-[2rem] bg-gradient-to-br ${selectedAvatar.gradient} flex items-center justify-center shadow-2xl shadow-primary-500/20 relative cursor-pointer group transition-all hover:scale-105 active:scale-95`}
                            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                        >
                            <span className="text-5xl">{selectedAvatar.emoji}</span>
                            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
                                <i className="fas fa-pen text-primary-500 text-xs"></i>
                            </div>
                        </div>
                        <p className="mt-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            {selectedAvatar.label}
                        </p>

                        {/* Avatar Grid Picker */}
                        {showAvatarPicker && (
                            <div className="grid grid-cols-3 gap-3 mt-6 p-4 bg-gray-50 dark:bg-slate-700/30 rounded-[2rem] border border-gray-100 dark:border-slate-700 animate-fadeIn w-full">
                                {AVATAR_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, avatar: opt.id });
                                            setShowAvatarPicker(false);
                                        }}
                                        className={`flex flex-col items-center p-3 rounded-2xl transition-all hover:bg-white dark:hover:bg-slate-600
                                            ${formData.avatar === opt.id ? 'bg-white dark:bg-slate-600 shadow-md ring-2 ring-primary-500' : ''}`}
                                    >
                                        <span className="text-3xl mb-1">{opt.emoji}</span>
                                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">이름</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition font-bold"
                                placeholder="당신의 이름"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">역할 / 한 줄 소개</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-3 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition font-bold"
                                placeholder="프로 알바러 / 프리랜서 등"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">연락처</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition font-bold"
                                    placeholder="010-0000-0000"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">월 목표</label>
                                <input
                                    type="text"
                                    value={formData.goalIncome ? Number(formData.goalIncome).toLocaleString() : ''}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/,/g, '');
                                        if (!isNaN(value)) {
                                            setFormData({ ...formData, goalIncome: value });
                                        }
                                    }}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition font-bold"
                                    placeholder="3,000,000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Financial Info */}
                    <div className="p-5 bg-primary-500/5 dark:bg-primary-500/10 rounded-[2rem] border border-primary-500/10">
                        <h3 className="text-xs font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <i className="fas fa-wallet"></i> 정산 계좌 관리
                        </h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={formData.bankName}
                                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="은행명 (예: 카카오뱅크)"
                            />
                            <input
                                type="text"
                                value={formData.accountNumber}
                                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-white/50 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="계좌번호 (- 없이 입력)"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-black py-4 rounded-[1.5rem] shadow-xl shadow-primary-500/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer mt-4"
                    >
                        변동 사항 저장하기
                    </button>
                </form>
            </div>
        </div>
    );
}

