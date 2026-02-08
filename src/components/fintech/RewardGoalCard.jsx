import React, { useState } from 'react';

const RewardGoalCard = () => {
    // 목표 설정 상태 (초기값: 맥북)
    const [goal, setGoal] = useState({
        item: "맥북 프로 M3",
        targetAmount: 3500000,
        savedAmount: 2100000,
        image: "💻" // 이모지나 이미지 URL
    });

    const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
    const remaining = goal.targetAmount - goal.savedAmount;

    // 리워드 아이디어 목록
    const rewardIdeas = [
        { id: 1, title: "치킨 기프티콘", cost: 20000, icon: "🍗", unlocked: true },
        { id: 2, title: "호캉스 1박", cost: 300000, icon: "🏨", unlocked: true },
        { id: 3, title: "새 키보드", cost: 150000, icon: "⌨️", unlocked: false },
    ];

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="bg-white/20 text-indigo-100 text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider backdrop-blur-sm">
                            MY GOAL
                        </span>
                        <h2 className="text-2xl font-extrabold mt-2 flex items-center gap-2">
                            {goal.image} {goal.item}
                        </h2>
                        <p className="text-indigo-200 text-sm">목표 달성까지 <span className="text-white font-bold">{remaining.toLocaleString()}원</span> 남았어요!</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center text-lg font-bold bg-white/10 backdrop-blur-sm shadow-inner">
                        {Math.floor(progress)}%
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-4 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-1000 relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-indigo-200 mt-2 px-1">
                        <span>0원</span>
                        <span>{goal.targetAmount.toLocaleString()}원</span>
                    </div>
                </div>

                {/* Rewards Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                        <i className="fas fa-gift text-yellow-300"></i>
                        중간 달성 리워드 (셀프 선물)
                    </h3>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {rewardIdeas.map(reward => (
                            <div
                                key={reward.id}
                                className={`flex-shrink-0 w-24 p-3 rounded-xl flex flex-col items-center text-center gap-2 border transition-all cursor-pointer
                                    ${reward.unlocked
                                        ? 'bg-white text-slate-900 border-white shadow-lg hover:scale-105'
                                        : 'bg-black/20 text-indigo-300 border-transparent opacity-60 grayscale'}`}
                            >
                                <span className="text-2xl">{reward.icon}</span>
                                <span className="text-xs font-bold truncate w-full">{reward.title}</span>
                                {reward.unlocked ? (
                                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-bold">GET!</span>
                                ) : (
                                    <i className="fas fa-lock text-xs"></i>
                                )}
                            </div>
                        ))}

                        {/* Add Reward Button */}
                        <div className="flex-shrink-0 w-24 p-3 rounded-xl flex flex-col items-center justify-center gap-1 border border-dashed border-white/30 text-indigo-200 hover:bg-white/10 cursor-pointer transition-colors">
                            <i className="fas fa-plus text-lg"></i>
                            <span className="text-xs">추가</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardGoalCard;
