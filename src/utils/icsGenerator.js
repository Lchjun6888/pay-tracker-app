/**
 * Generates an iCalendar (ICS) file content for a given month's schedule
 * @param {Array} jobs - List of jobs with schedule details
 * @param {Date} date - The month to export (uses year and month)
 * @returns {string} - ICS format string
 */
export function generateICS(jobs, date) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed

    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let events = [];
    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Iterate through each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDayDate = new Date(year, month, day);
        const dayOfWeek = currentDayDate.getDay();
        const dayId = dayMap[dayOfWeek];

        // Check each job for a schedule on this day
        jobs.forEach(job => {
            if (job.isActive && (job.type === 'HOURLY' || !job.type)) {
                // Check if job is scheduled for this day of week
                // Support both old simple array format (e.g. ['Mon', 'Tue']) and new detailed format (e.g. { 'Mon': {start, end} })
                let scheduleTime = null;

                if (job.schedule?.details && job.schedule.details[dayId]) {
                    scheduleTime = job.schedule.details[dayId];
                } else if (job.schedule?.days?.includes(dayId)) {
                    // Fallback or old format handling if needed, though we moved to details
                    // If simple array is used, we might need a default time or check job.schedule.time
                    scheduleTime = job.schedule.time || { start: '09:00', end: '18:00' };
                }

                if (scheduleTime && scheduleTime.start && scheduleTime.end) {
                    // Create Event
                    const startDateTime = formatICSDate(currentDayDate, scheduleTime.start);
                    const endDateTime = formatICSDate(currentDayDate, scheduleTime.end);

                    events.push({
                        title: `${job.title} (${job.company})`,
                        start: startDateTime,
                        end: endDateTime,
                        description: `Role: ${job.category}\nRate: ${job.hourlyRate} KRW/hr`,
                        location: job.company
                    });
                }
            }
        });
    }

    // Build ICS String
    let icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//PayTrackerApp//KR',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
    ];

    events.forEach(event => {
        icsContent.push('BEGIN:VEVENT');
        icsContent.push(`SUMMARY:${event.title}`);
        icsContent.push(`DTSTART:${event.start}`);
        icsContent.push(`DTEND:${event.end}`);
        icsContent.push(`DESCRIPTION:${event.description}`);
        icsContent.push(`LOCATION:${event.location}`);
        icsContent.push('STATUS:CONFIRMED');
        icsContent.push('END:VEVENT');
    });

    icsContent.push('END:VCALENDAR');

    return icsContent.join('\r\n');
}

/**
 * Helper to format date/time for ICS (YYYYMMDDTHHmm00)
 */
function formatICSDate(date, timeString) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // timeString is "HH:mm"
    const [hours, minutes] = timeString.split(':');

    return `${year}${month}${day}T${hours}${minutes}00`;
}

/**
 * Helper to trigger share sheet (Mobile) or download (PC)
 */
export async function shareOrDownloadICS(content, filename = 'schedule.ics') {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const file = new File([blob], filename, { type: 'text/calendar' });

    // Try Native Share (Mobile)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
                title: '근무 일정 저장',
                text: '내 근무 일정을 캘린더에 추가합니다.',
            });
            return true; // Shared successfully
        } catch (error) {
            console.log('Share failed or canceled', error);
            // Fallback to download if share fails (e.g. user cancel)
        }
    }

    // Fallback: Download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false; // Downloaded
}
