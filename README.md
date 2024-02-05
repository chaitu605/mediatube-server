# Mediatube Server

## 💻 Technologies and Packages used 🛠🧰
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Packages**: Mongoose, BcryptJs, JsonWebToken, Cloudinary

## Project Overview 🚀
This server is designed to support the Mediatube client, providing REST APIs for user authentication, authorization, and video management. Key technologies and packages include Node.js and Express.js for the backend, MongoDB for data storage, and Cloudinary for handling images.

## Features and Functionality 📝
- **Authentication and Authorization**: Implemented using JsonWebToken for secure user authentication and authorization.
- **Database Storage**: User and video details are stored in MongoDB using the Mongoose ODM.
- **Image Storage**: Thumbnails are stored on Cloudinary, with image links stored in the database.

## Getting Started 🚦
To set up the backend locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables, including MongoDB connection details and Cloudinary credentials.
4. Run the server using `npm start`.

## API Endpoints 🛣
- **/api/auth**: User authentication and authorization endpoints.
- **/api/videos**: Endpoints for adding, updating, and deleting videos.

## Configuration 🔧
Ensure proper configuration of environment variables for database connection and Cloudinary integration.

## Database Schema 📋
The MongoDB schema includes collections for users and videos.

## Deployment 🌐
Guidelines for deploying the backend to a production environment.

## Developer Gurus 🤝
Feel free to suggest any idea or improvements.
