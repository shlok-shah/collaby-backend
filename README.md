# Collaby - Backend

Collaby's backend is designed to handle all real-time interactions between users, including managing rooms, handling socket communication for chat, task assignment, and collaborative word editing. The backend is built using Node.js, Express.js, MongoDB, and Socket.io, ensuring seamless real-time collaboration with persistent data storage.

## Features

1. **Room Management**: Users can create, join, and leave rooms for real-time collaboration.
2. **Task Management**: Real-time task assignment and completion updates between users in the same room using Socket.io.
3. **Real-time Communication**: Powered entirely by Socket.io for real-time chat and collaborative word editing.
4. **Data Persistence**: MongoDB is used to store room and task data, ensuring information remains available across sessions.

## Tech Stack

-   **Node.js**: For backend development and server-side scripting.
-   **Express.js**: A framework for building and structuring the backend server.
-   **MongoDB**: For storing data such as room details and tasks.
-   **Socket.io**: For managing all real-time communication and interactions between users.

## Contribution

This project was solely developed by me (Shlok), responsible for:

-   Building and structuring the backend server using Node.js and Express.js.
-   Implementing all real-time communication using Socket.io.
-   Managing room creation, task assignment, and collaborative editing functionalities.
-   Setting up MongoDB for persistent data storage.

## Running it locally
### Frontend

- Clone https://github.com/shlok-shah/collaby-frontend
- npm i
- npm run dev (Running it on development)
- Should be visible at http://localhost:5173
  
### Backend

- Clone this repository
- npm i
- Run your local mongodb server (mongodb://localhost:27017) OR If you want to connect to mongodb atlas instead of local instance create a new .env file in the root of the directory. Add MONGO_URL={your atlas url} to the file
- if running mongodb server locally, use "npm start"
- If using mongodb atlas instead, run "npm run prod"
- The backend should be running at http://localhost:5000

### Both the front-end and back-end repositories should be running at the same time 

## Deployed at

The fully functional website is deployed at https://collaby-frontend.vercel.app/
