# Tickety - Project Kanban Board

A modern project management application built with React and Firebase, designed to help teams organize their workflow through visual kanban boards.

## Tickety at a Glance

**Tickety** is a comprehensive project kanban board application where you can:

- **Create Projects**: Organize your work into distinct projects
- **Build Kanban Boards**: Create multiple kanban boards for each project with customizable stages
- **Team Collaboration**: Invite team members to contribute to your projects
- **Task Management**: Assign tasks to team members and track progress through workflow stages
- **Workflow Visualization**: Manage your work by stages and keep track of task progression

### About the Project

Tickety was originally designed & coded by **Mei Shih** as a capstone project at App Academy in February 2022, built in just 10 days. This new version rebuilds the original Tickety app using modern React and Firebase backend/authentication to make it even better and more scalable.

## Application Architecture

Tickety follows a modern React application architecture:

- **Frontend**: React 19 with TypeScript for type safety
- **State Management**: React Context API for authentication and app state
- **Routing**: React Router for navigation between different views
- **Backend**: Firebase for authentication, database, and hosting
- **Styling**: CSS modules and modern CSS for responsive design
- **Form Handling**: React Hook Form for efficient form management

## Technologies Used

### Core Dependencies
- **React 19.1.1** - Modern React with latest features
- **TypeScript 4.9.5** - Type-safe JavaScript development
- **Firebase 12.0.0** - Backend services (Auth, Firestore, Hosting)

### UI & UX Libraries
- **Lucide React 0.537.0** - Beautiful, customizable icons
- **React Spring 10.0.1** - Smooth animations and transitions
- **React Toastify 11.0.5** - User notification system

### Development Tools
- **React Scripts 5.0.1** - Create React App build tools
- **React Router DOM 7.7.1** - Client-side routing
- **React Hook Form 7.62.0** - Performant forms with minimal re-renders

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- Yarn or npm package manager
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd meiys
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Firebase Setup**
   
   You'll need to set up a Firebase project and configure the environment variables:
   
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Enable Authentication and Firestore Database
   - Get your Firebase configuration

4. **Environment Configuration**
   
   Create a `.env.local` file in the root directory with your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

### Running the Application

1. **Start the development server**
   ```bash
   yarn start
   # or
   npm start
   ```

2. **Open your browser**
   
   The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for production**
   ```bash
   yarn build
   # or
   npm run build
   ```

### Available Scripts

- `yarn start` - Runs the app in development mode
- `yarn build` - Builds the app for production
- `yarn test` - Launches the test runner
- `yarn reinstall` - Clean reinstall of dependencies
- `yarn ts:build` - TypeScript compilation
- `yarn ts:watch` - TypeScript compilation in watch mode

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── screen/             # Main application screens
│   ├── Auth/          # Authentication screens
│   ├── Dashboard/     # Main dashboard
│   ├── Loading/       # Loading states
│   └── SplashPage/    # Welcome screen
├── firebase.ts         # Firebase configuration
├── routeConfig.tsx     # Application routing
└── App.tsx            # Main application component
```

## Contributing

This is a personal project by Mei Shih. If you'd like to contribute or have suggestions, please feel free to reach out!

## License

- **Code:** Licensed under the [MIT License](./LICENSE)
- **Artwork & Animations:** © 2025 Mei Shih – [All Rights Reserved](./LICENSE-ARTWORK)

---

Built with ❤️ by Mei Shih