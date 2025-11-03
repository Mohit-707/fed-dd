# Donation Platform

A comprehensive platform connecting donors with recipients during emergencies. The system features role-based authentication, real-time donation tracking, and specialized dashboards for each user type.

## Features

### Role-Based Authentication
- **Admin**: Platform management, user approval, analytics
- **Donor**: Item donation, tracking, emergency response
- **Recipient**: Browse items, submit requests, track deliveries
- **Logistics**: Inventory management, route optimization, delivery tracking

### Key Features
- Real-time notifications with Socket.IO
- Emergency response prioritization
- Comprehensive dashboard analytics
- Mobile-responsive design
- Secure session-based authentication

## Technology Stack

### Frontend
- React 19 with TypeScript
- Vite for development
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management

### Backend
- Node.js with Express
- TypeScript for type safety
- Prisma ORM with SQLite
- Session-based authentication
- Socket.IO for real-time features

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install all dependencies:
```bash
npm run setup
```

### Development

Start both frontend and backend in development mode:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Production Build

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
fed-dd/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components for each route
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   └── types/         # TypeScript type definitions
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # Express route handlers
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Service layer
│   │   └── types/         # TypeScript types
│   ├── prisma/           # Database schema and migrations
│   └── package.json
├── shared/               # Shared types and utilities
└── package.json          # Root package.json for workspace
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Health Check
- `GET /api/health` - Server health status

## User Roles

### Admin 👑
- Platform overview and analytics
- User management and approval
- Donation drive creation and management
- System configuration and reports

### Donor 🎁
- List and manage donated items
- Track donation status
- Participate in emergency drives
- View donation history and impact

### Recipient 🙏
- Browse available items
- Submit requests for needed items
- Track delivery status
- Provide feedback and ratings

### Logistics 🚚
- Inventory management
- Route optimization
- Delivery status updates
- Performance analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.