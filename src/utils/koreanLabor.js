// Korean Labor Law Calculations (2026 기준)
export const KOREAN_LABOR = {
    // 2026년 최저시급 (예상)
    MINIMUM_WAGE: 10030,

    // 야간수당: 22:00 ~ 06:00 근무 시 +50%
    NIGHT_BONUS_RATE: 0.5,

    // 연장수당: 8시간 초과 근무 시 +50%
    OVERTIME_BONUS_RATE: 0.5,
    REGULAR_HOURS_PER_DAY: 8,

    // 주휴수당: 주 15시간 이상 근무 시 지급
    WEEKLY_HOLIDAY_THRESHOLD: 15,

    // 식비 (비과세 한도)
    MEAL_ALLOWANCE_LIMIT: 200000,

    // 세율 (2025-2026 기준 대략)
    TAX_RATES: {
        NONE: 0,
        BUSINESS_INCOME: 0.033, // 3.3% (사업소득세 3% + 지방소득세 0.3%)
        FOUR_MAJOR_INSURANCE: 0.0945, // 약 9.4% (국민연금 4.5% + 건강보험 3.545% + 요양 0.46% + 고용 0.9%)
    }
};

/**
 * 주휴수당 계산
 */
export function calculateWeeklyHolidayPay(weeklyHours, hourlyRate) {
    if (weeklyHours < KOREAN_LABOR.WEEKLY_HOLIDAY_THRESHOLD) {
        return { eligible: false, amount: 0 };
    }
    // (주 40시간 기준) 8시간 * 시급
    // (주 x시간) (x/40)*8 * 시급
    const holidayHours = Math.min((weeklyHours / 40) * 8, 8);
    const amount = Math.floor(holidayHours * hourlyRate);
    return { eligible: true, amount };
}

/**
 * 월급 상세 계산 (한국 노동법 기준)
 */
export function calculateMonthlyBreakdown(job) {
    const {
        type = 'HOURLY',
        salaryType = 'MONTHLY',
        hourlyRate,
        hoursPerWeek = 20,
        nightHoursPerWeek = 0,
        mealAllowance = 0,
        taxType = 'NONE' // 'NONE', 'BUSINESS', 'INSURANCE'
    } = job;

    let basePay, weeklyHolidayPay, nightPay, overtimePay, grossPay;

    if (type === 'SALARY') {
        // Salary Mode: hourlyRate is actually the fixed salary amount
        const annualSalary = salaryType === 'ANNUAL' ? hourlyRate : hourlyRate * 12;
        const monthlySalary = salaryType === 'ANNUAL' ? Math.floor(hourlyRate / 12) : hourlyRate;

        grossPay = monthlySalary;
        basePay = Math.max(0, grossPay - mealAllowance); // Assume Meal Allowance is included in Gross
        weeklyHolidayPay = 0; // Included in salary
        nightPay = 0; // Included in salary usually
        overtimePay = 0; // Included
    } else {
        // Hourly Mode
        // 월 기준 주 수 (4.345주)
        const weeksPerMonth = 4.345;

        basePay = Math.floor(hoursPerWeek * hourlyRate * weeksPerMonth);
        const weeklyHoliday = calculateWeeklyHolidayPay(hoursPerWeek, hourlyRate);
        weeklyHolidayPay = Math.floor(weeklyHoliday.amount * weeksPerMonth);
        nightPay = Math.floor(nightHoursPerWeek * hourlyRate * KOREAN_LABOR.NIGHT_BONUS_RATE * weeksPerMonth);
        const overtimeHours = Math.max(0, hoursPerWeek - 40);
        overtimePay = Math.floor(overtimeHours * hourlyRate * KOREAN_LABOR.OVERTIME_BONUS_RATE * weeksPerMonth);

        grossPay = basePay + weeklyHolidayPay + nightPay + overtimePay + mealAllowance;
    }

    // 세금 계산
    let taxRate = 0;
    if (taxType === 'BUSINESS') taxRate = KOREAN_LABOR.TAX_RATES.BUSINESS_INCOME; // 3.3%
    else if (taxType === 'INSURANCE') taxRate = KOREAN_LABOR.TAX_RATES.FOUR_MAJOR_INSURANCE; // ~9.4%

    // 식비는 비과세 (통상적으로 20만원까지)
    const taxableIncome = Math.max(0, grossPay - Math.min(mealAllowance, KOREAN_LABOR.MEAL_ALLOWANCE_LIMIT));
    const taxAmount = Math.floor(taxableIncome * taxRate);
    const netPay = grossPay - taxAmount;

    return {
        basePay,
        weeklyHolidayPay,
        nightPay,
        overtimePay,
        mealAllowance,
        grossPay,
        taxAmount,
        netPay,
        taxRate,
    };
}

/**
 * 프리랜서/외주 예상 세금 계산 (종소세 신고용)
 * - 보통 3.3% 원천징수된 금액을 받음
 * - 5월 종소세 신고 시 결정세액에 따라 환급받거나 추가 납부
 * - 여기서는 5월 신고 대상 금액(총 수입금액)과 기납부세액(3.3%)을 계산해줌
 */
export function calculateFreelanceTax(totalIncome) {
    const withholdingTax = Math.floor(totalIncome * 0.033); // 3.3% 기납부세액
    const netIncome = totalIncome - withholdingTax; // 실수령액

    return {
        totalIncome,
        withholdingTax, // 3.3% 떼인 돈 (기납부세액)
        netIncome,      // 통장에 들어오는 돈
        reportTarget: totalIncome // 5월에 신고해야 할 총 수입금액
    };
}

/**
 * 시급이 최저시급 이상인지 확인
 */
export function checkMinimumWage(hourlyRate) {
    return {
        isValid: hourlyRate >= KOREAN_LABOR.MINIMUM_WAGE,
        minimumWage: KOREAN_LABOR.MINIMUM_WAGE,
        difference: hourlyRate - KOREAN_LABOR.MINIMUM_WAGE
    };
}

/**
 * 숫자를 한국 원화 형식으로 포맷
 */
export function formatKRW(amount) {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0
    }).format(amount);
}
