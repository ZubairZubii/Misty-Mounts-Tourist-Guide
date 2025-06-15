![Screenshot 2025-06-15 132111](https://github.com/user-attachments/assets/cde9609d-906b-46b1-80ed-f7bb241b9c26)# Misty Mounts Tourist Guide

![Misty Mounts Logo](/logo.png)

Misty Mounts is a comprehensive MERN stack-based web application designed to promote tourism in Northern Pakistan. It serves as a detailed guide to both popular and hidden tourist spots, offering features for users to explore destinations, find accommodations, and for local guides and administrators to manage content and bookings. Our goal is to provide travelers with an intuitive and rich experience, making their journey through the beautiful Northern areas of Pakistan seamless and memorable.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Support](#contact--support)

## Features

### User Panel Interface
![User Panel Dashboard](/Screenshot%202025-06-15%20133758.png)
![User Panel Destinations](/Screenshot%202025-06-15%20130733.png)
![User Panel Hotels](/Screenshot%202025-06-15%20130806.png)
![User Panel About Us](/Screenshot%202025-06-15%20130905.png)
![User Panel Contact](/Screenshot%202025-06-15%20132111.png)
![User Panel Login](/Screenshot%202025-06-15%20132135.png)
![User Panel Signup](/Screenshot%202025-06-15%20132152.png)

**User Panel Features:**
*   **Interactive Homepage:** Visually appealing landing page with featured destinations.
*   **Destination Explorer:** Browse and search for various tourist spots.
*   **Hotel Listings:** Discover and book accommodations.
*   **Authentication:** Secure login and signup for users and local guides.
*   **Dynamic UI:** Modern and professional design with animations and responsive layout.
*   **Dark Mode Toggle:** For comfortable viewing in different lighting conditions.

### Local Guide Panel Interface
![Local Guide Dashboard](/1.png)
![Local Guide Destinations](/2.png)
![Local Guide Bookings](/3.png)
![Local Guide Profile](/4.png)
![Local Guide Settings](/5.png)
![Local Guide Analytics](/6.png)

**Local Guide Panel Features:**
*   **Dashboard Overview:** Comprehensive view of bookings and activities
*   **Destination Management:** Add and manage tourist spots
*   **Booking Management:** Handle and track user bookings
*   **Profile Management:** Update guide information and credentials
*   **Settings:** Customize guide preferences and notifications
*   **Analytics:** View performance metrics and user engagement

**Admin Panel:**
*   (Features to be added by administrators - e.g., User Management, Content Moderation, Analytics)

## Technologies Used

Misty Mounts is built using the MERN (MongoDB, Express.js, React, Node.js) stack, along with several modern libraries and tools to ensure a robust, scalable, and user-friendly experience.

### Frontend (React.js)
*   **React.js:** A JavaScript library for building user interfaces.
*   **React Router DOM:** For declarative routing in the application.
*   **Material-UI (MUI):** A comprehensive React UI framework for beautiful and responsive designs.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Framer Motion:** A production-ready motion library for React to power animations.
*   **React Icons:** A collection of popular icon packs as React components.
*   **Axios:** Promise-based HTTP client for the browser and Node.js.
*   **Vite:** A fast build tool that provides an extremely fast development experience.

### Backend (Node.js & Express.js)
*   **Node.js:** JavaScript runtime for server-side development.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A NoSQL document database for flexible data storage.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JWT (JSON Web Tokens):** For secure user authentication.
*   **bcryptjs:** For hashing passwords securely.
*   **CORS:** Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
*   **dotenv:** Loads environment variables from a .env file.

## Project Structure

The project is organized into two main directories:

```
.  
├── Backend/             # Contains all server-side code (Node.js, Express.js, MongoDB models, API routes)
│   ├── config/          # Database configuration
│   ├── AdminBackend/    # Admin-specific API endpoints and logic
│   ├── UserBackend/     # User-specific API endpoints and logic
│   ├── LocalGuidePannel/ # Local Guide-specific API endpoints and logic
│   ├── node_modules/
│   ├── package.json
│   └── server.js        # Main backend server file
└── Frontend/            # Contains all client-side code (React.js application)
    ├── public/          # Static assets (images, favicon, etc.)
    ├── src/
    │   ├── assets/      # Application assets like general images
    │   ├── LocalGuidePannel/ # Components and pages for the Local Guide interface
    │   ├── UserPanel/   # Components and pages for the general User interface
    │   │   ├── components/
    │   │   │   ├── Home/     # Components for the home section
    │   │   │   └── LoginSignup/ # Components for authentication (Login, Signup, WelcomeMessage)
    │   │   ├── pages/    # Main pages like Authentication
    │   │   └── Routes/   # Frontend route definitions
    │   └── App.jsx      # Main React application component
    │   └── main.jsx     # React entry point
    ├── node_modules/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## Installation Guide

To get the Misty Mounts project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have the following installed:
*   [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
*   [npm](https://www.npmjs.com/get-npm) (comes with Node.js) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Community Server)

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/ZubairZubii/Misty-Mounts-Tourist-Guide.git
cd Misty-Mounts-Tourist-Guide
```

### 2. Backend Setup

Navigate to the `Backend` directory, install dependencies, and start the server:

```bash
cd Backend
npm install   # or yarn install
```

Create a `.env` file in the `Backend` directory and add your MongoDB URI and JWT Secret:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., `mongodb://localhost:27017/mistymounts` or your MongoDB Atlas URI). Replace `your_jwt_secret_key` with a strong, random string.

Now, start the backend server:

```bash
npm start # or node server.js
```

The backend server will typically run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal window, navigate to the `Frontend` directory, install dependencies, and start the development server:

```bash
cd ../Frontend
npm install   # or yarn install
npm run dev   # or yarn dev
```

The frontend application will typically run on `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once both the backend and frontend servers are running:

1.  Open your web browser and go to `http://localhost:5173`.
2.  You will land on the Misty Mounts Tourist Guide homepage.
3.  Use the navigation bar to explore Destinations, Hotels, About Us, and Contact pages.
4.  Register a new user account or log in if you already have one. Test both regular user and local guide functionalities if applicable.
5.  Explore the newly enhanced Login and Signup pages with their modern UI.

## Contributing

Contributions are welcome! If you'd like to contribute to Misty Mounts, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add: your new feature'`).
4.  Push to your branch (`git push origin feature/your-feature-name`).
5.  Open a Pull Request to the `main` branch of this repository.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (Note: You may need to create a LICENSE.md file if one doesn't exist).

## Contact & Support

For any questions, issues, or collaborations, please contact [Zubair](mailto:your.email@example.com) (replace with your actual email).

Your GitHub Profile: [ZubairZubii](https://github.com/ZubairZubii)











