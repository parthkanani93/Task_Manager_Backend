# Task Management API

A RESTful API for task management with JWT authentication built using Node.js, Express, and MongoDB.

## Live API
API Documentation: [Task Manager API Docs](http://taskmanagerbackend-env.us-east-1.elasticbeanstalk.com/api-docs/)

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Swagger Documentation

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

## Project Setup

1. **Clone the repository**
bash
git clone <repository-url>
cd task-management-api


2. **Install dependencies**
bash
npm install


3. **Environment Variables**
Create a `.env` file in the root directory with the following:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000


4. **Run the application**
Development mode:

bash
npm run dev


Production mode:
bash
npm start


5. **Access the API**
- Local API: `http://localhost:5000`
- API Documentation: `http://localhost:5000/api-docs`

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout (requires auth)

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `GET /tasks/:id` - Get specific task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Deployment

The project is configured with CI/CD pipeline for AWS Elastic Beanstalk:
- Push to master branch automatically deploys to AWS
- Production URL: http://taskmanagerbackend-env.us-east-1.elasticbeanstalk.com

## Author
Parth Kanani