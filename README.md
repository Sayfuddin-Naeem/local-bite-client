# 🍽️ Local Bite

<div align="center">

![Local Bite Banner](https://via.placeholder.com/1200x300/FF6B6B/FFFFFF?text=Local+Bite+-+Discover+Local+Food+Experiences)

**A community-driven platform celebrating great food, honest opinions, and local flavors**

[![Live Demo](https://img.shields.io/badge/Live-Demo-FF6B6B?style=for-the-badge&logo=vercel)](https://local-bite-naeem.vercel.app/)
[![Frontend Repo](https://img.shields.io/badge/Frontend-Repository-4ECDC4?style=for-the-badge&logo=github)](https://github.com/Sayfuddin-Naeem/local-bite-client)
[![Backend Repo](https://img.shields.io/badge/Backend-Repository-95E1D3?style=for-the-badge&logo=github)](https://github.com/Sayfuddin-Naeem/local-bite-server)

</div>

---

## 📖 About The Project

**Local Bite** connects food enthusiasts who love exploring local restaurants, street food, and home-cooked meals. Users can share their culinary experiences, post detailed reviews with photos, and discover what others are enjoying nearby. It's more than just a review platform—it's a celebration of authentic food culture and community-driven recommendations.

### ✨ Key Features

- 🔐 **Robust Authentication System**
  - Firebase email/password authentication
  - Google OAuth integration
  - Custom forgot password functionality
  - Secure JWT-based session management

- 📝 **Comprehensive Review System**
  - Create detailed food reviews with ratings
  - Upload high-quality images via Cloudinary
  - Edit and delete your own reviews
  - Browse all community reviews

- ❤️ **Favorites & Personalization**
  - Save favorite reviews for quick access
  - Personal favorites collection
  - Track your culinary journey

- 💬 **Interactive Comments**
  - Engage with reviews through comments
  - Real-time comment updates
  - Edit and manage your comments

- 👤 **User Profile Management**
  - Personalized user profiles
  - View your review history
  - Manage your favorites collection

- 🎨 **Modern UI/UX**
  - Responsive design for all devices
  - Smooth animations with Framer Motion
  - Intuitive navigation and user flow
  - Performance-optimized interface

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.17-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.90.10-FF4154?style=flat&logo=react-query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.66.1-EC5990?style=flat&logo=reacthookform&logoColor=white)

**Core Libraries:**
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Firebase** - Authentication services
- **Zod** - Schema validation
- **Framer Motion** - Smooth animations
- **React Hot Toast** - Toast notifications
- **DaisyUI** - UI component library
- **Lucide React** - Modern icon system

### Backend
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)
![Firebase Admin](https://img.shields.io/badge/Firebase-Admin_SDK-FFCA28?style=flat&logo=firebase&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Upload-3448C5?style=flat&logo=cloudinary&logoColor=white)

**Core Technologies:**
- **Express.js** - RESTful API framework
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure token authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Firebase Admin SDK** - Token verification
- **Cookie Parser** - Secure cookie management

---

## 🎯 Technical Highlights

### Backend Architecture
- **Elegant Mongoose Schema Design** - Well-structured data models with proper relationships and validations
- **Clean MVC Pattern** - Organized routes, controllers, and middleware for maintainability
- **Secure Authentication Flow** - JWT + Firebase Admin SDK for robust user verification
- **Optimized Database Queries** - Efficient data fetching with population and aggregation
- **Cloudinary Integration** - Seamless image upload and management

### Frontend Excellence
- **TanStack Query Implementation** - Advanced server state management with caching and optimistic updates
- **Custom Hooks Architecture** - Reusable API hooks combining Axios and TanStack Query
- **React Hook Form + Zod** - Type-safe form handling with schema validation
- **Performance Optimization** - Code splitting, lazy loading, and efficient re-renders
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **User Experience** - Smooth transitions, loading states, and error handling

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cluster)
- **Firebase Project** (for authentication)
- **Cloudinary Account** (for image uploads)

### Quick Start for Recruiters

Want to quickly explore the project? Follow these steps:

1. **Visit the Live Demo**
   - Open [https://local-bite-naeem.vercel.app/](https://local-bite-naeem.vercel.app/)
   - Create a new account or sign in with Google
   - Explore the features!

2. **Review the Codebase**
   - Frontend: [Client Repository](https://github.com/Sayfuddin-Naeem/local-bite-client)
   - Backend: [Server Repository](https://github.com/Sayfuddin-Naeem/local-bite-server)

---

## 💻 Local Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sayfuddin-Naeem/local-bite-server.git
   cd local-bite-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   PORT=3000
   DB_USER=your_mongodb_user
   DB_PASS=your_mongodb_password
   DB_NAME=local_bite
   DB_CLUSTER=your_cluster_url
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Client URL
   CLIENT_URL=http://localhost:5173
   
   # Environment
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   
   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_PRIVATE_KEY="your_private_key"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3000`

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sayfuddin-Naeem/local-bite-client.git
   cd local-bite-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   # API URL
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will run on `http://localhost:5173`

---

## 📁 Project Structure

### Backend Structure
```
local-bite-server/
├── src/
│   ├── config/          # Database, Firebase, Cloudinary configs
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication, multer middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── validators/      # Request validation
│   └── index.js         # App entry point
└── package.json
```

### Frontend Structure
```
local-bite-client/
├── src/
│   ├── api/             # Axios instances
│   ├── components/      # Reusable UI components
│   ├── features/        # Feature-specific components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── providers/       # Context providers
│   ├── routes/          # Route configuration
│   ├── schemas/         # Zod validation schemas
│   ├── utils/           # Utility functions
│   └── main.jsx         # App entry point
└── package.json
```

---

## 🔑 API Documentation

### Authentication Endpoints
```
POST   /api/auth/login              # User login
POST   /api/auth/logout             # User logout
```

### Review Endpoints
```
GET    /api/reviews                 # Get all reviews
GET    /api/reviews/:id             # Get review by ID
POST   /api/reviews                 # Create review (Protected)
PUT    /api/reviews/:id             # Update review (Protected)
DELETE /api/reviews/:id             # Delete review (Protected)
GET    /api/reviews/user/:userId    # Get user's reviews
```

### Favorite Endpoints
```
GET    /api/favorites               # Get user favorites (Protected)
POST   /api/favorites               # Add to favorites (Protected)
DELETE /api/favorites/:id           # Remove from favorites (Protected)
```

### Comment Endpoints
```
GET    /api/comments/review/:reviewId  # Get review comments
POST   /api/comments                    # Add comment (Protected)
PUT    /api/comments/:id                # Update comment (Protected)
DELETE /api/comments/:id                # Delete comment (Protected)
```

---

## 🎨 Screenshots

<div align="center">

### Home Page
![Home Page](https://via.placeholder.com/800x500/FF6B6B/FFFFFF?text=Home+Page+Screenshot)

### Review Details
![Review Details](https://via.placeholder.com/800x500/4ECDC4/FFFFFF?text=Review+Details+Screenshot)

### Add Review
![Add Review](https://via.placeholder.com/800x500/95E1D3/FFFFFF?text=Add+Review+Screenshot)

### My Favorites
![My Favorites](https://via.placeholder.com/800x500/FFE66D/333333?text=My+Favorites+Screenshot)

</div>

---

## 🚢 Deployment

### Frontend (Vercel)
- Deployed on [Vercel](https://vercel.com)
- Automatic deployments from main branch
- Environment variables configured in Vercel dashboard

### Backend (Render)
- Deployed on [Render](https://render.com)
- Automatic deployments from main branch
- Environment variables configured in Render dashboard

---

## 🤝 Connect With Me

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Sayfuddin--Naeem-181717?style=for-the-badge&logo=github)](https://github.com/Sayfuddin-Naeem)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sayfuddin--Naeem-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sayfuddin-naeem/)

**Let's build something amazing together! 🚀**

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ by [Sayfuddin Naeem](https://github.com/Sayfuddin-Naeem)**

⭐ Star this repository if you find it helpful!

</div>