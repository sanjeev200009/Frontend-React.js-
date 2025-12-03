# Aahaas Ecommerce Frontend

React.js frontend for Aahaas Ecommerce platform with modern UI and Laravel API integration.

## Features

- Product catalog with search and filtering
- Shopping cart functionality
- Responsive design for mobile and desktop
- Modern animations and smooth transitions
- Real-time product data from Laravel API

## Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Laravel API server running

### Install Dependencies
```bash
npm install
```

### Configure API URL
Edit `src/services/api.ts` and update the API base URL if needed:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

### Start the Development Server
```bash
npm run dev
```

The app will run on http://localhost:5173

### Build for Production
```bash
npm run build
```

## Important Notes

- Make sure your Laravel API is running on port 8000 before starting the frontend
- The app uses CORS to communicate with the Laravel backend
- All product data is fetched dynamically from the API

## Tech Stack

- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
