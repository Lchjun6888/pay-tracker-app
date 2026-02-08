import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ currentPage, onNavigate, searchQuery, onSearchChange, onProfileClick, userInfo }) {
    const { darkMode, toggleDarkMode } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const AVATAR_OPTIONS = [
        { id: 'dog', emoji: '🐶', gradient: 'from-orange-400 to-amber-500' },
        { id: 'cat', emoji: '🐱', gradient: 'from-blue-400 to-indigo-500' },
        { id: 'rabbit', emoji: '🐰', gradient: 'from-pink-400 to-rose-500' },
        { id: 'hamster', emoji: '🐹', gradient: 'from-yellow-400 to-orange-500' },
        { id: 'bear', emoji: '🐻', gradient: 'from-rose-400 to-red-500' },
        { id: 'fox', emoji: '🦊', gradient: 'from-orange-500 to-red-600' },
    ];

    const selectedAvatar = AVATAR_OPTIONS.find(a => a.id === userInfo?.avatar) || AVATAR_OPTIONS[0];

    const navItems = [
        { id: 'dashboard', label: '대시보드', icon: 'fas fa-home' },
        { id: 'calendar', label: '캘린더', icon: 'fas fa-calendar' },
        { id: 'jobs', label: '알바 목록', icon: 'fas fa-briefcase' },
        { id: 'fintech', label: '핀테크', icon: 'fas fa-coins' },
        { id: 'albamon', label: '알바몬', icon: 'fas fa-link' },
        { id: 'settings', label: '설정', icon: 'fas fa-cog' },
    ];

    const handleNavClick = (id) => {
        if (id === 'albamon') {
            window.open('https://www.albamon.com', '_blank');
        } else {
            onNavigate(id);
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg transform rotate-3">
                            <i className="fas fa-wallet text-white text-sm sm:text-lg"></i>
                        </div>
                        <span className="font-extrabold text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white">
                            PayTrack<span className="text-primary-500">.</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition cursor-pointer flex items-center gap-2
                  ${currentPage === item.id
                                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
                                    }
                  ${item.id === 'albamon' ? 'text-orange-600 dark:text-orange-400' : ''}`}
                            >
                                <i className={item.icon}></i>
                                {item.label}
                                {item.id === 'albamon' && <i className="fas fa-external-link-alt text-[10px]"></i>}
                            </button>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Search */}
                        <div className="hidden sm:flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-2">
                            <i className="fas fa-search text-gray-400 dark:text-gray-500 text-sm"></i>
                            <input
                                type="text"
                                placeholder="알바 검색..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm ml-2 w-28 lg:w-40 text-gray-700 dark:text-gray-300 placeholder-gray-400"
                            />
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-sm`}></i>
                        </button>

                        {/* Profile Avatar - Desktop/Mobile Clickable */}
                        <div
                            onClick={onProfileClick}
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedAvatar.gradient} flex items-center justify-center shadow-lg shadow-primary-500/10 cursor-pointer hover:scale-110 active:scale-95 transition-all`}
                            title="내 정보 설정"
                        >
                            <span className="text-xl">{selectedAvatar.emoji}</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-3 border-t border-gray-100 dark:border-slate-800">
                        {/* Mobile Search */}
                        <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-2 mb-3">
                            <i className="fas fa-search text-gray-400 dark:text-gray-500 text-sm"></i>
                            <input
                                type="text"
                                placeholder="알바 검색..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm ml-2 flex-1 text-gray-700 dark:text-gray-300 placeholder-gray-400"
                            />
                        </div>
                        {/* Mobile Nav Items */}
                        <div className="space-y-1">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`w-full px-3 py-2.5 rounded-lg font-medium text-sm transition cursor-pointer flex items-center gap-3
                    ${currentPage === item.id
                                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                        }
                    ${item.id === 'albamon' ? 'text-orange-600 dark:text-orange-400' : ''}`}
                                >
                                    <i className={`${item.icon} w-5`}></i>
                                    {item.label}
                                    {item.id === 'albamon' && <i className="fas fa-external-link-alt text-[10px] ml-auto"></i>}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
