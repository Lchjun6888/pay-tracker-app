# 🏗️ Episode 3: Taming the Chaos of Pay (SEO Optimized)

## 📌 SEO & Metadata Setup

| Field | Content |
| :--- | :--- |
| **Focus Keyword** | Freelance Pay Tracker, Hourly Wage Calculator, Gig Economy Finance App |
| **Blog Title (H1)** | **Hourly vs. Project Fees: One Dashboard to Rule Them All** |
| **SEO Title (Meta)** | How to Track Freelance & Hourly Income in One App |
| **URL Slug** | `track-freelance-hourly-salary-income-app` |
| **Meta Description** | Whether you earn by the hour, the month, or the project, tracking income is a nightmare. See how PayTrack unified diverse income streams into one simple dashboard. |

---

## 📸 Image Metadata

**Image 1: The 'Job Type' Code Logic**
*   **Alt Text:** Code snippet showing the `useJobs.js` hook calculating income for HOURLY, SALARY, and FREELANCE types.
*   **Image Title:** React_Income_Calculation_Hook
*   **Caption:** The brain of PayTrack: normalizing different pay structures.
*   **Description:** A screenshot of the JavaScript `reduce` function that sums up total expected income based on job type.

**Image 2: The Unified Dashboard**
*   **Alt Text:** PayTrack dashboard showing a mix of a Starbucks job (Hourly) and a Web Design project (Freelance).
*   **Image Title:** PayTrack_Unified_Dashboard_View
*   **Caption:** One view for all your hustles.
*   **Description:** The final UI showing how different job cards coexist harmoniously on the main screen.

---

## 📝 Blog Content (Episode 3)

### The "Gig Worker's Puzzle"

If you work a 9-to-5, your paycheck is simple.
But for the rest of us—the hustlers, the freelancers, the part-timers—it’s a mess.

Imagine a user like **Min-su**:
1.  **Morning:** Works at a construction site (Daily Daily Wage).
2.  **Afternoon:** Tuts English (Hourly Wage).
3.  **Night:** Designs a website for a startup (Project Fee).

How do you track this in Excel?
*   Column A: Rate per Hour... wait, the design job has no hourly rate.
*   Column B: Monthly Salary... wait, the construction job varies every week.
It breaks the spreadsheet. And it breaks most apps.

### The Engineering Challenge: Polymorphic Data

I realized that **PayTrack** couldn't just be a simple calculator. It needed a flexible brain.
I had to architect a data model that could handle three distinct "species" of income without confusing the user.

**1. The Hourly Calculation (For Service/Tutors)**
*   Formula: `Rate × Hours × Days`
*   Input: "I work Mon/Wed/Fri for 4 hours."
*   UX: Auto-generates a calendar schedule.

**2. The Salary Calculation (For Contracts)**
*   Formula: `Annual Salary / 12`
*   Input: "I earn 30 million won a year."
*   UX: Shows a steady progress bar towards payday.

**3. The Freelance/Project Calculation (The Tricky One)**
*   Formula: `Fixed Fee upon Completion`
*   Input: "Project due Feb 25, Fee 1.5 million won."
*   UX: Shows a "Deadline Countdown" instead of a weekly schedule.

### The "Unifying Theory" of Income

The breakthrough came when I decided to normalize everything into a single metric: **"Monthly Potential Income."**

Regardless of *how* you earn it, PayTrack answers one question:
**"If I finish everything this month, how much lands in my pocket?"**

I wrote a custom hook, `useJobs.js`, that acts as a translator.
It takes these diverse inputs and speaks one language: **Total Value.**
*   Hourly jobs contribute their projected hours.
*   Freelance jobs contribute their fee if the deadline is this month.
*   Salaries contribute their monthly portion.

### Introducing "Badges of Honor"

To make this clear visually, I used color psychology.
*   **Green (Growth)**: Regular Salary jobs. Stable, growing like a tree.
*   **Indigo (Deep Focus)**: Freelance/Project work. Professional, serious.
*   **Amber/Blue (Service)**: Hourly gigs. Bright, active.

Now, Min-su opens PayTrack and sees a beautiful mosaic of his work life.
The construction job sits next to the design project. They don't fight; they complement each other.
He sees that while the construction job pays the rent, the design project is the bonus that buys him a new laptop.

This isn't just accounting. It's **Life Management.**
In the next episode, I'll talk about how we made this financial tool less "boring" and more "human" with gamification.

*(To be continued...)*

---

## 🌍 Global Summary

**English (80%)**
A major challenge for gig workers is managing diverse income "species": Construction jobs pay daily, cafes pay hourly, and freelance projects pay a fixed fee upon completion.
Standard apps fail to aggregate these incompatible data types.
PayTrack solves this with a **Polymorphic Data Model** and the `useJobs.js` hook, which normalizes every income type into a single metric: **"Monthly Potential Income."**
I introduced a color-coded system (Green for Salary, Indigo for Project, Amber for Hourly) to visually organize a chaotic work life into a unified dashboard.
This episode details the engineering logic behind turning complex, multi-stream income into a simple, single number that answers the user's most important question: *"How much will I earn this month?"*

**Korean (20%)**
N잡러의 가장 큰 고민은 '수입의 형태'가 제각각이라는 것입니다. 현장직은 일당, 알바는 시급, 외주는 건당 보수를 받습니다.
PayTrack은 이 서로 다른 3가지 급여 체계(Daily, Hourly, Project)를 하나의 데이터 모델로 통합했습니다.
**`useJobs.js` 훅**을 통해 모든 수입을 **"이달의 예상 수령액"**이라는 하나의 숫자로 환산하여 보여줍니다.

---

## 🏷️ Tags
`#ReactHooks` `#DataModeling` `#FullStack` `#FreelanceLife` `#HourlyWage` `#IncomeTracker` `#JavascriptLogic` `#NJob` `#GigWorker` `#DeveloperDiary`
