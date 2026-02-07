import { useState } from 'react';

const initialJobs = [
    {
        id: 1,
        title: '카페 오전 알바',
        company: '스타벅스 강남점',
        category: 'HOSPITALITY',
        categoryColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
        hourlyRate: 10300,
        nextShift: 'Mon, 8:00 AM',
        icon: 'fas fa-coffee',
        isActive: true,
        type: 'HOURLY',
        hoursPerWeek: 20,
    },
    {
        id: 2,
        title: '영어 과외',
        company: '김철수 학생',
        category: 'EDUCATION',
        categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        hourlyRate: 40000,
        nextShift: 'Wed, 4:00 PM',
        icon: 'fas fa-graduation-cap',
        isActive: true,
        type: 'HOURLY',
        hoursPerWeek: 4,
    },
    {
        id: 3,
        title: '웹사이트 디자인 외주',
        company: '스타트업 A',
        category: 'DESIGN',
        categoryColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
        hourlyRate: 1500000, // Per task
        nextShift: '2026.02.25', // Deadline
        icon: 'fas fa-paint-brush',
        isActive: true,
        type: 'FREELANCE',
    },
];

export const brandIcons = [
    { name: 'Starbucks', icon: 'fas fa-coffee', category: 'HOSPITALITY' },
    { name: 'McDonald\'s', icon: 'fas fa-hamburger', category: 'HOSPITALITY' },
    { name: 'Cafe', icon: 'fas fa-mug-hot', category: 'HOSPITALITY' },
    { name: 'Restaurant', icon: 'fas fa-utensils', category: 'HOSPITALITY' },
    { name: 'CGV', icon: 'fas fa-film', category: 'HOSPITALITY' },
    { name: 'CU 편의점', icon: 'fas fa-store', category: 'RETAIL' },
    { name: 'GS25', icon: 'fas fa-shopping-basket', category: 'RETAIL' },
    { name: '이마트', icon: 'fas fa-shopping-cart', category: 'RETAIL' },
    { name: 'Olive Young', icon: 'fas fa-spa', category: 'RETAIL' },
    { name: 'Coupang', icon: 'fas fa-box', category: 'GIG ECONOMY' },
    { name: '배달의민족', icon: 'fas fa-motorcycle', category: 'GIG ECONOMY' },
    { name: 'Uber/Taxi', icon: 'fas fa-car', category: 'GIG ECONOMY' },
    { name: 'Tutoring', icon: 'fas fa-graduation-cap', category: 'EDUCATION' },
    { name: 'Design', icon: 'fas fa-paint-brush', category: 'DESIGN' },
    { name: 'Coding', icon: 'fas fa-code', category: 'DESIGN' },
    { name: 'Video', icon: 'fas fa-video', category: 'MEDIA' },
    { name: 'Camera', icon: 'fas fa-camera', category: 'MEDIA' },
    { name: 'Construction', icon: 'fas fa-hard-hat', category: 'CONSTRUCTION' },
    { name: 'Tools', icon: 'fas fa-tools', category: 'CONSTRUCTION' },
    { name: 'Office', icon: 'fas fa-building', category: 'OFFICE' },
    { name: 'Computer', icon: 'fas fa-laptop', category: 'OFFICE' },
    { name: 'Custom', icon: 'fas fa-briefcase', category: 'ALL' },
];

export function useJobs() {
    const [jobs, setJobs] = useState(initialJobs);
    const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'archived'

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

    // Calculate stats separately for Hourly and Freelance
    const hourlyJobs = jobs.filter(j => j.isActive && (!j.type || j.type === 'HOURLY'));
    const freelanceJobs = jobs.filter(j => j.isActive && j.type === 'FREELANCE');

    const stats = {
        // Hourly Stats
        monthlyIncome: hourlyJobs.reduce((sum, job) => sum + (job.hourlyRate * (job.hoursPerWeek || 0) * 4), 0),
        avgHourly: hourlyJobs.length ? Math.round(hourlyJobs.reduce((sum, job) => sum + job.hourlyRate, 0) / hourlyJobs.length) : 0,
        activeHourly: hourlyJobs.length,
        totalHours: hourlyJobs.reduce((sum, job) => sum + (job.hoursPerWeek || 0), 0),

        // Freelance Stats
        pendingIncome: freelanceJobs.reduce((sum, job) => sum + job.hourlyRate, 0), // hourlyRate stores task amount
        activeProjects: freelanceJobs.length,
        nextDeadline: freelanceJobs.length ? freelanceJobs[0].nextShift : '-',
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
