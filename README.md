# CarbonTech — Agricultural Carbon Credits & Biomass Supply Chain Platform

A production-ready climate-tech web platform connecting farmers, industries, and carbon credit buyers. Built with Next.js 15, Firebase, and AI-powered features.

## Features

### Public Pages
- **Landing Page** — Hero section, mission, impact stats, revenue calculator, testimonials
- **How It Works** — Step-by-step flow for farmers, industries, and companies
- **Farmers / Industries / Carbon Credits** — Info pages for each user segment
- **Marketplace** — Browse available biomass listings and carbon credit projects

### Authentication
- Email/password login & signup via Firebase Auth
- Role-based access: Farmer, Industry, Company, Admin, Verifier

### Role-Based Dashboards

**Farmer Dashboard**
- Farm management with Leaflet maps and geolocation
- Biomass listing CRUD (create, edit, delete, mark sold)
- Carbon credit tracking with charts and project list
- Revenue analytics with transaction history

**Industry Dashboard**
- Browse & filter biomass listings with search
- Order management with status tracking and progress indicators

**Company Dashboard**
- Buy carbon credits from verified projects
- Portfolio management with distribution charts and neutrality tracking

**Admin Dashboard**
- User management (search, filter, approve, suspend)
- Project management with status workflows
- Verification center for document review
- Platform analytics with charts and top-farmer tables

### Shared Features
- **AI Assistant** — Gemini-powered chat, carbon calculator, residue analyzer
- **Messages** — Real-time-style chat UI with conversation list
- **Settings** — Profile editing, password change, notification preferences
- **Certificates** — Carbon offset certificate viewer with PDF generation
- **Charts** — Revenue, carbon credits, distribution, and trend visualizations

### API Routes
- `POST /api/ai` — Gemini AI (farming advice, carbon estimation, residue analysis)
- `GET /api/listings` — Marketplace listings with filters and pagination
- `GET /api/stats` — Platform-wide statistics
- `GET /api/credits` — Carbon credit project data

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth & DB | Firebase (Auth, Firestore, Storage) |
| State | Zustand |
| AI | Google Gemini (`@google/generative-ai`) |
| Maps | Leaflet + react-leaflet |
| Charts | Recharts |
| PDF | @react-pdf/renderer |
| Animations | Framer Motion |
| Icons | react-icons (Fi, Gi, Hi sets) |
| Notifications | react-hot-toast |

## Getting Started

### Prerequisites
- Node.js >= 20.x
- A Firebase project with Auth, Firestore, and Storage enabled
- A Google Gemini API key

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required because react-leaflet@5 has a peer dependency on React 19 while this project uses React 18.

### 2. Configure Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required variables in `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes (ai, listings, stats, credits)
│   ├── dashboard/        # Role-based dashboard pages
│   │   ├── ai-assistant/ # Gemini AI chat & tools
│   │   ├── analytics/    # Admin analytics
│   │   ├── browse/       # Industry biomass browsing
│   │   ├── carbon/       # Farmer carbon tracking
│   │   ├── certificates/ # Certificate viewer
│   │   ├── credits/      # Company credit purchasing
│   │   ├── farm/         # Farmer farm management
│   │   ├── listings/     # Farmer listing management
│   │   ├── messages/     # Chat system
│   │   ├── orders/       # Industry order tracking
│   │   ├── portfolio/    # Company portfolio
│   │   ├── projects/     # Admin project management
│   │   ├── revenue/      # Farmer revenue dashboard
│   │   ├── settings/     # User settings
│   │   ├── users/        # Admin user management
│   │   └── verification/ # Admin verification center
│   ├── carbon-credits/   # Public carbon credits page
│   ├── farmers/          # Public farmers info page
│   ├── how-it-works/     # Public how-it-works page
│   ├── industries/       # Public industries page
│   ├── login/            # Auth login
│   ├── marketplace/      # Public marketplace
│   ├── signup/           # Auth signup
│   ├── globals.css       # Tailwind v4 styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Shared UI components
│   ├── CertificateDocument.tsx
│   ├── CertificatePDF.tsx
│   ├── Charts.tsx
│   ├── DashboardSidebar.tsx
│   ├── FarmMap.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── ProtectedRoute.tsx
└── lib/                  # Utilities & configuration
    ├── firebase.ts       # Firebase initialization
    ├── firestore.ts      # Firestore CRUD operations
    ├── gemini.ts         # Gemini AI integration
    ├── store.ts          # Zustand auth store
    └── types.ts          # TypeScript interfaces
```

## Deployment

Deploy on Vercel, Netlify, or any Node.js hosting:

1. Set all environment variables in your hosting dashboard
2. Build command: `npm run build`
3. Output directory: `.next`

For Vercel, push to GitHub and connect the repository — it will auto-detect Next.js settings.
