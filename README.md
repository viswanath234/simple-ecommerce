# FITZDO Ecommerce Platform

A full-stack ecommerce application built with React, Node.js, Express, and MongoDB. This project demonstrates a complete product catalog, user authentication, and shopping functionality.

## 📋 Project Structure

```
Ecommerce/
├── backend/              # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middlewares/  # Authentication & validation
│   │   ├── config/       # Database connection
│   │   ├── utils/        # Helper functions
│   │   └── seed/         # Database seeding
│   ├── public/           # Static files (images)
│   └── package.json
│
└── client/               # React frontend
    ├── src/
    │   ├── pages/        # Page components
    │   ├── components/   # Reusable components
    │   ├── services/     # API calls
    │   ├── layouts/      # Layout components
    │   └── assets/       # Images, icons
    ├── .env              # Environment variables
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)

### Installation

1. **Clone the repository**

```bash
cd Ecommerce
```

2. **Backend Setup**
   See [Backend README](./backend/README.md)

3. **Client Setup**
   See [Client README](./client/README.md)

## 🔗 Technology Stack

### Backend

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend

- **React 19** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## 📚 Features

- ✅ User Authentication (Register/Login with JWT)
- ✅ Product Catalog with Images
- ✅ Product Details Page
- ✅ Color, Model, and Size Selection
- ✅ Responsive Design
- ✅ Image Gallery with Thumbnails
- ✅ Product Specifications
- ✅ Rating and Reviews Display
- ✅ Delivery Information
- ✅ Static File Serving

## 🛠 Development

### Running Both Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

**Terminal 2 - Client:**

```bash
cd client
npm run dev
```

Backend runs on: `http://localhost:5000`
Client runs on: `http://localhost:5173`

## 📖 API Base URL

```
http://localhost:5000/api/v1
```

## 🗂 Folder Structure Details

### Backend Routes

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /products` - Get all products
- `GET /products/:id` - Get product details

### Frontend Pages

- `/` - Login page
- `/signup` - Registration page
- `/product-list` - Products listing
- `/product/:id` - Product details

## 🔐 Authentication

- JWT tokens are stored in localStorage
- User data persists across sessions
- Protected routes require valid token

## 🖼 Images

Images are served statically from `backend/public/images/` directory.

**URL Format:** `http://localhost:5000/images/filename.png`

## 📝 Environment Variables

Create `.env` files in both directories with appropriate values.

## 🌱 Database Seeding

Products are seeded from `backend/src/seed/product.data.js`

Run seeding command:

```bash
cd backend
npm run seed
```

## 📧 API Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "status": 200,
  "data": { ... },
  "message": "Success message"
}
```

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Images not loading?

- Ensure backend is running
- Check if images exist in `backend/public/images/`
- Verify `VITE_IMAGE_URL` in client `.env`

### Login not working?

- Check MongoDB connection
- Verify backend is running on port 5000
- Check API URL in `.env`

### Port already in use?

- Change the port in `backend/src/server.js` or `client/vite.config.js`

---

**For detailed setup instructions, see:**

- [Backend README](./backend/README.md)
- [Client README](./client/README.md)
