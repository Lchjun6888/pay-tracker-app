import React, { createContext, useContext, useState, useEffect } from 'react';

const PremiumContext = createContext();

const PROMO_CODE = 'PAYTRACK2026';
const STORAGE_KEY = 'paytrack_premium';

export function PremiumProvider({ children }) {
    const [isPremium, setIsPremium] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, isPremium.toString());
    }, [isPremium]);

    const activateWithCode = (code) => {
        if (code.trim().toUpperCase() === PROMO_CODE) {
            setIsPremium(true);
            return { success: true, message: '프리미엄이 활성화되었습니다! 🎉' };
        }
        return { success: false, message: '유효하지 않은 코드입니다.' };
    };

    const deactivate = () => {
        setIsPremium(false);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <PremiumContext.Provider value={{ isPremium, activateWithCode, deactivate }}>
            {children}
        </PremiumContext.Provider>
    );
}

export function usePremium() {
    const ctx = useContext(PremiumContext);
    if (!ctx) throw new Error('usePremium must be used within PremiumProvider');
    return ctx;
}
