export const CATEGORIES = [
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

export const getCategoryLabel = (name) => {
    return CATEGORIES.find(c => c.name === name)?.label || name;
};

export const getCategoryColor = (name) => {
    return CATEGORIES.find(c => c.name === name)?.color || CATEGORIES[0].color;
};
