# Employees API

**AUREX Full-Stack Engineering Internship | Month 2, Week 3**

A RESTful backend built with **Node.js, Express.js, MongoDB Atlas and Mongoose**. It performs full CRUD (Create, Read, Update, Delete) operations on employee records, with validation, proper HTTP status codes and error handling.

## Tech Stack

| Tool | Purpose |
|---|---|
| Node.js | JavaScript runtime for the server |
| Express.js | Web framework for routes and middleware |
| MongoDB Atlas | Cloud database |
| Mongoose | Schema, model and validation layer for MongoDB |
| dotenv | Loads environment variables from `.env` |
| cors | Allows the frontend to call the API |
| nodemon | Restarts the server automatically during development |
| Postman | API testing |

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   └── employeeController.js    # CRUD logic
│   ├── models/
│   │   └── Employee.js              # Mongoose schema and model
│   ├── routes/
│   │   └── employeeRoutes.js        # Route definitions
│   └── server.js                    # App entry point
├── docs/                            # Documentation and screenshots
├── .env.example                     # Template for environment variables
├── .gitignore
├── package.json
└── README.md
```

## Setup and Installation

1. Clone the repository and open the `backend` folder:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder (copy `.env.example`) and add your own values:
   ```
   PORT=5001
   MONGODB_URI=your_mongodb_atlas_connection_string_here
   JWT_SECRET=your_secret_here
   ```
4. Start the server in development mode:
   ```bash
   npm run dev
   ```
5. The terminal should show:
   ```
   Server running on port 5001
   MongoDB connected
   ```

### Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on (default 5001) |
| `MONGODB_URI` | MongoDB Atlas connection string, including the database name |
| `JWT_SECRET` | Reserved for authentication (not used in Week 3) |

> The `.env` file contains secrets and is listed in `.gitignore`. It must never be pushed to GitHub.

## API Endpoints

Base URL: `http://localhost:5001/api/employees`

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| POST | `/api/employees` | Create a new employee | 201 Created |
| GET | `/api/employees` | Get all employees | 200 OK |
| GET | `/api/employees/:id` | Get a single employee by ID | 200 OK |
| PUT | `/api/employees/:id` | Update an employee by ID | 200 OK |
| DELETE | `/api/employees/:id` | Delete an employee by ID | 200 OK |

### Example: Create an employee

**Request** `POST /api/employees`

```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "department": "Sales",
  "role": "Executive",
  "performanceScore": 85
}
```

**Response** `201 Created`

```json
{
  "_id": "6720ab12cd34ef5678901234",
  "name": "Ali Khan",
  "email": "ali@example.com",
  "department": "Sales",
  "role": "Executive",
  "performanceScore": 85,
  "createdAt": "2026-10-26T10:00:00.000Z",
  "updatedAt": "2026-10-26T10:00:00.000Z"
}
```

### Example: Update an employee

**Request** `PUT /api/employees/:id`

```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "department": "Marketing",
  "role": "Manager",
  "performanceScore": 90
}
```

### Example: Delete an employee

**Response** `200 OK`

```json
{ "message": "Employee deleted" }
```

### Error Responses

| Status | When it happens | Example message |
|---|---|---|
| 400 Bad Request | A required field is missing or a value is invalid | `Name is required` |
| 400 Bad Request | Email already exists (duplicate) | `E11000 duplicate key error ...` |
| 400 Bad Request | The ID in the URL is not a valid ObjectId | `Invalid employee id` |
| 404 Not Found | No employee exists with that ID | `Employee not found` |
| 500 Internal Server Error | Unexpected server or database error | error message |

All errors are returned as JSON in this format:

```json
{ "message": "Employee not found" }
```

## Database Model

**Collection:** `employees` (database: `staffpulse`)

