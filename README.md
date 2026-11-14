# CyberSafe – Cyber Safety & Digital Literacy for All

A production-ready digital education platform built for an NGO mission to empower students, parents, teachers, senior citizens, and everyday internet users with practical cyber safety skills and awareness.

---

## 🌟 Key Features

### 1. Linear-Style Animated Landing Page (`/`)
- Preserved high-fidelity scroll storytelling with Framer Motion animations
- Interactive scam breakdown simulator (urgent SMS, KYC fraud, fake bank link alerts)
- Interactive quiz preview with instant explanations
- Visual progress dashboard preview
- Audience cards tailored for Students, Parents, Senior Citizens, and Teachers
- Educational resources section & NGO mission impact metrics
- Responsive sticky navigation with smooth-scrolling anchors

### 2. Complete Authentication System (Supabase Auth)
- **Sign In** (`/signin`) with validation, show/hide password, and loading states
- **Sign Up** (`/signup`) with user category selection (Student, Parent, Teacher, Senior Citizen, Other), password strength meter, and terms agreement
- **Forgot Password** (`/forgot-password`) & **Reset Password** (`/reset-password`) recovery flow
- Persistent session handling via React AuthContext
- Automatic redirect to `/dashboard` when authenticated
- Protected route barriers with role-based access control (RBAC)

### 3. Personalized User Dashboard (`/dashboard`)
- Dynamic welcome banner with category-tailored guidance
- Live learning statistics (modules completed, quizzes attempted, average score, earned badges)
- "Continue Learning" card pointing directly to in-progress lessons
- Category-based module recommendations
- Recent activity feed showing completed lessons and quiz scores
- Helpful empty states for new learners

### 4. Educational Learning Modules (`/learn` and `/learn/:slug`)
10 comprehensive, beginner-friendly educational modules with India-specific context (UPI, OTP, Aadhaar, PAN, Cyber Crime Helpline 1930):
1. **Password Security** — Passphrases, credential stuffing, password managers, 2FA
2. **Phishing and Online Scams** — Spotting deceptive emails, fake KYC SMS, spoofed domains
3. **Social Media Safety** — Privacy settings, social engineering, oversharing dangers
4. **Online Privacy** — App permissions, tracking cookies, incognito mode myths
5. **Cyberbullying** — Recognizing digital harassment, documentation, reporting, bystander action
6. **Digital Payment Safety** — UPI PIN rules, fake QR scams, collect request alerts, 1930 reporting
7. **Safe Browsing and Public Wi-Fi** — HTTPS vs HTTP, Wi-Fi eavesdropping, VPNs, evil twins
8. **Identity Protection** — Aadhaar/PAN misuse, synthetic identity theft, credit freezing
9. **Misinformation and Fake News** — WhatsApp forwards, reverse image search, source verification
10. **Smartphone Security** — Sideloading risks, screen locks, app permissions, remote wipe

Each module includes:
- Objectives, estimated reading time, difficulty tags
- Section-by-section breakdown with Warning Signs, Actionable Dos & Don'ts, and Pro Tips
- "Mark as Complete" database synchronization
- Direct link to the associated quiz

### 5. Interactive Quiz Engine (`/quiz` and `/quiz/:id`)
- 10 quizzes corresponding to each learning module (5 questions each = 50 total questions)
- Realistic situational scenarios with multi-choice options
- Instant score calculation with percentage-based badge awards
- Detailed explanation for every question (correct and incorrect)
- Quiz history and best score tracking stored in Supabase

### 6. Interactive Cyber-Safety Tools (`/tools`)
Four hands-on client-side security tools designed strictly for education:
- **Password Strength Checker**: Real-time entropy, length, character diversity, dictionary pattern warnings, crack time estimates, and strong passphrase generator
- **Phishing & Scam Simulator**: Interactive SMS, email, and WhatsApp messages where users inspect red flags, urgency tactics, and spoofed domains
- **URL Safety Inspector**: Client-side breakdown of protocols, subdomains, typosquatting (punycode/lookalikes), TLD risk analysis, and safety tips
- **Incident Guidance Assistant**: Step-by-step triage decision tree for financial fraud, hacked accounts, cyberbullying, or identity theft (featuring immediate dial links to National Cyber Crime Helpline `1930` and `cybercrime.gov.in`)

