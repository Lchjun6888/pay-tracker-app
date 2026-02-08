import React from 'react';
import WalletView from '../components/fintech/WalletView';
import ContractHub from '../components/fintech/ContractHub';
import PaymentMilestones from '../components/fintech/PaymentMilestones';
import RewardGoalCard from '../components/fintech/RewardGoalCard';

const FintechView = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Header */}
            <header>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gradient-to-r from-green-500 to-lime-400 text-white rounded-xl p-2.5 shadow-lg shadow-green-500/30">
                        <i className="fas fa-wallet text-lg"></i>
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">PayTrack Fintech Hub</h1>
                </div>
                <p className="text-slate-500 text-base">프리랜서와 사업주를 위한 안전한 간편 결제 및 계약 관리 시스템</p>
            </header>

            {/* Wallet Section */}
            <section className="animate-fade-in-up">
                <WalletView />
            </section>

            {/* Contract Hub Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <i className="fas fa-handshake text-green-500"></i> Active Contracts
                </h2>
                <ContractHub />
            </section>

            {/* Payment Milestones Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <PaymentMilestones />
            </section>

            {/* Goals & Rewards Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <RewardGoalCard />
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-10 flex flex-wrap justify-between items-center text-sm text-slate-400">
                <span>© 2026 PayTrack Financial Inc.</span>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-slate-600">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-600">Terms of Service</a>
                </div>
                <div className="flex items-center gap-1">
                    <i className="fas fa-lock text-xs"></i>
                    <span>PCI-DSS Compliant</span>
                </div>
            </footer>
        </div>
    );
};

export default FintechView;
