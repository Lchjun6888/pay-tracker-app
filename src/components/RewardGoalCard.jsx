import React, { useState, useEffect } from 'react';
import { formatKRW } from '../utils/koreanLabor';

export default function RewardGoalCard({ currentTotalPay }) {
    const [goalAmount, setGoalAmount] = useState(() => {
        return parseInt(localStorage.getItem('monthly_goal_amount')) || 3500000;
    });
    const [rewardText, setRewardText] = useState(() => {
        return localStorage.getItem('monthly_goal_reward') || '맥북 프로 M3 💻';
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem('monthly_goal_amount', goalAmount);
        localStorage.setItem('monthly_goal_reward', rewardText);
    }, [goalAmount, rewardText]);

    const progress = Math.min(Math.round((currentTotalPay / goalAmount) * 100), 100);
    const isAchieved = progress >= 100;

    return (
        <div className="relative overflow-hidden group">
            {/* Background Effects */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all duration-500"></div>

            <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-5 border border-gray-100 dark:border-slate-700/50 shadow-xl shadow-gray-200/50 dark:shadow-none">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">이달의 보상 목표</h3>
                        {isEditing ? (
                            <input
                                type="text"
                                value={rewardText}
                                onChange={(e) => setRewardText(e.target.value)}
                                onBlur={() => setIsEditing(false)}
                                autoFocus
                                className="text-xl font-extrabold text-gray-900 dark:text-white bg-transparent border-b-2 border-primary-500 outline-none w-full mt-1"
                            />
                        ) : (
                            <p className="text-xl font-extrabold text-gray-900 dark:text-white mt-1 flex items-center gap-2">
                                {rewardText}
                                <button onClick={() => setIsEditing(true)} className="text-gray-300 hover:text-primary-500 transition">
                                    <i className="fas fa-pen text-xs"></i>
                                </button>
                            </p>
                        )}
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 duration-300 ${isAchieved ? 'bg-amber-400 text-white animate-bounce' : 'bg-primary-500 text-white'}`}>
                        <i className={`fas ${isAchieved ? 'fa-crown' : 'fa-trophy'} text-xl`}></i>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">현재 진행률</p>
                            <p className="text-2xl font-black text-primary-600 dark:text-primary-400">
                                {progress}<span className="text-sm ml-0.5">%</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">목표: {formatKRW(goalAmount)}</p>
                            <div className="flex items-center gap-2 justify-end">
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{formatKRW(currentTotalPay)}</span>
                                {isEditing && (
                                    <button
                                        onClick={() => {
                                            const newGoal = prompt('목표 금액을 설정하세요:', goalAmount);
                                            if (newGoal) setGoalAmount(parseInt(newGoal));
                                        }}
                                        className="text-[10px] bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded text-gray-500"
                                    >
                                        변경
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-3 w-full bg-gray-100 dark:bg-slate-700/50 rounded-full overflow-hidden p-0.5 border border-gray-50 dark:border-slate-800">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out relative ${isAchieved ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'bg-gradient-to-r from-primary-500 to-indigo-600'}`}
                            style={{ width: `${progress}%` }}
                        >
                            {/* Animated Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>

                    {isAchieved ? (
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-2xl border border-amber-100 dark:border-amber-800/30 flex items-center gap-3 animate-pulse">
                            <span className="text-2xl">🎉</span>
                            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 leading-tight">
                                대단해요! 목표를 달성했습니다.<br />자신에게 선물을 줄 시간이에요!
                            </p>
                        </div>
                    ) : (
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 italic text-center">
                            "조금만 더 힘내세요! 정상이 코앞입니다. ✨"
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
