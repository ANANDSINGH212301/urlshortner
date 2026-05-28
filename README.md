# 🔗 URL Shortener

A modern, full-stack URL shortener application built with React and Node.js. Transform long URLs into short, shareable links with advanced features like user authentication, custom Url, and click analytics.

## ✨ Features

### 🚀 Core Features
- **URL Shortening**: Convert long URLs into short, manageable links
- **Instant Redirection**: Fast and reliable URL redirection
- **Click Analytics**: Track the number of clicks for each shortened URL
- **Copy to Clipboard**: One-click copying of shortened URLs

### 👤 User Features
- **User Authentication**: Secure registration and login system
- **Custom Slugs**: Create personalized short URLs (authenticated users only)
- **User Dashboard**: Manage all your shortened URLs in one place
- **URL History**: View all previously created URLs with click statistics

### 🔧 Technical Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant feedback and state management
- **Error Handling**: Comprehensive error handling and user feedback
- **Security**: JWT-based authentication with secure cookie storage

## 🛠️ Technology Stack

### Frontend
- **React 19.x** - Modern UI library with latest features
- **Vite** - Fast build tool and development server
- **TailwindCSS 4.x** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **TanStack React Router** - Type-safe routing
- **TanStack React Query** - Server state management
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.x** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **nanoid** - Unique ID generator for short URLs
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/me          # Get current user
```

### URL Shortening Endpoints
```
POST /api/create           # Create short URL
POST /api/create/custom    # Create custom short URL
POST /api/user/urls        # Get user's URLs (authenticated)
GET  /:id                  # Redirect to original URL
```

### Request/Response Examples

**Create Short URL:**

## 🎯 Usage

### For Anonymous Users
1. Visit the homepage
2. Enter a long URL in the input field
3. Click "Shorten URL"
4. Copy and share the generated short URL

### For Registered Users
1. Register/Login to your account
2. Access the dashboard
3. Create short URLs with optional custom slugs
4. View all your URLs with click statistics
5. Manage your URL collection

**Made with ❤️ by [Singh Anand kumar Anuj]**
