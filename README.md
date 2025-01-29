# Eloquence - Communication Skills Platform

A modern platform for creating and taking communication skills assessments. Built with Node.js, Express, MongoDB, and React.

## Features

- User authentication with JWT
- Role-based access control (Test Creator and Test Taker)
- Create and manage communication skill assessments
- Support for written, verbal, and presentation tests
- Real-time test taking and submission
- User progress tracking and statistics
- Modern, responsive UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/eloquence.git
cd eloquence
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
- Set your `JWT_SECRET`
- Update `MONGODB_URI` if using a different database URL

5. Start MongoDB (if running locally)

6. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
eloquence/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── public/          # Static files
├── config/         # Configuration files
└── tests/          # Test files
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Tests
- POST /api/tests - Create new test (Creator only)
- GET /api/tests/public - Get all public tests
- GET /api/tests/created - Get tests created by user
- GET /api/tests/taken - Get tests taken by user
- GET /api/tests/:id - Get specific test
- POST /api/tests/:id/submit - Submit test attempt
- PATCH /api/tests/:id - Update test (Creator only)
- DELETE /api/tests/:id - Delete test (Creator only)

### Users
- PATCH /api/users/profile - Update user profile
- PATCH /api/users/password - Change password
- GET /api/users/stats - Get user statistics

## Security

- Password hashing using bcrypt
- JWT-based authentication
- Input validation and sanitization
- XSS protection with helmet
- Rate limiting for API endpoints
- CORS configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 