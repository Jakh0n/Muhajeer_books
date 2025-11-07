# Muhajeer Books - Project Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
│                    Next.js 15 + React 19                         │
└────────────────────────────┬────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              │ (REST API)
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                    CLIENT APPLICATION                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Next.js Frontend (Port 3000)                │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Pages & Routes (App Router)                      │   │  │
│  │  │  • (auth)/sign-in, sign-up                        │   │  │
│  │  │  • (root)/home, products, product/[id]            │   │  │
│  │  │  • admin/products, orders, customers              │   │  │
│  │  │  • dashboard/orders, payments, watch-list         │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Server Actions (next-safe-action)               │   │  │
│  │  │  • auth-action.ts (login, register)              │   │  │
│  │  │  • user.action.ts                                │   │  │
│  │  │  • admin.action.ts                               │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  API Routes (Next.js API)                       │   │  │
│  │  │  • /api/auth/[...nextauth] (NextAuth)            │   │  │
│  │  │  • /api/telegram (Telegram Bot)                  │   │  │
│  │  │  • /api/uploadthing (File Upload)                │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Components                                      │   │  │
│  │  │  • UI Components (shadcn/ui)                     │   │  │
│  │  │  • Shared Components (navbar, footer, etc.)       │   │  │
│  │  │  • Form Components                                │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              │ Axios HTTP Client
                              │ (withCredentials: true)
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                    SERVER APPLICATION                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Express.js REST API (Port 5000)                  │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Middleware Layer                                 │   │  │
│  │  │  • CORS (Cross-Origin Resource Sharing)           │   │  │
│  │  │  • Cookie Parser                                  │   │  │
│  │  │  • JSON Parser                                     │   │  │
│  │  │  • Error Middleware                                │   │  │
│  │  │  • User Middleware (JWT Auth)                     │   │  │
│  │  │  • Admin Middleware                                │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Routes Layer                                    │   │  │
│  │  │  • /api/auth (login, register, google)          │   │  │
│  │  │  • /api/otp (send, verify)                       │   │  │
│  │  │  • /api/user (products, orders, profile)        │   │  │
│  │  │  • /api/admin (CRUD operations)                 │   │  │
│  │  │  • /api/health (health check)                    │   │  │
│  │  │  • /api/test-smtp (SMTP testing)                 │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Controllers Layer                               │   │  │
│  │  │  • auth.controller.js                            │   │  │
│  │  │  • user.controller.js                            │   │  │
│  │  │  • admin.controller.js                           │   │  │
│  │  │  • otp.controller.js                             │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Services Layer                                 │   │  │
│  │  │  • mail.service.js (Nodemailer - SMTP)          │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────┬───────────────────────────────┘
│                                 │
│                                 │ Mongoose ODM
│                                 │
┌─────────────────────────────────▼───────────────────────────────┐
│                      DATABASE LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              MongoDB Database                              │ │
│  │  ┌────────────────────────────────────────────────────┐  │ │
│  │  │  Models (Mongoose Schemas)                          │  │ │
│  │  │  • User Model (email, password, favorites)        │  │ │
│  │  │  • Product Model (title, price, description)       │  │ │
│  │  │  • Order Model (user, products, status)            │  │ │
│  │  │  • Transaction Model                               │  │ │
│  │  │  • OTP Model (email, otp, expireAt)                │  │ │
│  │  └────────────────────────────────────────────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │  Google OAuth     │  │  Telegram Bot    │  │  UploadThing │ │
│  │  (Authentication) │  │  (Notifications) │  │  (File Host) │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│  ┌──────────────────┐                                          │
│  │  SMTP Server     │                                          │
│  │  (Email Service) │                                          │
│  └──────────────────┘                                          │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (Client)

- **Framework**: Next.js 15.1.3 (App Router)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: shadcn/ui (Radix UI)
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand
- **Authentication**: NextAuth.js 4.24.11
- **HTTP Client**: Axios
- **Type Safety**: TypeScript 5
- **File Upload**: UploadThing
- **Animations**: Framer Motion

### Backend (Server)

- **Framework**: Express.js 4.21.2
- **Database**: MongoDB (Mongoose 8.9.4)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer 6.9.16
- **CORS**: cors middleware
- **Environment**: dotenv

## Directory Structure

```
Muhajeer_Books/
├── client/                    # Next.js Frontend Application
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (root)/            # Public routes
│   │   │   ├── (home)/        # Home page
│   │   │   ├── products/      # Product listing
│   │   │   ├── product/[id]/  # Product details
│   │   │   └── contact/       # Contact page
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── products/      # Product management
│   │   │   ├── orders/        # Order management
│   │   │   └── (customers)/   # Customer management
│   │   ├── dashboard/         # User dashboard
│   │   │   ├── orders/        # User orders
│   │   │   ├── payments/      # Payment history
│   │   │   └── watch-list/    # Favorites
│   │   └── api/               # Next.js API routes
│   │       ├── auth/          # NextAuth routes
│   │       ├── telegram/      # Telegram integration
│   │       └── uploadthing/   # File upload
│   ├── components/            # React Components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── shared/            # Shared components
│   │   ├── card/              # Card components
│   │   └── form/              # Form components
│   ├── actions/               # Server Actions
│   │   ├── auth-action.ts     # Authentication actions
│   │   ├── user.action.ts     # User actions
│   │   └── admin.action.ts    # Admin actions
│   ├── hooks/                 # Custom React Hooks
│   ├── lib/                   # Utility libraries
│   │   ├── auth-options.ts    # NextAuth configuration
│   │   ├── safe-action.ts     # Safe action client
│   │   └── validation/       # Zod schemas
│   ├── http/                  # HTTP client configuration
│   │   └── axios.ts           # Axios instance
│   └── types/                 # TypeScript types
│
└── server/                     # Express.js Backend API
    ├── app.js                 # Express app entry point
    ├── routes/                 # API Routes
    │   ├── index.js           # Route aggregator
    │   ├── auth.js            # Authentication routes
    │   ├── user.js            # User routes
    │   ├── admin.js           # Admin routes
    │   ├── otp.js             # OTP routes
    │   └── health.js          # Health check
    ├── controllers/            # Route Controllers
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   ├── admin.controller.js
    │   └── otp.controller.js
    ├── models/                 # Mongoose Models
    │   ├── user.model.js
    │   ├── product.model.js
    │   ├── order.model.js
    │   ├── transaction.model.js
    │   └── otp.model.js
    ├── middlewares/            # Express Middlewares
    │   ├── user.middleware.js  # JWT authentication
    │   ├── admin.middleware.js # Admin authorization
    │   └── error.middleware.js # Error handling
    ├── services/               # Business Logic Services
    │   └── mail.service.js    # Email service
    ├── errors/                 # Custom Error Classes
    │   └── base.error.js
    └── template/              # Email Templates
        ├── otp.template.js
        ├── succes.template.js
        └── cancel.template.js
```

