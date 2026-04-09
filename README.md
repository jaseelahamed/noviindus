 NexLearn – Online Exam Platform

A complete JWT-based authentication + online exam system built using Next.js App Router, Redux Toolkit, Axios, TailwindCSS, and MUI.

This project includes:

Mobile OTP Authentication

User profile creation

JWT-protected routes

Online exam interface

Question navigation panel

Mark for review

Timer with auto-submit

Exam submission & result page

Refresh-safe authentication

Axios instance with dynamic token injection

 Tech Stack
Area	Technology
Frontend	Next.js 14 (App Router)
State Management	Redux Toolkit
Styling	Tailwind CSS + MUI
API Calls	Axios with interceptor
Authentication	JWT + OTP
Build Tool	Turbopack
Deployment	Vercel / Node Server
 Project Structure
/app
 ├── layout.tsx
 ├── providers.tsx
 ├── page.tsx                      ← Sign Up
 ├── exam-dashboard/
 │     ├── layout.tsx              ← Protected Layout
 │     ├── page.tsx                ← Exam Instructions
 │     └── test/
 │          ├── page.tsx           ← Main Exam Page
 │          └── components/
 │               ├── QuestionPanel.tsx
 │               ├── QuestionGrid.tsx
 │               ├── Timer.tsx
 │               ├── PassageModal.tsx
 │               └── SubmitModal.tsx
 └── result/
       └── page.tsx

/src
 ├── store/
 │     ├── store.ts
 │     └── examSlice.ts
 ├── features/
 │     └── auth/
 │           └── authSlice.ts
 ├── hooks/
 │     └── reduxHooks.ts
 └── lib/
       ├── axios.ts
       └── authToken.ts

 Authentication Flow
 Send OTP
POST /auth/send-otp


User enters mobile → API sends OTP.

 Verify OTP
POST /auth/verify-otp


If user exists:

API returns access_token

Redirect to exam dashboard

If new user:

Go to profile creation

 Create Profile
POST /auth/create-profile


Uploads name, email, qualification & profile image.

 Protected Routes

Exam dashboard & test pages require JWT token.

Handled using:

Redux access_token

Dynamic token loading from localStorage

Layout-level redirection

 Exam Features
 Fetch Questions
GET /question/list

 Track user’s answers

Answered

Not visited

Not answered

Marked for review

 Timer

Auto countdown

Pauses on unmount

Auto submit at 0

 Auto Submit

When timer finishes:

POST /answers/submit

 Submit Modal
 Passage Modal
  Question Grid Navigator
 Installation
 Install dependencies
npm install

Start development server

To avoid CORS issues, API server should run on localhost.

npm run dev


Project runs on:

http://localhost:3000

 Environment Variables

Create .env.local:

NEXT_PUBLIC_API_BASE=https://nexlearn.noviindusdemosites.in


(If needed, axios already uses static base URL inside /lib/axios.ts.)
 Axios Setup

Axios includes:

Dynamic token getter (no circular import)

JWT header auto-injection

401 handling

 Redux Setup
Auth Slice

Handles:

OTP

Verify OTP

Create profile

Token storage

Token loading on refresh

Exam Slice

Handles:

Fetch questions

Answer tracking

Timer

Mark for review

Submit exam

Save result

 Route Protection

Exam dashboard is protected in:

app/exam-dashboard/layout.tsx


Uses:

if (!access_token && !loadingAuth) router.replace("/");


Ensures refresh does not kick user out.

 Key Features to Highlight

 Full OTP-based login
 JWT authentication with persistence
 Protected exam routes
 Timer with auto-submit
 Ability to mark questions for review
 Clean responsive UI
 Refresh-safe
 Exam submission and results

 Build for Production
npm run build
npm run start

 Developer Notes

Avoid circular imports (solved using authToken.ts)

Redux state resets on refresh → fixed by loadTokens()

Timer & exam data are handled by Redux

Axios interceptors inject token safely

 Author

Developed by Sreedarsh P
Tech: Next.js, Tailwind, Redux Toolkit, Axios