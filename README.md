# Exercise Tracker

This is a full-stack Exercise Tracker web application built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **Tailwind CSS**. It allows users to create profiles, log exercises, and view their exercise history with date filtering and limits. The UI includes responsive forms and modals for better interaction and user experience.

## Features

* ✅ Create a new user account
* 🏋️ Add exercises for a specific user
* 📅 Optional exercise date input (defaults to current date)
* 📋 View a user’s full exercise log
* 📆 Filter logs by `from` and `to` dates
* 🔢 Limit the number of returned exercise records
* 💬 Interactive modals for form results using Tailwind CSS

## Technologies Used

* **Node.js** and **Express.js** for backend API
* **MongoDB** with **Mongoose** for database modeling and querying
* **Tailwind CSS** for modern, responsive UI styling
* **JavaScript (Vanilla)** for frontend interactivity

## Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/exercise-tracker.git
cd exercise-tracker
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/exercise-tracker
```

> Make sure your MongoDB server is running locally or replace with your MongoDB Atlas URI.

4. **Start the Server**

```bash
npm start
```

The server will be available at `http://localhost:3000`

## API Endpoints

### Create a New User

`POST /api/users`

```json
{
  "username": "john_doe"
}
```

### Get All Users

`GET /api/users`

### Add Exercise

`POST /api/users/:_id/exercises`

```json
{
  "description": "Running",
  "duration": 30,
  "date": "2024-05-01" // optional
}
```

### Get User Logs

`GET /api/users/:_id/logs?from=YYYY-MM-DD&to=YYYY-MM-DD&limit=2`

## Frontend UI

* Built using **HTML**, **Tailwind CSS**, and **JavaScript**
* Responsive forms for creating users and logging exercises
* Modal-based output display for feedback and logs

## Screenshots

*(Add screenshots of the app showing user creation, exercise logging, and logs in modal)*

## License

This project is licensed under the MIT License.

---

Feel free to fork and modify as needed. Contributions are welcome!
