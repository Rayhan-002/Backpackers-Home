

# Backpackers Home - Travel Booking Website 🏕️

## 📋 Project Overview

**Backpackers Home** is a full-stack travel booking platform that enables users to explore travel packages, manage bookings, and view personalized dashboards. The project consists of a responsive **frontend** and a scalable **backend** connected to **MongoDB** for data storage and **Firebase** for authentication.

---

## 🚀 Features

### Frontend:
- **User Authentication:** Sign up and log in using Firebase.
- **Dynamic Packages:** Travel packages fetched from an API.
- **Dashboard:** View and manage your bookings.
- **Theme Toggle:** Switch between light and dark mode.
- **Smooth UI:** AOS (Animate on Scroll) for animations and Swiper.js for carousels.

### Backend:
- **Express Server:** RESTful API built with Express.
- **MongoDB Integration:** Stores travel packages and user bookings.
- **Environment Variables:** Secured sensitive information via `.env` file.
- **CORS Enabled:** Cross-origin access enabled for frontend and backend communication.

---

## 🛠️ Technologies Used

### Frontend:
- **HTML5**, **CSS3**, **JavaScript (ES6)**
- **Bootstrap 5** for responsive design
- **Firebase Authentication** for user management
- **AOS** and **Swiper.js** for animations and UI components

### Backend:
- **Node.js** and **Express.js** for server logic
- **MongoDB** for data storage
- **dotenv** for environment variable management
- **CORS** for cross-origin requests

---


## ⚙️ Installation and Setup

### Prerequisites
- **Node.js** installed
- **MongoDB Atlas** account or a local MongoDB instance
- **Firebase** project with web app enabled

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```
   DB_USER=yourMongoDBUsername
   DB_PASS=yourMongoDBPassword
   DB_NAME=backpackers_db
   DB_CLUSTER=yourClusterName
   PORT=5000
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

### Frontend Setup
1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Open `index.html` in a browser**, or use a live server:
   ```bash
   npx http-server
   ```

---

## 🧰 How to Use

1. **Homepage:** Browse travel packages, read client reviews, and explore.
2. **Authentication:** Register or log in via the login form.
3. **Dashboard:** View and manage your bookings after logging in.
4. **Booking:** Select a package and confirm your booking.
5. **Logout:** Use the logout button to end your session.

---


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Created by **Md. Rayhan Ali**

---

## 📝 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.
