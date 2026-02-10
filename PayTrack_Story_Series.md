# PayTrack Development Series: From Construction Site to Fintech Platform

---

## Episode 1: Why I Built PayTrack – The Unpaid Worker's Reality
**"Hyung-nim, when will the money come in?"**

This question echoes endlessly on construction sites across Korea.
It started there. I saw too many hardworking people—daily laborers, skilled technicians—sweating under the sun, only to face anxiety at the end of the month.
*"Did the foreman calculate my days correctly?"*
*"Is the company going to delay the payment again?"*

Construction sites are chaotic. Work logs are often scribbled on dusty notebooks or cigarette packs. If you lose that paper, you lose your proof of work. And without proof, you don't get paid.
I realized that **memory is not enough. We needed evidence.**

I wanted to build a tool that empowered the worker. A digital logbook that was undeniable.
Not just for construction workers, but for anyone who trades their time for money—freelancers, part-timers, tutors.
The mission was simple: **"Record your sweat, claim your worth."**
And thus, **PayTrack** was born.

---

## Episode 2: Designing for the Rough Hands UX
**From Paper Notebooks to a Mobile Dashboard**

The first version of PayTrack had to be simpler than a pen and paper.
Why? because on a construction site, you don't have time to navigate complex menus. Your hands are dirty, you're wearing gloves, and you just want to tap "Check-In" and go home.

**The Design Philosophy:**
1.  **Big Buttons:** I designed the interface with large, touch-friendly cards. No tiny links.
2.  **Dark Mode First:** Early mornings and late nights are common. A bright white screen is blinding. Dark mode wasn't just aesthetic; it was a necessity.
3.  **Visual Feedback:** When you log a day, the app needed to feel *satisfying*. I used bright colors (Green for Salary, Indigo for Freelance) to make earning money feel good.

I moved away from the boring "spreadsheet look" of typical finance apps. I wanted PayTrack to feel premium—like a personal secretary that respects your hard work.

---

## Episode 3: The Chaos of Income Types
**Hourly Wages, Monthly Salaries, and Project Fees**

Building the backend logic (`useJobs.js`) was tricky.
A construction worker gets paid a **daily rate** (Day Labor).
A cafe part-timer gets an **hourly rate**.
A freelance web designer gets a **project fee**.

How do you track all these in one app?
I had to create a flexible data model:
*   **HOURLY/DAILY:** Calculated by `Rate × Hours`.
*   **SALARY:** A fixed monthly sum, regardless of hours.
*   **FREELANCE:** One-time payments tied to deadlines.

The breakthrough was the "Unified Dashboard." Regardless of *how* you earned it, PayTrack normalizes everything into a single number: **"This Month's Total Income."**
Seeing that number grow in real-time gives users a sense of security and motivation.

---

## Episode 4: Adding a Human Touch
**"You worked hard today, Boss!"**

Finance apps are usually cold and robotic. They just show numbers.
But the people using PayTrack are tired. They need encouragement.
I decided to add a **Profile System** with a touch of warmth.
*   **Cute Avatars:** Instead of boring generic icons, users can choose from 6 cute animal characters (🐶🐱🐰 etc.). It adds a little joy to the daily login.
*   **Personalized Greetings:** The dashboard now greets you: *"Hello [Name], today is a great day!"*

It seems small, but this emotional connection turns a "calculator app" into a "partner." It reminds users that the app is on *their* side.

---

## Episode 5: Squashing the Bugs (The "Hospitality" Glitch)
**The Struggle for Stability**

Development wasn't smooth. We hit a frustrating bug where every new job defaulted to "Hospitality" (Restaurant Service).
Imagine a construction worker adding a "Daily Labor" job, and the app tagging it as "Waiter." It was confusing and annoying.

I dug into the code. The issue was in the `AddJobModal` component—the category state wasn't resetting properly when switching job types.
**The Fix:**
I rewrote the state management logic to be "controlled" and added automatic icon selection. Now, if you select "Construction," the app automatically suggests a 👷 helmet icon.
We also added **Toast Notifications**. Now, when you save your data, a little popup says *"Saved Successfully!"*. It's reassurance that your hard work is safely recorded.

---

## Episode 6: The Vision – From Tracker to Fintech
**"The Digital Bill of Rights"**

PayTrack is currently a "Passive Tracker"—it just records what happened.
But my vision is **"Active Finance."**

Why stop at recording?
Why can't the app **send the bill** for me?
Why can't it **verify my career**?

**The Roadmap for 2026:**
1.  **Direct Pay Request:** Users will be able to generate a "Digital Invoice" from their work logs and send it to their employer via KakaoTalk.
2.  **Escrow (Safe Deal):** For freelancers, PayTrack will hold the money until the job is done, preventing the "client ghosting" nightmare.
3.  **Career Passport:** Your verified work history on PayTrack will become a resume itself. Proving you are diligent, punctual, and reliable.

PayTrack started on a dusty construction site to solve unpaid wages.
It will end up as the **standard platform for fair work and fair pay.**

---
