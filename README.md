# Siyumi's PPW Portfolio

A premium, industry-grade MERN stack portfolio web application to showcase professional experience, skills, and academic journals. This project features a full Content Management System (CMS) for real-time updates and uses advanced modern UI/UX elements such as physics-based animations, glassmorphism, and responsive split-screen layouts.

## 🚀 Key Features
- **Dynamic Content Management**: Manage Intro, CV, Career Plan, Certificates, and week-by-week Journals across the portfolio via a centralized database.
- **Premium UI/UX**: Built with React and Framer Motion for smooth physics-based animations, hover behaviors, and fluid page transitions.
- **Responsive Layouts**: Designed to provide an excellent reading and browsing experience across mobile, tablet, and desktop viewports.
- **Data Visualizations**: Beautiful integration of skills, timelines, and technical project showcases.
- **Built on the MERN Stack**: Complete end-to-end JavaScript architecture (MongoDB, Express, React, Node.js).

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite, Framer Motion (for animations), Recharts (for charts), Lucide React (for icons)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose ORM

## 🔧 Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or a free MongoDB Atlas cloud cluster)

## 📦 Installation & Setup

1. **Navigate to the Project Root**:
   Open a terminal and navigate to your `PPW-Portfolio` directory.

2. **Install Server Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

## ⚙️ Environment Variables

To allow the backend to connect to the database, you must configure your environment variables.

1. Navigate to the `server` directory.
2. Ensure there is a `.env` file present in `server/` with the following configuration:

```env
# server/.env
MONGO_URI=mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@cluster.mongodb.net/ppw-portfolio?retryWrites=true&w=majority
PORT=5000
```
*(Replace the `MONGO_URI` with your actual MongoDB connection URI if using a different cluster).*

## 🌱 Database Seeding

To quickly populate the database with your initial portfolio details, CV configurations, and journal entries, execute the unified seed script from within the `server` directory:

```bash
cd server
node seed.js
```
*You should see a success message indicating that both the Journals and Portfolio Configuration have been seeded successfully.*

## ▶️ Running the Application

You will need to run the backend and frontend servers simultaneously in separate terminals.

**Terminal 1 (Backend API)**
```bash
cd server
node server.js
```
*(This will start the backend server, typically on port 5000).*

**Terminal 2 (Frontend Client)**
```bash
cd client
npm run dev
```
*(This will start the Vite React development server, typically on port 5173).*

Once both services are running, open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`) to view your portfolio!

## 📂 Project Structure
- `/client`: The React frontend codebase containing pages, dynamic components, and UI assets.
- `/server`: The Express backend application encompassing API routes, Mongoose schemas (`models/`), and the seeding script.