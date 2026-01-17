# FITZDO Backend - API Server

Node.js/Express backend for the FITZDO ecommerce platform. Handles user authentication, product management, and serves static assets.

## 📋 Requirements

- Node.js v14 or higher
- npm or yarn
- MongoDB Atlas account (cloud database)

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

**Get MongoDB URI:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string with your credentials

### 3. Database Seeding

Seed the database with 20 sample products:

```bash
npm run seed
```

**Expected Output:**

```
MongoDB connected: cluster.mongodb.net
Clearing existing products...
Inserting products...
Products seeded successfully ✅
```

## 📂 Project Structure

```
backend/
├── src/
│   ├── app.js                      # Express app setup
│   ├── server.js                   # Server entry point
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js      # Auth logic
│   │   └── product.controller.js   # Product logic
│   ├── models/
│   │   ├── user.model.js           # User schema
│   │   └── product.model.js        # Product schema
│   ├── routes/
│   │   ├── auth.routes.js          # Auth endpoints
│   │   └── product.routes.js       # Product endpoints
│   ├── middlewares/
│   │   ├── auth.middleware.js      # JWT verification
│   │   └── error.middleware.js     # Error handling
│   ├── utils/
│   │   ├── apiResponse.js          # Response formatter
│   │   ├── apiError.js             # Error formatter
│   │   └── generateToken.js        # JWT generator
│   └── seed/
│       ├── product.data.js         # Sample products
│       └── product.seed.js         # Seeding script
├── public/
│   └── images/                     # Product images
├── .gitignore
├── .env
└── package.json
```

## 🎯 API Endpoints

### Authentication

**Register User**

```
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}

Response: { success, data: { user, token }, message }
```

**Login User**

```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response: { success, data: { user, token }, message }
```

### Products

**Get All Products**

```
GET /api/v1/products?search=yoga&page=1&limit=10

Response: { success, data: [products], message }
```

**Get Product by ID**

```
GET /api/v1/products/:id

Response: { success, data: product, message }
```

## 🔒 Authentication

- Uses JWT (JSON Web Tokens)
- Token stored in localStorage (client-side)
- Token expires in 7 days
- Passwords hashed with bcryptjs

## 📊 Database Models

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  brand: String,
  title: String,
  category: String,
  description: String,
  pricing: {
    price: Number,
    mrp: Number,
    discountPercent: Number
  },
  rating: {
    value: Number,
    count: Number
  },
  media: {
    thumbnail: String,
    images: [String]
  },
  colors: [{ name, hex, available }],
  models: [{ name, available }],
  sizes: [{ name, available }],
  flags: { sponsored: Boolean },
  delivery: { text: String },
  inventory: { stock: Number },
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Running the Server

### Development Mode (with auto-reload)

```bash
npm start
```

Server will run on: `http://localhost:5000`

**Console Output:**

```
Serving static files from: D:\...\backend\public
Server is running on port 5000
MongoDB connected: cluster.mongodb.net
```

## 🖼 Static Files

Images are served from `public/images/` directory.

**Access URL:**

```
http://localhost:5000/images/yoga1.png
```

## 📝 Available Scripts

| Command        | Description                        |
| -------------- | ---------------------------------- |
| `npm start`    | Start server                       |
| `npm run seed` | Seed database with sample products |

## 🛠 Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## ❌ Error Handling

All errors follow this format:

```json
{
  "success": false,
  "status": 400,
  "message": "Error message"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: MongooseError: connection refused
```

**Solution:**

- Check MongoDB URI in `.env`
- Verify username/password are correct
- Ensure IP is whitelisted in MongoDB Atlas

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

```bash
# Change PORT in .env
PORT=5001
```

### Images Not Serving (404 errors)

**Solution:**

- Verify `backend/public/images/` directory exists
- Check image filenames match database
- Ensure backend server is running
- Check `VITE_IMAGE_URL` in client `.env`

### Seeding Fails

**Solution:**

```bash
# Run seed command
npm run seed

# Check MongoDB connection
# Verify database credentials in .env
```

### Authentication Failing (401 Unauthorized)

**Solution:**

- Ensure JWT_SECRET is set in `.env`
- Check token format in request headers
- Verify email/password are correct
- Token might have expired

## 📚 API Testing

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

**Get Products:**

```bash
curl http://localhost:5000/api/v1/products
```

**Get Single Product:**

```bash
curl http://localhost:5000/api/v1/products/PRODUCT_ID
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new requests with:
   - Base URL: `http://localhost:5000/api/v1`
   - Headers: `Content-Type: application/json`
   - Body: JSON data as shown above

## 🚨 Important Notes

- ⚠️ Never commit `.env` file to git - it's listed in `.gitignore`
- 🔐 Keep JWT_SECRET secure and unique
- 💾 Use strong MongoDB passwords in production
- ✅ Validate all user inputs on server-side
- 🔒 Enable HTTPS in production
- 📝 Never hardcode secrets in code

## 🔄 Workflow for New Developers

1. **Clone repository**

   ```bash
   git clone <repo-url>
   cd Ecommerce/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment**

   ```bash
   # Create .env and add MongoDB URI
   echo "MONGODB_URI=your_connection_string" > .env
   ```

4. **Seed database**

   ```bash
   npm run seed
   ```

5. **Start server**

   ```bash
   npm start
   ```

6. **Test API**
   - Visit: http://localhost:5000/images/yoga1.png
   - Or use Postman to test endpoints

## 📞 Support & Debugging

Check these resources when troubleshooting:

- Browser DevTools Network tab (check API responses)
- Server console logs (npm start output)
- MongoDB Atlas logs (connection issues)
- Check `.env` file configuration
- Review API endpoint URLs

---

**Ready to start?**

1. `npm install` - Install dependencies
2. Create `.env` with MongoDB URI
3. `npm run seed` - Seed database
4. `npm start` - Start server

See [Main README](../README.md) for complete project setup.
