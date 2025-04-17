🚀 Day 4 – Final Evaluation Project
🧠 Objective
You have 4 hours to build a small but functional back-end API in Node.js with Express.

You will test all your endpoints with Postman.

📦 What You Need to Build
A simple user authentication system, including:

Feature	Description
📝 Register	Create a new user (email + password)
🔐 Login	Authenticate a user and return a JWT token
🙋‍♂️ Get profile	Return the current user’s info using the token
📄 Get all users	Return all users (protected route)
❌ Delete user	Delete a user by ID (protected route)
All routes should return JSON responses.

🛠 Tech Requirements
Node.js + Express
bcryptjs (for password hashing)
jsonwebtoken (for authentication)
In-memory storage (array) or MongoDB (optional)
No front-end (you will use Postman for testing)
🔗 API Endpoints to Implement
1. ✅ POST /register
Body: { "email": "test@mail.com", "password": "123456" }
Action: Hash password and store user
Return: 201 Created + user info (without password)
2. ✅ POST /login
Body: { "email": "...", "password": "..." }
Action: Check credentials
Return: { token: "JWT-TOKEN" }
If invalid: 401 Unauthorized
3. ✅ GET /me
Headers: Authorization: Bearer <token>
Action: Return current user info from token
Return: { email: "..." }
If token invalid/missing: 401 Unauthorized
4. ✅ GET /users
Headers: Authorization: Bearer <token>
Action: Return all users
If token invalid/missing: 401 Unauthorized
5. ✅ DELETE /users/:id
Headers: Authorization: Bearer <token>
Action: Remove user by ID
Return: { message: "User deleted" }
If not found: return 404
🔒 Authentication Notes
Use JWT to protect routes (/me, /users, /users/:id)
Store token in Authorization header as Bearer <token>
🧪 Testing with Postman
Register a user with POST /register
Login with POST /login to get a token
Add token in Authorization header: { key: "Authorization", value: Bearer ${YOURTOKENHERE} }
Test /me, /users, and delete users
🧹 Optional Extras (Bonus)
Validate email format and password length
Avoid duplicate emails
Add isAdmin: true field and protect /users for admins only
Dockerize your APP
Code Structure (important!)
/project-root
│
├── server.js               → main app entry point
├── routes/                → all route definitions (register, login, etc.)
├── middleware/            → JWT auth middleware
├── controllers/           → logic functions (createUser, loginUser, etc.)
├── models/                → (optional) user schema or in-memory storage
Bonus Tips:
Avoid writting all your logic in one file
Structure your code for readability, reusability, and maintenance
Indent your code properly (2 spaces consistently)
Use Meangful variable/function name:
example:
feat: add login route
fix: handle missing token
✅ What Will Be Evaluated
Item	Points
Functional /register route	3
Functional /login route	3
Token-based auth with middleware	3
/me returns user data	3
/users + DELETE work with auth	3
Code is clean and modular (multi-files)	2
Proper indentation / formatting	1
Commits are made and well named	3
Bonus features (validation, admin check)	+2
Total	/25
Reminder: You have 4 hours.
Use Postman to test every route as you build.
Ask for help if you're blocked for more than 15 minutes.

Good luck 💪