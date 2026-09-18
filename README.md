Resume Builder – MERN Stack
A full-stack Resume Builder web application that allows users to create, edit, and manage professional resumes with a clean UI and secure authentication.
Built using the MERN stack (MongoDB, Express, React, Node.js) with modern UI and best practices.

🚀 Live Demo

🔗 **Live Application:** https://resume-builder-project-three.vercel.app/

🔗 **GitHub Repository:** https://github.com/Priyanka-Mandal06/Resume-Builder-Project

🚀 Features

🔐 Authentication
User Register & Login
Secure password hashing using bcrypt
JWT-based authentication
Protected routes for logged-in users

📝 Resume Builder
Create and update:
Profile details
Education
Skills
Projects
Experience
Extra details
Auto-save resume data
Fetch saved resume on login

🎨 User Interface
Modern landing page with full-screen background
Clean and professional UI
Responsive design (desktop & mobile)
Smooth animations using Framer Motion
Styled using Material UI + custom CSS

☁️ Backend
RESTful APIs using Express
MongoDB for data storage
Centralized error handling

Environment-based configuration

🛠 Tech Stack
Frontend
React (Vite)
Redux Toolkit
React Router DOM
Material UI (MUI)
Framer Motion
Axios

Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
bcryptjs

Tools & Deployment
Vite
Git & GitHub
Render (Backend)
Vercel / Localhost (Frontend)

📂 Project Structure
Resume-Builder/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── assets/         # Images & static files
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Pages (Landing, Auth, Resume)
│   │   ├── redux/          # Redux slices & store
│   │   ├── styles/         # CSS files
│   │   └── App.jsx
│
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── index.js
│
└── README.md

⚙️ Environment Variables
Backend (server/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

▶️ Run Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/Resume-Builder-MERN.git
cd Resume-Builder-MERN

2️⃣ Backend setup
cd server
npm install
npm run dev

3️⃣ Frontend setup
cd client
npm install
npm run dev

Frontend will run on:
http://localhost:5173

Backend will run on:
http://localhost:5000

🔌 API Endpoints
Auth
POST /api/auth/register – Register user
POST /api/auth/login – Login user
Resume
GET /api/data/get-all-resume-data
POST /api/data/save-resume-data

🧪 Testing
API tested using Postman
Manual UI testing for:
Authentication
Resume creation
Data persistence

🎯 Learning Outcomes
Full MERN authentication flow
Redux state management
REST API design
UI/UX improvements for real products
Deployment & environment configuration

👩‍💻 Author
Priyanka Mandal
Full Stack Developer (MERN)
GitHub: https://github.com/Priyanka-Mandal06

📜 License
This project is for learning and portfolio purposes.
