# Career_Navigator_Ai 🚀

An AI-powered interview preparation platform that helps users practice technical and HR interviews through personalized interview sessions, AI-generated questions, and performance analysis.

## Features

* 🔐 User Authentication (Register/Login)
* 🤖 AI-powered interview question generation
* 📄 Resume-based interview preparation
* 🎯 Personalized interview sessions
* 📊 Interview performance analysis and reports
* 📝 Real-time question and answer interaction
* 🔒 Secure authentication using JWT
* ⚡ Modern and responsive user interface

## Tech Stack

### Frontend

* React.js
* Vite
* SCSS
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### AI Integration

* Gemini API

## Project Structure

```text
interview-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/interview-ai.git
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file inside the backend folder and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

## Run the Application

### Start Backend

```bash
cd backend
npm start
```

### Start Frontend

```bash
cd frontend
npm run dev
```

## Future Enhancements

* Voice-based mock interviews
* AI feedback on answers
* ATS Resume Analysis
* Interview scheduling
* Coding interview simulation
* Detailed analytics dashboard

## Author

Manish Kurhe
BE AIDS

---

If you found this project useful, consider giving it a ⭐ on GitHub.
