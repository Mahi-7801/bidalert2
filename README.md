# BidAlert - Tender Management System

A modern full-stack application for managing government and private tenders across India.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database (optional)
- **JWT** - Authentication

## 📁 Project Structure

```
bid2alert-nextjs/          # Frontend (Next.js)
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── CategoriesSection.tsx
│   ├── IndustriesSection.tsx
│   ├── StatesSection.tsx
│   └── BidGPTWidget.tsx
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts

backend/                 # Backend (Node.js/Express)
├── server.js           # Main server file
├── package.json
└── .env.example        # Environment variables template
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd bid2alert-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the server:
```bash
npm run dev
```

5. Backend will run on [http://localhost:5000](http://localhost:5000)

## 🎨 Features

- ✅ **Responsive Design** - Works on all devices
- ✅ **Modern UI** - Clean and professional interface
- ✅ **Search Functionality** - Advanced tender search
- ✅ **Category Browsing** - Browse by work, service, or product categories
- ✅ **State-wise Filtering** - Find tenders by Indian states
- ✅ **BidGPT AI Chat** - AI-powered tender assistance
- ✅ **RESTful API** - Well-structured backend API
- ✅ **Authentication Ready** - Login/Register endpoints

## 📡 API Endpoints

### Tenders
- `GET /api/tenders` - Get all tenders (with filters)
- `GET /api/tenders/:id` - Get single tender

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### BidGPT
- `POST /api/bidgpt/chat` - Chat with AI assistant

## 🎯 Key Components

### Frontend Components

1. **Header** - Navigation with dropdowns and mobile menu
2. **HeroSection** - Search bar with state filter
3. **FeaturesSection** - 4 key features showcase
4. **CategoriesSection** - Tabbed category browser
5. **IndustriesSection** - Sector-wise tender listing
6. **StatesSection** - Indian states grid
7. **BidGPTWidget** - Floating AI chat widget
8. **Footer** - Company info and links

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  bid: {
    dark: '#0f172a',
    green: '#4ade80',
    greenhover: '#22c55e',
    light: '#f8fafc'
  }
}
```

### API URL
Update the backend URL in your frontend API calls (create a config file):
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
```

## 📝 Development Notes

- Frontend uses Next.js App Router (not Pages Router)
- All components are TypeScript-based
- Tailwind CSS for styling
- Backend uses mock data (replace with real database)
- JWT authentication structure in place

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd bid2alert-nextjs
npm run build
# Deploy to Vercel
```

### Backend (Any Node.js host)
```bash
cd backend
npm start
# Deploy to your preferred hosting
```

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ for BidAlert**
