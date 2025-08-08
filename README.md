# JobBoard - MERN Stack CRUD Application

A modern, full-stack job board application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a clean UI with Tailwind CSS.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete job postings
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Feedback**: Toast notifications for user actions
- **Form Validation**: Client and server-side validation
- **Modern UI**: Clean, professional interface with smooth animations
- **Job Categories**: Support for different job types (Full-time, Part-time, Contract, Internship)
- **Remote Work Support**: Toggle for remote positions
- **Search & Filter**: Easy job discovery

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS 3** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hooks** - State management and side effects

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation middleware
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Development server auto-restart
- **Concurrently** - Run multiple commands simultaneously

## 📁 Project Structure

```
job-board/
├── client/                          # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobCard.js          # Individual job display
│   │   │   ├── JobForm.js          # Add/Edit job form
│   │   │   ├── JobList.js          # Jobs listing
│   │   │   └── Toast.js            # Notification component
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── App.js                  # Main app component
│   │   ├── App.css                 # Global styles
│   │   └── index.js                # React entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                          # Node.js backend
│   ├── config/
│   │   └── database.js             # Database configuration
│   ├── controllers/
│   │   └── jobController.js        # Business logic for jobs
│   ├── middleware/
│   │   └── errorHandler.js         # Error handling middleware
│   ├── models/
│   │   └── Job.js                  # Job data model
│   ├── routes/
│   │   └── jobs.js                 # Job API routes
│   ├── server.js                   # Express server
│   └── package.json
├── README.md
└── package.json                     # Root package file
```

## 🚦 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-board-mern.git
   cd job-board-mern
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   **Backend Environment (.env in server directory):**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/jobboard
   CLIENT_URL=http://localhost:3000
   ```

   **Frontend Environment (.env in client directory - optional):**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_NAME=JobBoard
   ```

   For MongoDB Atlas (cloud database), use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
   ```

   **Note:** The frontend will automatically detect the correct API URL:
   - Development: `http://localhost:5000/api`
   - Production: `/api` (relative URL)
   - Custom: Set `REACT_APP_API_URL` in client/.env

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both the React frontend (http://localhost:3000) and Express backend (http://localhost:5000) simultaneously.

### Alternative Setup (Manual)

If you prefer to run frontend and backend separately:

1. **Start the backend server**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm install
   npm start
   ```

## 📱 Application Screenshots

### 1. Job Listings View
![Job Listings](https://via.placeholder.com/800x600?text=Job+Listings+View)
*Main dashboard showing all job postings with search and filter options*

### 2. Add New Job Form
![Add Job Form](https://via.placeholder.com/800x600?text=Add+Job+Form)
*Clean form interface for creating new job postings*

### 3. Edit Job Form
![Edit Job Form](https://via.placeholder.com/800x600?text=Edit+Job+Form)
*Pre-filled form for editing existing job postings*

## 🔧 API Endpoints

### Jobs API (`/api/jobs`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create new job |
| PUT | `/api/jobs/:id` | Update existing job |
| DELETE | `/api/jobs/:id` | Delete job |

### Example API Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Frontend Developer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "description": "We are looking for a skilled Frontend Developer...",
      "salary": "$80,000 - $120,000",
      "type": "Full-time",
      "remote": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## 🎨 Key Features Explained

### CRUD Operations
- **Create**: Add new job postings with comprehensive form validation
- **Read**: View all jobs in a responsive grid layout
- **Update**: Edit existing jobs with pre-filled forms
- **Delete**: Remove jobs with confirmation dialog

### UI/UX Features
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Loading States**: Skeleton loaders during data fetching
- **Toast Notifications**: Success/error feedback for all actions
- **Form Validation**: Real-time validation with error messages
- **Animations**: Smooth transitions and micro-interactions

### Data Validation
- Client-side validation for immediate feedback
- Server-side validation for security
- Input sanitization and length limits
- Required field validation

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the React app: `cd client && npm run build`
2. Deploy the `build` folder to your preferred hosting service

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables on your hosting platform
2. Deploy the `server` directory
3. Update the API URL in the frontend

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Set up a cluster and get the connection string
3. Update the `MONGODB_URI` environment variable

## 🔍 Development Scripts

### Root Level
- `npm run dev` - Run both frontend and backend in development mode
- `npm run install-all` - Install dependencies for both client and server
- `npm run client` - Start only the React frontend
- `npm run server` - Start only the Express backend

### Client Directory
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server Directory
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Heroicons](https://heroicons.com/) - SVG icons

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).

---

**Made with ❤️ using the MERN Stack**
