# BidAlert - Project Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Next.js Frontend (Port 3000)             │    │
│  │                                                     │    │
│  │  ┌──────────────┐  ┌──────────────┐              │    │
│  │  │   Layout     │  │   Pages      │              │    │
│  │  │  (Header/    │  │  - Home      │              │    │
│  │  │   Footer)    │  │  - Tenders   │              │    │
│  │  └──────────────┘  └──────────────┘              │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────────────────────┐  │    │
│  │  │          Components                         │  │    │
│  │  │  - HeroSection    - CategoriesSection      │  │    │
│  │  │  - FeaturesSection - IndustriesSection     │  │    │
│  │  │  - StatesSection   - BidGPTWidget          │  │    │
│  │  └─────────────────────────────────────────────┘  │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────────────────────┐  │    │
│  │  │          Styling                            │  │    │
│  │  │  - Tailwind CSS                             │  │    │
│  │  │  - Custom Theme                             │  │    │
│  │  │  - Responsive Design                        │  │    │
│  │  └─────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                 │
│                           │ HTTP/REST API                   │
│                           ▼                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Node.js Backend (Port 5000)                │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────────────────────┐  │    │
│  │  │          API Routes                         │  │    │
│  │  │                                             │  │    │
│  │  │  GET  /api/tenders          (List)         │  │    │
│  │  │  GET  /api/tenders/:id      (Detail)       │  │    │
│  │  │  POST /api/auth/register    (Register)     │  │    │
│  │  │  POST /api/auth/login       (Login)        │  │    │
│  │  │  POST /api/bidgpt/chat      (AI Chat)      │  │    │
│  │  └─────────────────────────────────────────────┘  │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────────────────────┐  │    │
│  │  │          Middleware                         │  │    │
│  │  │  - CORS                                     │  │    │
│  │  │  - JSON Parser                              │  │    │
│  │  │  - Error Handler                            │  │    │
│  │  └─────────────────────────────────────────────┘  │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────────────────────┐  │    │
│  │  │          Future: Database                   │  │    │
│  │  │  - MongoDB (Optional)                       │  │    │
│  │  │  - User Model                               │  │    │
│  │  │  - Tender Model                             │  │    │
│  │  └─────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

```
User Browser
     │
     │ 1. User visits site
     ▼
Next.js Frontend
     │
     │ 2. Renders React components
     │    - Server-side rendering (SSR)
     │    - Client-side hydration
     ▼
Components Display
     │
     │ 3. User interacts (search, click)
     ▼
API Call (fetch/axios)
     │
     │ 4. HTTP Request
     ▼
Express Backend
     │
     │ 5. Route handling
     │    - Validate request
     │    - Process data
     ▼
Database (Future)
     │
     │ 6. Query data
     ▼
JSON Response
     │
     │ 7. Send back to frontend
     ▼
Update UI
     │
     │ 8. Display results
     ▼
User sees results
```

## 🔄 Component Hierarchy

```
App (layout.tsx)
│
├── Header
│   ├── Logo
│   ├── Navigation (Desktop)
│   │   ├── Home Link
│   │   ├── Login Link
│   │   ├── Register Link
│   │   ├── India Tenders Dropdown
│   │   └── Contact Button
│   └── Mobile Menu
│
├── Main Content (page.tsx)
│   ├── HeroSection
│   │   ├── Search Bar
│   │   ├── State Selector
│   │   └── Trending Tags
│   │
│   ├── FeaturesSection
│   │   └── 4 Feature Cards
│   │
│   ├── CategoriesSection
│   │   ├── Tab Buttons
│   │   └── Category Grid
│   │
│   ├── IndustriesSection
│   │   └── Industry Cards
│   │
│   └── StatesSection
│       └── State Grid
│
├── Footer
│   ├── Brand Info
│   ├── Quick Links
│   ├── Company Links
│   └── Contact Info
│
└── BidGPTWidget (Floating)
    ├── Toggle Button
    └── Chat Window
        ├── Header
        ├── Messages Area
        └── Input Form
```

## 🎨 Styling Architecture

```
Tailwind CSS
│
├── Base Styles (globals.css)
│   ├── @tailwind base
│   ├── @tailwind components
│   └── @tailwind utilities
│
├── Custom Theme (tailwind.config.ts)
│   ├── Colors
│   │   ├── bid-dark
│   │   ├── bid-green
│   │   ├── bid-greenhover
│   │   └── bid-light
│   │
│   ├── Shadows
│   │   └── soft
│   │
│   └── Animations
│       └── bounce-slow
│
└── Component Styles
    ├── Utility Classes
    ├── Responsive Modifiers
    └── Hover/Focus States
```

## 🔐 Authentication Flow (Future)

```
User Registration
     │
     │ 1. Fill form
     ▼
POST /api/auth/register
     │
     │ 2. Validate data
     │ 3. Hash password
     │ 4. Save to DB
     ▼
Return JWT Token
     │
     │ 5. Store in localStorage
     ▼
Authenticated User

User Login
     │
     │ 1. Enter credentials
     ▼
POST /api/auth/login
     │
     │ 2. Verify credentials
     │ 3. Generate JWT
     ▼
Return Token
     │
     │ 4. Store token
     │ 5. Redirect to dashboard
     ▼
Access Protected Routes
```

## 📱 Responsive Breakpoints

```
Mobile First Approach

sm:  640px   (Small tablets)
md:  768px   (Tablets)
lg:  1024px  (Laptops)
xl:  1280px  (Desktops)
2xl: 1536px  (Large screens)

Components adapt at each breakpoint:
- Header: Mobile menu → Desktop nav
- Grid: 1 col → 2 cols → 4 cols → 6 cols
- Search: Stacked → Side by side
```

---

**This architecture provides:**
- ✅ Scalability
- ✅ Maintainability
- ✅ Performance
- ✅ Type Safety
- ✅ Modern Development Experience
