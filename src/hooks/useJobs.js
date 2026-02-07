import { useState, useEffect } from 'react';

const STORAGE_KEY = 'paytrack_v1_jobs';

const initialJobs = [
    {
        id: 1,
        title: '카페 오전 알바',
        company: '스타벅스 강남점',
        category: 'HOSPITALITY',
        hourlyRate: 10300,
        nextShift: 'Mon, 8:00 AM',
        icon: 'fas fa-mug-hot',
        isActive: true,
        type: 'HOURLY',
        hoursPerWeek: 20,
    },
    {
        id: 2,
        title: '영어 과외',
        company: '김철수 학생',
        category: 'EDUCATION',
        hourlyRate: 40000,
        nextShift: 'Wed, 4:00 PM',
        icon: 'fas fa-chalkboard-teacher',
        isActive: true,
        type: 'HOURLY',
        hoursPerWeek: 4,
    },
    {
        id: 3,
        title: '웹사이트 디자인 외주',
        company: '스타트업 A',
        category: 'DESIGN',
        hourlyRate: 1500000,
        nextShift: '2026.02.25',
        icon: 'fas fa-palette',
        isActive: true,
        type: 'FREELANCE',
    },
];

export const brandIcons = [
    { name: 'Starbucks', icon: 'fas fa-coffee', category: 'HOSPITALITY' },
    { name: 'McDonald\'s', icon: 'fas fa-hamburger', category: 'HOSPITALITY' },
    { name: 'Cafe', icon: 'fas fa-mug-hot', category: 'HOSPITALITY' },
    { name: 'Restaurant', icon: 'fas fa-utensils', category: 'HOSPITALITY' },
    { name: 'Bakery', icon: 'fas fa-bread-slice', category: 'HOSPITALITY' },
    { name: 'Bar', icon: 'fas fa-cocktail', category: 'HOSPITALITY' },
    { name: 'CGV', icon: 'fas fa-film', category: 'HOSPITALITY' },
    { name: 'Amusement', icon: 'fas fa-ticket-alt', category: 'HOSPITALITY' },
    { name: 'CU 편의점', icon: 'fas fa-store', category: 'RETAIL' },
    { name: 'GS25', icon: 'fas fa-shopping-basket', category: 'RETAIL' },
    { name: '이마트', icon: 'fas fa-shopping-cart', category: 'RETAIL' },
    { name: 'Clothing', icon: 'fas fa-tshirt', category: 'RETAIL' },
    { name: 'Olive Young', icon: 'fas fa-spa', category: 'RETAIL' },
    { name: 'Coupang', icon: 'fas fa-box', category: 'GIG ECONOMY' },
    { name: 'BaeMin', icon: 'fas fa-motorcycle', category: 'GIG ECONOMY' },
    { name: 'Uber/Taxi', icon: 'fas fa-car', category: 'GIG ECONOMY' },
    { name: 'Truck', icon: 'fas fa-truck', category: 'GIG ECONOMY' },
    { name: 'Tutoring', icon: 'fas fa-chalkboard-teacher', category: 'EDUCATION' },
    { name: 'Book', icon: 'fas fa-book', category: 'EDUCATION' },
    { name: 'Design', icon: 'fas fa-paint-brush', category: 'DESIGN' },
    { name: 'Palette', icon: 'fas fa-palette', category: 'DESIGN' },
    { name: 'Coding', icon: 'fas fa-code', category: 'DESIGN' },
    { name: 'Laptop', icon: 'fas fa-laptop-code', category: 'DESIGN' },
    { name: 'Video', icon: 'fas fa-video', category: 'MEDIA' },
    { name: 'Camera', icon: 'fas fa-camera', category: 'MEDIA' },
    { name: 'Youtube', icon: 'fab fa-youtube', category: 'MEDIA' },
    { name: 'Construction', icon: 'fas fa-hard-hat', category: 'CONSTRUCTION' },
    { name: 'Tools', icon: 'fas fa-tools', category: 'CONSTRUCTION' },
    { name: 'Hammer', icon: 'fas fa-hammer', category: 'CONSTRUCTION' },
    { name: 'Office', icon: 'fas fa-building', category: 'OFFICE' },
    { name: 'Computer', icon: 'fas fa-laptop', category: 'OFFICE' },
    { name: 'Documents', icon: 'fas fa-file-alt', category: 'OFFICE' },
    { name: 'Hospital', icon: 'fas fa-hospital', category: 'ALL' },
    { name: 'Gym', icon: 'fas fa-dumbbell', category: 'ALL' },
    { name: 'Custom', icon: 'fas fa-briefcase', category: 'ALL' },
    { name: 'Money', icon: 'fas fa-money-bill-wave', category: 'ALL' },
];

export function useJobs() {
    const [jobs, setJobs] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : initialJobs;
        } catch (e) {
            console.error('Failed to load jobs:', e);
            return initialJobs;
        }
    });

    const [filter, setFilter] = useState('all');

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
        } catch (e) {
            console.error('Failed to save jobs:', e);
        }
    }, [jobs]);

    const addJob = (job) => {
        const newJob = {
            ...job,
            id: Date.now(),
            isActive: true,
            type: job.type || 'HOURLY',
        };
        setJobs(prev => [...prev, newJob]);
    };

    const updateJob = (id, updatedData) => {
        setJobs(prev => prev.map(job =>
            job.id === id ? { ...job, ...updatedData } : job
        ));
    };

    const deleteJob = (id) => {
        setJobs(prev => prev.filter(job => job.id !== id));
    };

    const archiveJob = (id) => {
        setJobs(prev => prev.map(job =>
            job.id === id ? { ...job, isActive: !job.isActive } : job
        ));
    };

    const filteredJobs = jobs.filter(job => {
        if (filter === 'active') return job.isActive;
        if (filter === 'archived') return !job.isActive;
        return true;
    });

    const hourlyJobs = jobs.filter(j => j.isActive && (!j.type || j.type === 'HOURLY'));
    const freelanceJobs = jobs.filter(j => j.isActive && j.type === 'FREELANCE');

    const stats = {
        monthlyIncome: jobs.filter(j => j.isActive).reduce((sum, job) => {
            if (!job.type || job.type === 'HOURLY') {
                return sum + (job.hourlyRate * (job.hoursPerWeek || 0) * 4);
            } else if (job.type === 'SALARY') {
                if (job.salaryType === 'ANNUAL') {
                    return sum + Math.round(job.hourlyRate / 12);
                } else {
                    return sum + job.hourlyRate;
                }
            }
            return sum;
        }, 0),
        avgHourly: hourlyJobs.length ? Math.round(hourlyJobs.reduce((sum, job) => sum + job.hourlyRate, 0) / hourlyJobs.length) : 0,
        activeHourly: hourlyJobs.length + jobs.filter(j => j.isActive && j.type === 'SALARY').length,
        totalHours: hourlyJobs.reduce((sum, job) => sum + (job.hoursPerWeek || 0), 0),
        pendingIncome: freelanceJobs.reduce((sum, job) => sum + job.hourlyRate, 0),
        activeProjects: freelanceJobs.length,
        nextDeadline: freelanceJobs.length ? freelanceJobs[0].nextShift : '-',
        archivedJobs: jobs.filter(j => !j.isActive)
    };

    return {
        jobs: filteredJobs,
        allJobs: jobs,
        stats,
        filter,
        setFilter,
        addJob,
        updateJob,
        deleteJob,
        archiveJob,
    };
}

