# Mentorship Platform Backend

## Overview

This project is a simplified backend for a mentorship platform where **Parents, Students, and Mentors interact**.

The system allows:

* Parents to create student accounts
* Mentors to create lessons
* Parents to assign students to lessons
* Mentors to manage lesson sessions

The backend follows a **clean MVC architecture**:

```
Routes → Controllers → Models → Database
```

It also implements **JWT authentication, role-based authorization, and MongoDB database design**.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt for password hashing

---

# Project Structure

```
mentorship-backend/

app.js
server.js

config/
 └── db.js

models/
 ├── User.js
 ├── Student.js
 ├── Lesson.js
 ├── Booking.js
 └── Session.js

controllers/
 ├── authController.js
 ├── studentController.js
 ├── lessonController.js
 ├── bookingController.js
 ├── llmController.js
 └── sessionController.js

routes/
 ├── authRoutes.js
 ├── studentRoutes.js
 ├── lessonRoutes.js
 ├── bookingRoutes.js
 ├── llmRoutes.js
 └── sessionRoutes.js

middleware/
 ├── authMiddleware.js
 └── roleMiddleware.js

utils/
 └── generateToken.js
```

---

# Installation & Setup

## 1 Clone Repository

```
git clone https://github.com/Arpit65-sys/mentorship-backend.git
cd mentorship-backend
```

## 2 Install Dependencies

```
npm install
```

## 3 Create Environment File

Create a `.env` file in the root directory.

Example:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mentorshipDB
JWT_SECRET=supersecretkey
```

## 4 Start Server

```
node server.js
```
or
```
npm start
```

Server will run on:

```
http://localhost:5000
```

---

# User Roles

The platform contains three types of users.

### Parent

* Can create students
* Can assign students to lessons (booking)

### Mentor

* Can create lessons
* Can create sessions inside lessons

### Student

* Created by parents
* Attends lessons

Students **cannot sign up directly**.

---

# Authentication

Authentication uses **JWT tokens**.

After login or signup, the API returns a token.

Send the token in headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# API Endpoints

---

# Auth APIs

## Signup

Create a new Parent or Mentor account.

**Endpoint**

```
POST /auth/signup
```

**Body**

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "parent"
}
```

Allowed roles:

```
parent
mentor
```

---

## Login

Login using email and password.

**Endpoint**

```
POST /auth/login
```

**Body**

```
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response returns:

```
JWT Token
User Details
```

---

## Get Current User

Get currently logged in user.

**Endpoint**

```
GET /auth/me
```

Header required:

```
Authorization: Bearer TOKEN
```

---

# Student APIs

Students are created **by parents only**.

---

## Create Student

**Endpoint**

```
POST /students
```

Header:

```
Authorization: Bearer PARENT_TOKEN
```

**Body**

```
{
  "name": "Student One",
  "age": 14
}
```

The student will automatically be linked to the parent account.

---

## Get Parent Students

Returns all students created by the parent.

**Endpoint**

```
GET /students
```

Header:

```
Authorization: Bearer PARENT_TOKEN
```

---

# Lesson APIs

Lessons are created **by mentors**.

---

## Create Lesson

**Endpoint**

```
POST /lessons
```

Header:

```
Authorization: Bearer MENTOR_TOKEN
```

**Body**

```
{
  "title": "Math Lesson",
  "description": "Basic Algebra for beginners"
}
```

Each lesson will be linked to the mentor who created it.

---

# Booking APIs

Parents assign a student to a lesson.

---

## Create Booking

**Endpoint**

```
POST /bookings
```

Header:

```
Authorization: Bearer PARENT_TOKEN
```

**Body**

```
{
  "studentId": "STUDENT_ID",
  "lessonId": "LESSON_ID"
}
```

This assigns the student to a lesson.

---

# Session APIs

Sessions represent **individual lesson meetings**.

Mentors can create sessions under lessons.

---

## Create Session

**Endpoint**

```
POST /sessions
```

Header:

```
Authorization: Bearer MENTOR_TOKEN
```

**Body**

```
{
  "lessonId": "LESSON_ID",
  "date": "2026-03-20",
  "topic": "Introduction to Algebra",
  "summary": "Basics of algebra and variables"
}
```

---

## Get Sessions by Lesson

Retrieve all sessions under a lesson.

**Endpoint**

```
GET /sessions/lesson/:lessonId
```

Example:

```
GET /sessions/lesson/64abc123456
```

---

# Example Workflow

Typical system usage flow:

### Step 1

Parent signs up

### Step 2

Mentor signs up

### Step 3

Parent creates student

### Step 4

Mentor creates lesson

### Step 5

Parent assigns student to lesson (booking)

### Step 6

Mentor creates session for lesson

### Step 7

Students attend lesson sessions

---

### LLM Text Summarization API

This backend includes a Lightweight LLM integration that summarizes long text using the Google Gemini API.

The feature allows clients to send long text and receive a concise summary in bullet points.

The API uses the Gemini Flash Lite model for fast and efficient summarization.

Endpoint

`
POST /llm/summarize
`

Request Body

```
{
  "text": "Your long text here..."
}
```

Response

```
{
  "summary": "• Point 1\n• Point 2\n• Point 3",
  "model": "gemini-2.0-flash-lite"
}
```

The response returns:

summary → Generated summarized text

model → The LLM model used for summarization

### LLM Implementation

The summarization feature is implemented using two main components:

Environment Variables

The Gemini API key is loaded securely using environment variables.

Add this to your .env file:

```
GEMINI_API_KEY=your_api_key_here
```

Example using curl:

```
curl -X POST http://localhost:5000/llm/summarize \
-H "Content-Type: application/json" \
-d '{
"text": "Artificial intelligence is transforming industries by automating tasks, improving decision making, and enabling new technologies across healthcare, education, and finance."
}'

```

Example Response:

```
{
  "summary": "• AI automates tasks across industries\n• Improves decision making\n• Enables innovation in sectors like healthcare and education",
  "model": "gemini-2.0-flash-lite"
}
```

Summary Format

The LLM generates summaries as:

3–5 bullet points

Concise and readable

Maximum ~120 words

# Security Practices

This backend implements several security best practices.

* Password hashing using **bcrypt**
* JWT authentication
* Role-based access control
* Environment variables for secrets
* Protected routes