| Field | Type | Rules |
|---|---|---|
| `name` | String | Required, trimmed |
| `email` | String | Required, unique, stored in lowercase |
| `department` | String | Required |
| `role` | String | Required |
| `performanceScore` | Number | Minimum 0, maximum 100, default 0 |
| `createdAt` | Date | Added automatically (timestamps) |
| `updatedAt` | Date | Added automatically (timestamps) |

MongoDB also adds a unique `_id` (ObjectId) to every document.

## How the Code Works

Each request follows the same flow:

```
Client (Postman)
      ↓
server.js        → receives the request, parses JSON with express.json()
      ↓
Route            → matches the URL and method (employeeRoutes.js)
      ↓
Middleware       → router.param checks that :id is a valid ObjectId
      ↓
Controller       → runs the CRUD logic (employeeController.js)
      ↓
Model            → Mongoose schema validates and talks to MongoDB (Employee.js)
      ↓
MongoDB Atlas
      ↓
Response (JSON + status code) back to the client
```

- **`config/db.js`** connects the app to MongoDB Atlas using the `MONGODB_URI` from `.env`.
- **`models/Employee.js`** defines the shape of an employee and the validation rules.
- **`controllers/employeeController.js`** has one function per operation (create, get all, get one, update, delete). Each one uses `try/catch` and returns a suitable status code.
- **`routes/employeeRoutes.js`** connects each URL and HTTP method to a controller function, and holds the ID-validation middleware.
- **`server.js`** loads the environment variables, connects to the database, registers middleware (`cors`, `express.json`), mounts the routes and starts the server.

## Testing

All endpoints were tested in **Postman**, including both successful and failing requests.

| # | Test | Method | Expected Status |
|---|---|---|---|
| 1 | Create Employee | POST | 201 |
| 2 | Get All Employees | GET | 200 |
| 3 | Get Single Employee | GET | 200 |
| 4 | Update Employee | PUT | 200 |
| 5 | Create Employee - Missing Name | POST | 400 |
| 6 | Create Employee - Duplicate Email | POST | 400 |
| 7 | Get Employee - Invalid ID | GET | 400 |
| 8 | Delete Employee | DELETE | 200 |
| 9 | Get Employee - Not Found | GET | 404 |
| 10 | Update Employee - Not Found | PUT | 404 |
| 11 | Delete Employee - Not Found | DELETE | 404 |

Screenshots of every test, the MongoDB Atlas setup and the running server are in the `docs/` folder. The exported Postman collection is included in the repository.

## Security Practices

- Secrets (`MONGODB_URI`, `JWT_SECRET`) are stored in `.env`, never hardcoded in the source code.
- `.env` and `node_modules` are listed in `.gitignore`.
- `.env.example` contains placeholder values only.
- Input is validated by the Mongoose schema, and invalid IDs are rejected before reaching the database.

## Learning Summary

This week I moved from consuming APIs to building my own backend. I learned how Node.js and npm work, how to create an Express server with routes and middleware, and how REST APIs use HTTP methods (GET, POST, PUT, DELETE) with proper status codes. I set up a MongoDB Atlas cluster, connected it using Mongoose, and learned the difference between a schema and a model. I implemented full CRUD for employees, added validation, and tested every endpoint, including error cases, in Postman. I also learned why secrets must live in `.env` and stay out of GitHub, and how to organize a backend into config, models, controllers and routes so each file has a single responsibility.

## Blockers and Issues

| Issue | How it was solved |
|---|---|
| `queryTxt ETIMEOUT` when connecting to MongoDB Atlas (DNS lookup failed on my network) | Set Google DNS servers in `server.js` using `dns.setServers(["8.8.8.8", "1.1.1.1"])` |
 | The server only had the `/api/employees` route, so the URL in Postman was wrong. Fixed by using the correct route. |
| `Invalid employee id` while testing 404 cases | A `<` character was accidentally included in the URL. Removed it and used a valid ID format. |
| Port 5000 already in use by an old server | Changed `PORT` in `.env` and restarted the server |

## Author

**Nabiha Samad**, AUREX Full-Stack Engineering Internship