## Authentication Flow

```
┌──────────┐
│  Client   │
└────┬──────┘
     │
     │ 1. User submits credentials
     │    (Email/Password or Google OAuth)
     │
     ▼
┌─────────────────┐
│  NextAuth.js    │
│  (Client-side)  │
└────┬────────────┘
     │
     │ 2. For Google: Redirects to Google
     │    For Credentials: Calls server action
     │
     ▼
┌─────────────────┐
│  Server Action  │
│  (auth-action)  │
└────┬────────────┘
     │
     │ 3. HTTP POST to /api/auth/login or /register
     │
     ▼
┌─────────────────┐
│  Express API    │
│  /api/auth/*    │
└────┬────────────┘
     │
     │ 4. Validates credentials
     │    Hashes password (bcrypt)
     │    Creates/Verifies JWT
     │
     ▼
┌─────────────────┐
│   MongoDB       │
│   User Model    │
└────┬────────────┘
     │
     │ 5. Returns user data + JWT token
     │
     ▼
┌─────────────────┐
│  NextAuth       │
│  Creates Session│
└────┬────────────┘
     │
     │ 6. Sets session cookie
     │    Redirects to home
     │
     ▼
┌──────────┐
│  Client   │
│ (Logged)  │
└──────────┘
```

## Data Flow

### Product Listing Flow

```
User Request → Next.js Page → Server Action → Express API → MongoDB → Response
```

### Order Creation Flow

```
User Action → Form Submit → Server Action → Express API →
  ├─ Create Order (MongoDB)
  ├─ Send Email (SMTP)
  └─ Send Telegram Notification → Response
```

## API Endpoints

### Authentication (`/api/auth`)

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/google` - Google OAuth authentication

### User (`/api/user`)

- `GET /api/user/products` - Get all products
- `GET /api/user/product/:id` - Get product by ID
- `GET /api/user/profile/:id` - Get user profile
- `POST /api/user/add-favorite` - Add to favorites
- `PUT /api/user/update-profile` - Update profile
- `PUT /api/user/update-password` - Update password

### Admin (`/api/admin`)

- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/product` - Create product
- `PUT /api/admin/product/:id` - Update product
- `DELETE /api/admin/product/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/customers` - Get all customers

### OTP (`/api/otp`)

- `POST /api/otp/send` - Send OTP email
- `POST /api/otp/verify` - Verify OTP

### Health (`/api/health`)

- `GET /api/health` - Health check endpoint

## Security Features

1. **Authentication**

   - JWT tokens for session management
   - bcrypt for password hashing
   - NextAuth.js for secure session handling
   - Google OAuth integration

2. **Authorization**

   - Role-based access control (User/Admin)
   - Middleware for route protection
   - Server-side validation

3. **Data Protection**
   - CORS configuration
   - Cookie-based authentication
   - Environment variables for secrets
   - Input validation (Zod schemas)

## External Integrations

1. **Google OAuth** - User authentication
2. **Telegram Bot API** - Order notifications
3. **SMTP Server** - Email delivery (OTP, order confirmations)
4. **UploadThing** - File/image upload service
5. **MongoDB** - Database storage

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Production Environment           │
│                                         │
│  ┌──────────────┐    ┌──────────────┐ │
│  │  Next.js App  │    │ Express API  │ │
│  │  (Vercel)     │◄───┤ (Railway/     │ │
│  │               │    │  Render)     │ │
│  └──────┬───────┘    └──────┬───────┘ │
│         │                    │         │
│         │                    │         │
│         ▼                    ▼         │
│  ┌──────────────────────────────────┐ │
│  │      MongoDB Atlas               │ │
│  │      (Cloud Database)            │ │
│  └──────────────────────────────────┘ │
│                                         │
│  External Services:                     │
│  • Google OAuth                        │
│  • Telegram Bot                        │
│  • SMTP Server                         │
│  • UploadThing                         │
└─────────────────────────────────────────┘
```

## Key Design Patterns

1. **MVC Pattern** (Server)

   - Models: Mongoose schemas
   - Views: Not applicable (API only)
   - Controllers: Route handlers

2. **Server Actions Pattern** (Client)

   - Type-safe server-side operations
   - Automatic error handling
   - Optimistic updates

3. **Component-Based Architecture** (Client)

   - Reusable UI components
   - Shared components
   - Page-specific components

4. **Middleware Pattern** (Server)
   - Authentication middleware
   - Authorization middleware
   - Error handling middleware
