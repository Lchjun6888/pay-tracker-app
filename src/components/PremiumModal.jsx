import React, { useState } from 'react';
import { usePremium } from '../context/PremiumContext';

export default function PremiumModal({ isOpen, onClose }) {
    const { activateWithCode } = usePremium();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = activateWithCode(code);
        if (result.success) {
            setSuccess(true);
            setError('');
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setCode('');
            }, 1500);
        } else {
            setError(result.message);
        }
    };

    const features = [
        { icon: 'fa-chart-pie', title: '세금 상세 분석', desc: '국민연금, 건강보험, 고용보험 항목별 상세 확인' },
        { icon: 'fa-file-pdf', title: 'PDF 급여명세서', desc: '깔끔한 급여명세서를 PDF로 다운로드' },
        { icon: 'fa-chart-bar', title: '연간 소득 리포트', desc: '월별 소득 추이를 한눈에 파악' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-fadeIn" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="relative bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-8 text-center">
                    <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition cursor-pointer">
                        <i className="fas fa-times text-sm"></i>
                    </button>
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <i className="fas fa-crown text-white text-3xl"></i>
                    </div>
                    <h2 className="text-2xl font-black text-white">PayTrack Premium</h2>
                    <p className="text-white/80 text-sm mt-1">더 똑똑한 급여 관리를 시작하세요</p>
                </div>

                {/* Features */}
                <div className="p-6 space-y-4">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center flex-shrink-0">
                                <i className={`fas ${f.icon} text-amber-600 dark:text-amber-400`}></i>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">{f.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Promo Code Input */}
                <div className="px-6 pb-6">
                    {success ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <i className="fas fa-check text-green-500 text-2xl"></i>
                            </div>
                            <p className="font-bold text-green-600 dark:text-green-400">프리미엄 활성화 완료! 🎉</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                프로모 코드 입력
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={code}
                                    onChange={e => { setCode(e.target.value); setError(''); }}
                                    placeholder="코드를 입력하세요"
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none uppercase tracking-widest"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-sm hover:from-amber-600 hover:to-orange-600 transition shadow-lg shadow-amber-500/20 cursor-pointer"
                                >
                                    활성화
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs mt-2 font-medium">
                                    <i className="fas fa-exclamation-circle mr-1"></i>{error}
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
