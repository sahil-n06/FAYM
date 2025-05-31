# FAYM - Web Analytics Event Service

A lightweight backend service that captures user events (`view`, `click`, `location`) and provides basic analytics via REST API.  
Built using **Node.js**, **Express**, and **MongoDB** with Mongoose for object modeling.

---

## 📦 Setup Instructions

### 🔧 Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB instance
- Postman or any API client for testing

### 🚀 Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sahil-n06/FAYM.git
  
Install dependencies:

bash
Copy
Edit
npm install
Configure environment variables:
Create a .env file in the root with the following content:

env
Copy
Edit
MONGODB_URI=mongodb+srv://<your-db-uri>
PORT=5000
Start the backend service:

bash
Copy
Edit
node index.js
🔌 API Documentation
1️⃣ POST /api/events
Purpose: Create a new event
Request Body Example:

json
Copy
Edit
{
  "user_id": "user123",
  "event_type": "view",
  "payload": {
    "url": "https://example.com/page"
  }
}
Event Type Specific Payloads:

view: { "url": "..." }

click: { "element_id": "..." }

location: { "latitude": 28.61, "longitude": 77.20 }

Success Response:

json
Copy
Edit
{
  "message": "Event recorded successfully"
}
Status Code: 202 Accepted

Error Responses:

Missing fields:

json
Copy
Edit
{
  "message": "Missing required fields"
}
400 Bad Request

Invalid payload for type:

json
Copy
Edit
{
  "message": "Missing url in payload for view event"
}
400 Bad Request

2️⃣ GET /api/analytics/event-counts
Purpose: Get total number of events
Query Parameters (optional):

event_type: Filter by view, click, or location

start_date: ISO date string

end_date: ISO date string

Example:

arduino
Copy
Edit
/api/analytics/event-counts?event_type=click&start_date=2025-01-01&end_date=2025-12-31
Success Response:

json
Copy
Edit
{
  "total_events": 42
}
Error Response:

json
Copy
Edit
{
  "message": "Server error"
}
500 Internal Server Error

3️⃣ GET /api/analytics/event-counts-by-type
Purpose: Get counts grouped by event_type
Query Parameters (optional):

start_date

end_date

Example:

csharp
Copy
Edit
/api/analytics/event-counts-by-type?start_date=2025-01-01&end_date=2025-12-31
Success Response:

json
Copy
Edit
{
  "view": 20,
  "click": 15,
  "location": 7
}
Error Response:

json
Copy
Edit
{
  "message": "Server error"
}
500 Internal Server Error

⚙️ Chosen Technologies
Technology	Why Chosen
Node.js	Non-blocking I/O, fast setup, great for REST APIs
Express.js	Lightweight and powerful routing and middleware
MongoDB	Schema-flexible for dynamic payloads
Mongoose	Easy modeling, built-in validations
Postman	Quick API testing

🧬 Database Schema Explanation
Collection: events
Fields:

js
Copy
Edit
{
  user_id: String,         // ID of the user
  event_type: String,      // "view", "click", or "location"
  timestamp: Date,         // default: Date.now
  payload: Object          // dynamic structure depending on event_type
}
✅ Indexes can be added on event_type, timestamp for optimized queries.

✅ Chose Object for payload to allow flexible shape.

🚧 Challenges Faced & Solutions
Challenge	Solution
Dynamic validation for different event_type	Used conditional checks in controller before saving to DB
Structuring analytics queries in MongoDB	Leveraged $group and $match in MongoDB Aggregation pipeline
Payload shape conflicts	Chose a schema-less approach for payload with manual validation

🌱 Future Improvements
🔐 Add user authentication with JWT

📦 Implement event queues (e.g., RabbitMQ or Kafka) for async processing

📊 Create a real-time dashboard using WebSockets

🧠 Add machine learning models to detect unusual patterns

📍 Use 2dsphere indexing for optimized geolocation queries

🧹 Create data retention logic or archiving for old events

🧪 Write unit tests using Jest