### 7. Educational Resources Library (`/resources`)
- Curated downloadable guides, emergency checklists, printable security posters, and government links
- Filter by resource type (Guide, Checklist, Template, External) and category
- Search across titles and descriptions with an in-app reader modal

### 8. Analytics & Achievements (`/progress`)
- Real progress metrics calculated from database tables
- 4 milestone achievement badges (First Step, Quiz Whiz, Security Scholar, Cyber Champion)
- Complete history of attempted quizzes with timestamps and scores

### 9. User Profile & Settings (`/profile`)
- Update full name and user category
- Password change flow
- Sign out confirmation modal

### 10. NGO Administration Panel (`/admin`)
Restricted to users with `role = 'admin'` in `profiles`:
- **Overview** (`/admin`): Live count of users, modules, quiz attempts, and recent sign-ups
- **Manage Modules** (`/admin/modules`): Full CRUD, publish/unpublish toggle, reordering
- **Manage Quizzes** (`/admin/quizzes`): Quiz and question editor
- **Manage Resources** (`/admin/resources`): Resource CRUD with direct links
- **Manage Users** (`/admin/users`): Searchable user directory with role elevation/demotion

### 11. Public & Legal Pages
- `/privacy` — Comprehensive privacy policy for an educational NGO
- `/terms` — Terms of use and educational disclaimer
- `/contact` — Contact directory with emergency cybercrime reporting helplines
- `*` — Custom 404 Not Found page

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite 5
- **Language**: JavaScript (ES modules)
- **Styling**: Tailwind CSS 3 with custom design tokens (`glass-card`, `btn-primary`, `shimmer`)
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Routing**: React Router DOM 6
- **Database & Auth**: Supabase PostgreSQL + Supabase Auth
- **Security**: Row Level Security (RLS) enabled on all tables; anon key only on the frontend

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- A free [Supabase](https://supabase.com) project (optional for initial preview)

### Installation

1. **Clone the repository and enter the directory**:
   ```bash
   cd cybersafe-landing
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   > **Note on Offline/Preview Mode:** If you do not configure Supabase credentials, the application will still launch! It runs gracefully in preview mode with helpful alerts indicating that live database operations require Supabase.

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🗄️ Supabase Setup & Database Migration

To enable real authentication, user progress, quiz results, and admin management:

1. **Create a new Supabase project** at [database.new](https://database.new).
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Open and copy the contents of `supabase/migrations/001_initial_schema.sql` and click **Run**.
   - This creates tables: `profiles`, `modules`, `quizzes`, `quiz_questions`, `lesson_progress`, `quiz_attempts`, `quiz_responses`, and `resources`.
   - It sets up trigger-based profile creation on user signup.
   - It activates strict **Row Level Security (RLS)** policies so users can only access their own data.
4. (Optional) Run `supabase/seed.sql` to populate initial module and resource rows into the database.
5. In your Supabase dashboard, go to **Project Settings → API** and copy:
   - **Project URL** → Paste into `VITE_SUPABASE_URL` in `.env`
   - **Project API Anon Key** → Paste into `VITE_SUPABASE_ANON_KEY` in `.env`

### Setting Up Password Recovery Redirects
1. In your Supabase dashboard, navigate to **Authentication → URL Configuration**.
2. Under **Redirect URLs**, add:
   ```
   http://localhost:5173/reset-password
   https://your-production-domain.com/reset-password
   ```

### Creating Your First Admin User
1. Register a new account via the `/signup` page in the app.
2. In your Supabase dashboard, open the **Table Editor** → `profiles` table (or run this in the **SQL Editor**):
   ```sql
   UPDATE profiles
   SET role = 'admin'
   WHERE email = 'your-email@example.com';
   ```
3. Refresh the app. The **Admin Panel** link will now appear in your sidebar navigation, granting access to `/admin`.

---

## 🔒 Security & Privacy Notice

- **Never expose the Supabase service-role key** in frontend code or repository commits.
- **Client-Side Simulation**: All tools (Password Strength Checker, URL Inspector, Scam Simulator) execute 100% locally in the user's browser. Passwords and URLs entered into tools are never sent to any server or external API.
- **Official Emergency Contact**: In India, financial fraud must be reported immediately to **1930** or [cybercrime.gov.in](https://cybercrime.gov.in).

---

## 📄 License
Created for public benefit and non-profit digital literacy education.

