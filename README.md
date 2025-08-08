# Quiz App

A modern quiz application built with React.js and Firebase, featuring user authentication, multiple quiz categories, and an admin panel.

## Features

- User Authentication (Sign In/Sign Up)
- Multiple Quiz Categories (GK, Mathematics, Science)
- Real-time Quiz Taking Experience
- Score Tracking and Results Display
- Admin Panel for Quiz Management
- User History Tracking

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase configuration to `src/firebase.js`

4. Start the development server:
```bash
npm start
```

## Admin Account Setup

To create an admin account:
1. Sign up using the regular sign-up process
2. In Firebase Console, go to Firestore
3. Find your user document in the 'users' collection
4. Add a field 'role' with value 'admin'

## Available Scripts

- `npm start`: Run the development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## Technologies Used

- React.js
- Firebase (Authentication & Firestore)
- Material-UI
- React Router

## License

MIT License
# Quiz-Application
