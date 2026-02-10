# PayTrack Development Journey Series

## Episode 1: The Beginning of PayTrack
**Title: Why I Started Building PayTrack: The Need for Smarter Salary Management**

**Summary:**
This post introduces PayTrack, a personal project born out of the frustration of managing part-time and freelance income. It covers the initial problem statement: diverse income streams (hourly wages, freelance gigs, salaries) are hard to track in one place.

**Key Content:**
*   **The Problem:** Managing multiple income sources is chaotic. Excel is too manual, existing apps are too complex.
*   **The Vision:** A simple, intuitive app to track expected income vs. actual income.
*   **Tech Stack Choice:** React (Vite) for speed, Tailwind CSS for styling, and LocalStorage for immediate usability without a backend.
*   **Core Feature:** The "Dashboard" - a single view to see your monthly financial health at a glance.

---

## Episode 2: Designing a User-Centric Interface
**Title: UI/UX overhaul: From Spreadsheet to PWA**

**Summary:**
Focuses on the design evolution. Moving away from a boring data-entry look to a modern, card-based interface that feels like a premium app.

**Key Content:**
*   **Mobile-First Design:** Since users check their pay on the go, the app was designed as a PWA (Progressive Web App) from day one.
*   **Card UI:** Creating the `JobCard` component to visualize different job types (Hourly, Salary, Freelance) with distinct colors (Green for Salary, Indigo for Freelance).
*   **Dark Mode:** Implementing a toggle for Dark/Light mode using Tailwind's `dark:` class for accessibility and aesthetics.
*   **Navigation:** Simplification of the bottom navigation bar for easy access to Calendar, Dashboard, and Settings.

---

## Episode 3: Solving the Gig Worker's Dilemma
**Title: Handling Complex Income Types: Hourly, Salary, and Freelance**

**Summary:**
This post details the technical challenge of handling different pay structures within the same database schema.

**Key Content:**
*   **The Challenge:** An hourly barista job pays differently than a project-based web design gig.
*   **The Solution:** A flexible data model.
    *   **Hourly:** Rate * Hours worked.
    *   **Salary:** Fixed monthly/annual amount / 12.
    *   **Freelance:** Project-based fee with deadlines.
*   **Implementation:** How `useJobs.js` hook calculates `monthlyIncome` and `pendingIncome` dynamically based on job types.
*   **Visual Cues:** Adding distinct badges and icons for each job type to make them instantly recognizable.

---

## Episode 4: Adding Personality to Finance
**Title: Gamification and Personalization: Cute Avatars & Greetings**

**Summary:**
Discusses the recent update that added user customization to make the app feel less like a calculator and more like a companion.

**Key Content:**
*   **The Idea:** Finance apps are boring. Let's make it fun.
*   **Feature:** Implemented a `ProfileModal` allowing users to choose from 6 cute animal avatars (Dog, Cat, Rabbit, etc.).
*   **Tech:** Using Emoji as avatars for lightweight implementation and CSS gradients for a premium feel.
*   **Persisting State:** Saving user preferences (`userInfo`) to `localStorage` so the app "remembers" you.
*   **Result:** A personalized dashboard greeting ("Hello, [Name]! Today is a great day to earn money!").

---

## Episode 5: Squashing Bugs & Polishing UX
**Title: The Devil in the Details: Fixing Persistence and UI Glitches**

**Summary:**
A technical deep dive into recent bug fixes and quality-of-life improvements.

**Key Content:**
*   **Bug 1: The Sticky Category:** Fixed a bug where the dropdown menu kept defaulting to "Hospitality". Explanation of controlled vs. uncontrolled components in React.
*   **Bug 2: Vanishing Data:** Addressing the `localStorage` persistence issue on page refresh. Migrating to a robust `useEffect` synchronizer.
*   **Improvement:** Adding "Toast Notifications". Visual feedback (a small popup) when saving data gives users confidence that their action succeeded.
*   **Refactoring:** Cleaning up `App.jsx` and component props for better maintainability.

---

## Episode 6: The Future Roadmap
**Title: Vision 2026: From Tracker to Fintech Platform**

**Summary:**
Unveiling the ambitious roadmap to transform PayTrack into a social fintech platform for the gig economy.

**Key Content:**
*   **The Problem:** Tracking is good, but *getting paid* is better.
*   **Feature 1: One-Touch Pay Request:** Integrating Open Banking APIs to send formatted payment requests to employers via KakaoTalk/SMS.
*   **Feature 2: Platform Integration:** Plans to sync with Albamon/Kmong to auto-import work schedules and verify career history.
*   **Feature 3: The "Verified Worker" Badge:** Using PayTrack data to prove reliability to future employers.
*   **Architecture Shift:** The upcoming migration from LocalStorage to a full Backend (Supabase/Node.js) to support these features.
*   **Call to Action:** Looking for user feedback and beta testers for the new features.
