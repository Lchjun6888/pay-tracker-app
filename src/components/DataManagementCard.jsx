import React from 'react';

export default function DataManagementCard({ jobs }) {
    const handleExport = () => {
        const dataStr = JSON.stringify(jobs, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `paytrack_backup_${new Date().toISOString().slice(0, 10)}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedJobs = JSON.parse(e.target.result);
                if (Array.isArray(importedJobs)) {
                    // Update localStorage directly
                    localStorage.setItem('pay-tracker-jobs', JSON.stringify(importedJobs));
                    alert('데이터가 성공적으로 복구되었습니다. 페이지를 새로고침합니다.');
                    window.location.reload();
                } else {
                    alert('올바른 백업 파일이 아닙니다.');
                }
            } catch (error) {
                alert('파일을 읽는 중 오류가 발생했습니다.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 dark:border-slate-700/50 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <i className="fas fa-shield-alt text-green-500"></i> 데이터 안전 관리
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        브라우저 저장소를 사용하므로, 기기를 바꾸거나 백업이 필요할 때 활용하세요.
                    </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={handleExport}
                        className="flex-1 sm:flex-none px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 transition flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-download"></i> 백업하기
                    </button>
                    <label className="flex-1 sm:flex-none px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 transition cursor-pointer flex items-center justify-center gap-2">
                        <i className="fas fa-upload"></i> 복구하기
                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                </div>
            </div>
        </div>
    );
}
