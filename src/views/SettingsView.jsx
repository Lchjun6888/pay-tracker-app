import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SettingsView() {
    const { darkMode, toggleDarkMode } = useTheme();
    const [currency, setCurrency] = React.useState('KRW');
    const [language, setLanguage] = React.useState('ko');
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate saving to local storage or backend
        setTimeout(() => {
            localStorage.setItem('settings_currency', currency);
            localStorage.setItem('settings_language', language);
            setIsSaving(false);
            alert('설정이 저장되었습니다!');
        }, 800);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">설정</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">앱 환경을 사용자 맞춤으로 설정하세요</p>
            </div>

            <div className="space-y-6">
                {/* Appearance */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i className="fas fa-palette text-primary-500"></i> 테마 설정
                    </h2>

                    <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-slate-700">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">다크 모드</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">눈이 편안한 어두운 화면으로 전환합니다</p>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className={`relative w-14 h-7 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${darkMode ? 'bg-primary-500' : 'bg-gray-300 dark:bg-slate-600'}`}
                        >
                            <span
                                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center
                  ${darkMode ? 'left-7' : 'left-0.5'}`}
                            >
                                <i className={`fas ${darkMode ? 'fa-moon text-primary-500' : 'fa-sun text-yellow-500'} text-xs`}></i>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i className="fas fa-bell text-primary-500"></i> 알림 설정
                    </h2>

                    <div className="space-y-4">
                        <ToggleSwitch
                            label="근무 전 알림"
                            description="출근 1시간 전에 알림을 받습니다"
                            defaultOn={true}
                        />
                        <ToggleSwitch
                            label="주간 리포트"
                            description="매주 일요일에 주간 수입 요약을 받습니다"
                            defaultOn={false}
                        />
                    </div>
                </div>

                {/* Currency */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <i className="fas fa-won-sign text-primary-500"></i> 통화 및 지역
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">통화 단위</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer"
                            >
                                <option value="KRW">₩ KRW (대한민국 원)</option>
                                <option value="USD">$ USD (미국 달러)</option>
                                <option value="JPY">¥ JPY (일본 엔)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">언어</label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer"
                            >
                                <option value="ko">한국어</option>
                                <option value="en">English</option>
                                <option value="ja">日本語</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> 저장 중...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-check"></i> 설정 저장하기
                            </>
                        )}
                    </button>
                </div>

                {/* Version Info */}
                <div className="text-center text-sm text-gray-400 dark:text-gray-500 py-4">
                    Job Tracker v1.0.0 • Made with 💖 by Youngja
                </div>
            </div>
        </div>
    );
}

// Reusable Toggle Switch Component
function ToggleSwitch({ label, description, defaultOn = false }) {
    const [isOn, setIsOn] = React.useState(defaultOn);

    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <button
                onClick={() => setIsOn(!isOn)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${isOn ? 'bg-primary-500' : 'bg-gray-300 dark:bg-slate-600'}`}
            >
                <span
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300
            ${isOn ? 'left-7' : 'left-0.5'}`}
                />
            </button>
        </div>
    );
}
