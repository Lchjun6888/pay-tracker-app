import React, { useState, useEffect, useRef } from 'react';
import { brandIcons } from '../hooks/useJobs';
import { KOREAN_LABOR, checkMinimumWage, formatKRW } from '../utils/koreanLabor';

const categories = [
    { name: 'HOSPITALITY', label: '외식/서비스', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' },
    { name: 'EDUCATION', label: '교육/과외', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    { name: 'GIG ECONOMY', label: '배달/택배', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
    { name: 'RETAIL', label: '마트/편의점', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    { name: 'OFFICE', label: '사무/행정', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
    { name: 'DESIGN', label: '디자인/창작', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' },
    { name: 'MEDIA', label: '미디어/영상', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300' },
    { name: 'CONSTRUCTION', label: '시공/견적', color: 'bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300' },
    { name: 'FREELANCE', label: '기타 프리랜서', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' },
];

export default function AddJobModal({ isOpen, onClose, onAdd, editingJob }) {
    const [jobType, setJobType] = useState('HOURLY');
    const [salaryType, setSalaryType] = useState('MONTHLY');
    const [weeklySchedule, setWeeklySchedule] = useState({});
    const [selectedDayId, setSelectedDayId] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        category: 'HOSPITALITY',
        hourlyRate: '',
        nextShift: '',
        icon: 'fas fa-briefcase',
        hoursPerWeek: 20,
        nightHoursPerWeek: 0,
        mealAllowance: 0,
        taxType: 'NONE',
    });

    const daysOfWeek = [
        { id: 'Mon', label: '월' },
        { id: 'Tue', label: '화' },
        { id: 'Wed', label: '수' },
        { id: 'Thu', label: '목' },
        { id: 'Fri', label: '금' },
        { id: 'Sat', label: '토' },
        { id: 'Sun', label: '일' },
    ];

    useEffect(() => {
        if (editingJob) {
            setJobType(editingJob.type || 'HOURLY');
            setSalaryType(editingJob.salaryType || 'MONTHLY');

            const scheduleMap = {};
            if (editingJob.schedule?.days) {
                if (editingJob.schedule.details) {
                    setWeeklySchedule(editingJob.schedule.details);
                } else if (editingJob.schedule.days && editingJob.schedule.time) {
                    editingJob.schedule.days.forEach(day => {
                        scheduleMap[day] = editingJob.schedule.time;
                    });
                    setWeeklySchedule(scheduleMap);
                }
            } else {
                setWeeklySchedule({});
            }

            setFormData({
                title: editingJob.title,
                company: editingJob.company,
                category: editingJob.category,
                hourlyRate: editingJob.hourlyRate.toString(),
                nextShift: editingJob.nextShift,
                icon: editingJob.icon || 'fas fa-briefcase',
                hoursPerWeek: editingJob.hoursPerWeek || 20,
                nightHoursPerWeek: editingJob.nightHoursPerWeek || 0,
                mealAllowance: editingJob.mealAllowance || 0,
                taxType: editingJob.taxType || 'NONE',
            });
        } else {
            resetForm();
        }
    }, [editingJob, isOpen]);

    const resetForm = () => {
        setJobType('HOURLY');
        setSalaryType('MONTHLY');
        setWeeklySchedule({});
        setSelectedDayId(null);
        setFormData({
            title: '',
            company: '',
            category: 'HOSPITALITY',
            hourlyRate: '',
            nextShift: '',
            icon: 'fas fa-briefcase',
            hoursPerWeek: 20,
            nightHoursPerWeek: 0,
            mealAllowance: 0,
            taxType: 'NONE',
        });
    };

    if (!isOpen) return null;

    const handleBrandSelect = (brand) => {
        setFormData({
            ...formData,
            icon: brand.icon,
            company: brand.name === 'Custom' ? formData.company : brand.name,
        });
    };

    const handleDayToggle = (dayId) => {
        if (weeklySchedule[dayId]) {
            // If already selected, remove it
            const newSchedule = { ...weeklySchedule };
            delete newSchedule[dayId];
            setWeeklySchedule(newSchedule);
            if (selectedDayId === dayId) setSelectedDayId(null);
            calculateTotalHours(newSchedule);
        } else {
            // If adding, add with default or currently editing time
            // If a day is currently selected (as template), copy its time, else default 09-18
            const defaultTime = selectedDayId && weeklySchedule[selectedDayId]
                ? weeklySchedule[selectedDayId]
                : { start: '09:00', end: '18:00' };

            const newSchedule = { ...weeklySchedule, [dayId]: defaultTime };
            setWeeklySchedule(newSchedule);
            setSelectedDayId(dayId); // Auto-select newly added day to edit
            calculateTotalHours(newSchedule);
        }
    };

    const handleTimeChange = (type, value) => {
        if (!selectedDayId) return; // Should not happen ideally

        const currentDayTime = weeklySchedule[selectedDayId] || { start: '09:00', end: '18:00' };
        const newTime = { ...currentDayTime, [type]: value };

        const newSchedule = { ...weeklySchedule, [selectedDayId]: newTime };
        setWeeklySchedule(newSchedule);
        calculateTotalHours(newSchedule);
    };

    const calculateTotalHours = (schedule) => {
        let totalHours = 0;

        Object.values(schedule).forEach(({ start, end }) => {
            if (!start || !end) return;
            const startTime = new Date(`2000-01-01T${start}`);
            const endTime = new Date(`2000-01-01T${end}`);

            let diff = (endTime - startTime) / (1000 * 60 * 60); // hours
            if (diff < 0) diff += 24; // Handle overnight
            totalHours += diff;
        });

        setFormData(prev => ({
            ...prev,
            hoursPerWeek: Math.round(totalHours * 10) / 10
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCategory = categories.find(c => c.name === formData.category);

        const dayKeys = Object.keys(weeklySchedule);
        const schedule = {
            days: dayKeys, // Keep for backward compatibility or easy checking
            details: weeklySchedule // Detailed per-day time
        };

        // Generate summary string
        let summary = '';
        if (jobType === 'HOURLY') {
            summary = dayKeys.length > 0
                ? `${dayKeys.join(', ')} (주 ${formData.hoursPerWeek}시간)`
                : '';
        } else if (jobType === 'SALARY') {
            summary = salaryType === 'MONTHLY' ? '월급제 (고정급)' : '연봉제 (고정급)';
        }

        onAdd({
            ...formData,
            type: jobType,
            salaryType: jobType === 'SALARY' ? salaryType : null,
            hourlyRate: parseInt(formData.hourlyRate) || 0,
            categoryColor: selectedCategory?.color || categories[0].color,
            schedule,
            nextShift: formData.nextShift || summary
        });
        onClose();
    };

    const filteredBrands = brandIcons.filter(b => b.category === 'ALL' || b.category === formData.category);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {editingJob ? '직업 수정' : '새로운 직업 추가'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition cursor-pointer"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Job Type Toggle */}
                <div className="px-5 pt-5">
                    <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setJobType('HOURLY')}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition cursor-pointer
                ${jobType === 'HOURLY'
                                    ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            알바 (시급)
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setJobType('SALARY');
                                if (formData.category === 'HOSPITALITY') {
                                    setFormData({ ...formData, category: 'OFFICE' }); // Auto-switch category guess
                                }
                            }}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition cursor-pointer
                ${jobType === 'SALARY'
                                    ? 'bg-white dark:bg-slate-600 text-green-600 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            정규직 (월급/연봉)
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setJobType('FREELANCE');
                                if (formData.category === 'HOSPITALITY') {
                                    setFormData({ ...formData, category: 'FREELANCE' });
                                }
                            }}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition cursor-pointer
                ${jobType === 'FREELANCE'
                                    ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            외주 (건당)
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">

                    {(jobType === 'HOURLY' || jobType === 'SALARY') && (
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-100 dark:border-primary-800/30">
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                <i className="fas fa-calendar-alt text-primary-500"></i> 근무 요일 & 시간 설정
                            </label>

                            {/* Day Selection */}
                            <div className="flex justify-between gap-1 mb-4">
                                {daysOfWeek.map(day => {
                                    const isSelected = !!weeklySchedule[day.id];
                                    const isEditing = selectedDayId === day.id;
                                    return (
                                        <button
                                            key={day.id}
                                            type="button"
                                            onClick={() => isSelected ? setSelectedDayId(day.id) : handleDayToggle(day.id)}
                                            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-bold transition flex items-center justify-center
                        ${isSelected
                                                    ? isEditing
                                                        ? 'bg-primary-600 text-white ring-2 ring-primary-300 dark:ring-primary-700'
                                                        : 'bg-primary-400 text-white opacity-80'
                                                    : 'bg-white dark:bg-slate-700 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-600'
                                                }`}
                                        >
                                            {day.label}
                                            {isSelected && (
                                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-3 text-right">
                                * 요일을 클릭하여 추가/편집하세요.
                            </p>

                            {/* Individual Time Selection */}
                            {selectedDayId ? (
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-slate-700 animate-fadeIn">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-primary-600 dark:text-primary-400">
                                            {daysOfWeek.find(d => d.id === selectedDayId)?.label}요일 근무 시간
                                        </span>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); handleDayToggle(selectedDayId); }}
                                            className="text-xs text-red-500 hover:text-red-700 underline"
                                        >
                                            요일 삭제
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">시작</label>
                                            <input
                                                type="time"
                                                value={weeklySchedule[selectedDayId]?.start || ''}
                                                onChange={(e) => handleTimeChange('start', e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">종료</label>
                                            <input
                                                type="time"
                                                value={weeklySchedule[selectedDayId]?.end || ''}
                                                onChange={(e) => handleTimeChange('end', e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4 bg-gray-100 dark:bg-slate-700/30 rounded-lg border border-dashed border-gray-300 dark:border-slate-600 text-gray-400 text-sm">
                                    근무 요일을 선택하면 시간을 설정할 수 있습니다.
                                </div>
                            )}
                        </div>
                    )}

                    {/* SALARY SPECIFIC INPUTS */}
                    {jobType === 'SALARY' && (
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/30">
                            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                <i className="fas fa-coins text-green-500"></i> 급여 방식 설정
                            </label>
                            <div className="flex gap-2 mb-3">
                                <button
                                    type="button"
                                    onClick={() => setSalaryType('MONTHLY')}
                                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${salaryType === 'MONTHLY' ? 'bg-white border-green-500 text-green-600 shadow-sm' : 'border-gray-200 text-gray-500'}`}
                                >
                                    월급
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSalaryType('ANNUAL')}
                                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${salaryType === 'ANNUAL' ? 'bg-white border-green-500 text-green-600 shadow-sm' : 'border-gray-200 text-gray-500'}`}
                                >
                                    연봉
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Basic Inputs */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {jobType === 'HOURLY' ? '알바 이름' : jobType === 'SALARY' ? '직업 / 회사명' : '프로젝트/의뢰명'}
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none transition text-sm"
                            placeholder={jobType === 'HOURLY' ? "예: 오전 근무" : jobType === 'SALARY' ? "예: 삼성전자 마케팅팀" : "예: 웹사이트 디자인"}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">카테고리</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none transition cursor-pointer text-sm"
                            >
                                {categories.map(cat => (
                                    <option key={cat.name} value={cat.name}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {jobType === 'HOURLY' ? '시급 (₩)' : jobType === 'SALARY' ? (salaryType === 'MONTHLY' ? '월 급여 (세전) (₩)' : '연봉 (세전) (₩)') : '건당 금액 (₩)'}
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.hourlyRate ? Number(formData.hourlyRate).toLocaleString() : ''}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/,/g, '');
                                    if (!isNaN(val)) setFormData({ ...formData, hourlyRate: val });
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none transition text-sm"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-1.5">
                        {filteredBrands.map((brand) => (
                            <button
                                key={brand.name}
                                type="button"
                                onClick={() => handleBrandSelect(brand)}
                                className={`p-2 rounded-lg border-2 transition cursor-pointer
                      ${formData.icon === brand.icon
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                        : 'border-gray-200 dark:border-slate-600 hover:border-gray-300'
                                    }`}
                            >
                                <i className={`${brand.icon} text-lg text-gray-700 dark:text-gray-300`}></i>
                            </button>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {jobType === 'HOURLY' ? '회사 / 지점' : '회사 / 클라이언트'}
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none transition text-sm"
                        />
                    </div>

                    {/* TAX SETTINGS */}
                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <i className="fas fa-percent text-red-500"></i> 세금 설정
                        </h3>

                        <div className="flex gap-2 mb-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, taxType: 'NONE' })}
                                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${formData.taxType === 'NONE' ? 'bg-white border-primary-500 text-primary-600 shadow-sm' : 'border-gray-200 text-gray-500'}`}
                            >
                                미적용 (0%)
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, taxType: 'BUSINESS' })}
                                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${formData.taxType === 'BUSINESS' ? 'bg-white border-primary-500 text-primary-600 shadow-sm' : 'border-gray-200 text-gray-500'}`}
                            >
                                3.3% 공제
                            </button>
                            {jobType !== 'FREELANCE' && (
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, taxType: 'INSURANCE' })}
                                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${formData.taxType === 'INSURANCE' ? 'bg-white border-primary-500 text-primary-600 shadow-sm' : 'border-gray-200 text-gray-500'}`}
                                >
                                    4대보험
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Korean Labor Settings - Only for Hourly */}
                    {(jobType === 'HOURLY' || jobType === 'SALARY') && (
                        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                            {jobType === 'HOURLY' ? (
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <i className="fas fa-calculator text-primary-500"></i> 근무 시간 설정
                                </h3>
                            ) : (
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <i className="fas fa-utensils text-primary-500"></i> 추가 수당
                                </h3>
                            )}
                            <div className="grid grid-cols-2 gap-3">
                                {jobType === 'HOURLY' && (
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">주간 근무시간 (자동계산)</label>
                                        <input
                                            type="number"
                                            value={formData.hoursPerWeek}
                                            readOnly
                                            className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-500 dark:text-white text-sm bg-gray-100 dark:bg-slate-700/50 cursor-not-allowed"
                                        />
                                    </div>
                                )}
                                <div className={jobType === 'SALARY' ? 'col-span-2' : ''}>
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">식비 (월/비과세)</label>
                                    <input
                                        type="text"
                                        value={formData.mealAllowance ? Number(formData.mealAllowance).toLocaleString() : ''}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/,/g, '');
                                            if (!isNaN(val)) setFormData({ ...formData, mealAllowance: parseInt(val) || 0 });
                                        }}
                                        className="w-full px-2 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Next Shift / Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {jobType === 'HOURLY' ? '근무 요약 (자동)' : jobType === 'SALARY' ? '급여일' : '제출일 (마감일)'}
                        </label>
                        <input
                            type="text"
                            value={formData.nextShift}
                            onChange={(e) => setFormData({ ...formData, nextShift: e.target.value })}
                            placeholder={
                                jobType === 'HOURLY'
                                    ? (Object.keys(weeklySchedule).length > 0 ? "자동 생성됨 (수정 가능)" : "")
                                    : (jobType === 'SALARY' ? "예: 매월 25일" : "마감일 입력")
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none transition text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white font-semibold py-3 rounded-xl shadow-md transition cursor-pointer
              ${jobType === 'HOURLY'
                                ? 'bg-primary-500 hover:bg-primary-600'
                                : jobType === 'SALARY'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-indigo-500 hover:bg-indigo-600'}`}
                    >
                        <i className={`fas ${editingJob ? 'fa-save' : 'fa-plus'} mr-2`}></i>
                        {editingJob ? '저장하기' : '추가하기'}
                    </button>
                </form>
            </div>
        </div>
    );
}
