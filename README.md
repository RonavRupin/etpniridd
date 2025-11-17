# Student Wellbeing Dashboard

This is a full-stack web application created for our PBL project. It's a web-based Digital Service Platform (DSP) designed to help students manage their mental wellbeing alongside their academic tasks.

This project features a context-aware AI chatbot, a mood tracker, and a study plan, all tested using UiPath RPA.

---

## 🚀 Features

* **Full User Authentication:** Secure login/signup with JSON Web Tokens.
* **Protected Routes:** A private dashboard accessible only to logged-in users.
* **Integrated Dashboard:** A central home page showing a user's name, academic status, and their latest mood log.
* **Context-Aware AI Chatbot:** A chat assistant (powered by Gemini) that is "grounded" in the user's real-time data, such as their mood and study tasks.
* **Mood Tracker:** A "main transaction flow" where users can log their mood (1-5) and a private note.
* **Study Plan (To-Do List):** A simple task manager for users to add, complete, and delete study-related tasks.
* **Calmness Page:** A "Breaks and Calmness" feature with a guided breathing exercise.

---

## 🛠️ Technology Stack

* **Frontend:** React (with Vite), React Router, axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (using Mongoose)
* **Authentication:** JWT (JSON Web Tokens), bcrypt
* **Generative AI:** Google Gemini API
* **RPA Testing:** UiPath Studio

---

## 🏃 How to Run This Project

This is a full-stack application with a separate frontend and backend. You will need **two terminals** running at the same time.

### Prerequisites
* [Node.js](https://nodejs.org/) installed.
* A `MongoDB Atlas` account and a `DB_CONNECT_URL`.
* A `GEMINI_API_KEY` from Google AI Studio.

### 1. Set Up Secrets
1.  Clone the repository.
2.  Go into the `backend` folder.
3.  Create a file named `.env`.
4.  Paste in the following, adding your own keys:
    ```
    DB_CONNECT_URL="YOUR_MONGO_DATABASE_STRING"
    JWT_SECRET="YOUR_RANDOM_SECRET_KEY"
    PORT=5000
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

### 2. Run the Backend (Terminal 1)
```bash
# Open your first terminal
cd backend
npm install
npm run dev

Wait for server is running on port 5000 and database connected. Leave this terminal running.
3. Run the Frontend (Terminal 2)
# Open a NEW, second terminal
cd front-end
npm install
npm run dev

This will give you a localhost URL (e.g., http://localhost:5173).
4. Open the App
Open the localhost URL from the second terminal in your browser. The application is now fully running.
