# FITZDO Frontend - React Client

React-based ecommerce frontend for the FITZDO platform. Browse products, view details, and manage selections with a modern UI.

## 📋 Requirements

- Node.js v14 or higher
- npm or yarn
- Backend server running on http://localhost:5000

## 🚀 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1
VITE_IMAGE_URL=http://localhost:5000
```

**Configuration Notes:**

- `VITE_API_URL`: Backend API base URL (with /api/v1 suffix)
- `VITE_IMAGE_URL`: Backend image server URL (no trailing slash)

## 📂 Project Structure

```
client/
├── src/
│   ├── App.jsx                     # Main routing component
│   ├── main.jsx                    # Vite entry point
│   ├── index.css                   # Global styles
│   ├── assets/                     # Static assets
│   ├── components/
│   │   ├── Header.jsx              # Navigation header
│   │   ├── Login.jsx               # Login page
│   │   ├── Signup.jsx              # Registration page
│   │   ├── ProductCard.jsx         # Product grid item
│   │   ├── ProductGallery.jsx      # Product image gallery
│   │   ├── ProductBuyBox.jsx       # Product sidebar (pricing, selections)
│   │   ├── ProductSpecs.jsx        # Product specifications
│   │   └── ...other components
│   ├── pages/
│   │   ├── ProductList.jsx         # Product grid page
│   │   ├── ProductDetail.jsx       # Product details page
│   │   └── ...other pages
│   ├── layouts/
│   │   └── MainLayout.jsx          # Main layout wrapper
│   └── utils/
│       └── ...utility functions
├── public/                         # Public assets
├── .env
├── .gitignore
├── package.json
├── vite.config.js                  # Vite configuration
├── eslint.config.js                # ESLint configuration
└── index.html                      # HTML entry point
```

## 🎯 Features

### Authentication

- **User Registration** - Sign up with name, email, password
- **User Login** - Log in with email and password
- **Session Management** - JWT tokens stored in localStorage
- **Dynamic Header** - Shows logged-in user's name

### Product Display

- **Product Listing** - Grid view of all products with thumbnails
- **Product Details** - Full product page with:
  - Image gallery (main + 4 thumbnails)
  - Pricing and discount information
  - Color, model, and size selection
  - Product specifications
  - Delivery information
  - "What's in the Box" section

### User Interface

- **Responsive Design** - Works on desktop and tablet
- **Interactive Elements** - Hover effects and smooth transitions
- **Navigation** - Client-side routing with React Router

## 🚀 Running the Application

### Development Mode (with hot-reload)

```bash
npm run dev
```

The app will open at: `http://localhost:5173`

**Console Output:**

```
  VITE v7.2.4  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📝 Environment Variables

| Variable         | Description              | Example                        |
| ---------------- | ------------------------ | ------------------------------ |
| `VITE_API_URL`   | Backend API base URL     | `http://localhost:5000/api/v1` |
| `VITE_IMAGE_URL` | Backend image server URL | `http://localhost:5000`        |

**Usage in Code:**

```javascript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_URL;
const imageUrl = import.meta.env.VITE_IMAGE_URL;
```

## 🔑 API Integration

### Authentication Endpoints

**Register:**

```javascript
fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password }),
});
```

**Login:**

```javascript
fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

### Product Endpoints

**Get All Products:**

```javascript
fetch(`${import.meta.env.VITE_API_URL}/products`);
```

**Get Single Product:**

```javascript
fetch(`${import.meta.env.VITE_API_URL}/products/PRODUCT_ID`);
```

## 💾 Storage & State Management

### LocalStorage

- **user** - Stores logged-in user object
- **token** - Stores JWT authentication token

**Example:**

```javascript
// Login flow
localStorage.setItem("user", JSON.stringify(userData));
localStorage.setItem("token", jwtToken);

// Access later
const user = JSON.parse(localStorage.getItem("user"));
```

### Component State

- Managed using React Hooks (`useState`, `useEffect`)
- No external state management library needed

## 🎨 Styling

- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Lucide React Icons** - Icon library
- **Custom CSS** - In `src/index.css`

### Using Tailwind Classes

```jsx
<div className="flex items-center justify-between p-4 bg-white shadow">
  {/* Content */}
</div>
```

### Using Lucide Icons

```jsx
import { ShoppingCart, Heart } from 'lucide-react';

<ShoppingCart size={24} />
<Heart size={24} />
```

## 🔄 Component Hierarchy

```
App
├── BrowserRouter (React Router)
└── MainLayout
    ├── Header
    │   ├── Logo
    │   ├── Navigation
    │   └── User Info (if logged in)
    └── Routes
        ├── /signup → Signup component
        ├── /login → Login component
        ├── /product-list → ProductList page
        │   └── ProductCard (grid items)
        └── /product/:id → ProductDetail page
            ├── ProductGallery
            ├── ProductBuyBox
            └── ProductSpecs
```

## 🌐 Routing

| Route           | Component     | Description            |
| --------------- | ------------- | ---------------------- |
| `/signup`       | Signup        | User registration page |
| `/login`        | Login         | User login page        |
| `/product-list` | ProductList   | Grid of all products   |
| `/product/:id`  | ProductDetail | Single product details |

## 📊 Data Flow

```
1. User Login
   ├─ User submits email/password
   ├─ Frontend POST to /auth/login
   ├─ Backend returns { user, token }
   ├─ Store in localStorage
   └─ Redirect to /product-list

2. View Products
   ├─ ProductList fetches /products
   ├─ Maps array to ProductCard components
   ├─ Click product → navigate to /product/:id
   └─ ProductDetail fetches specific product data

3. Product Display
   ├─ ProductGallery displays images with VITE_IMAGE_URL
   ├─ ProductBuyBox shows colors/models/sizes
   ├─ ProductSpecs displays accordion sections
   └─ Delivery & pricing info rendered
```

## 🛠 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server (port 5173) |
| `npm run build`   | Create production build              |
| `npm run preview` | Preview production build locally     |
| `npm run lint`    | Run ESLint code checker              |

## 🐛 Troubleshooting

### Frontend Won't Connect to Backend (CORS Error)

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

- Ensure backend is running: `npm start` in backend folder
- Check `VITE_API_URL` in `.env` matches backend URL
- Verify backend has CORS enabled

### Images Not Loading (404 errors)

```
Failed to load image from http://localhost:5000/images/...
```

**Solution:**

- Ensure backend is running on port 5000
- Check `VITE_IMAGE_URL` in `.env` is correct
- Verify product image paths in backend database
- Backend serves from `backend/public/images/` directory

### Port Already in Use (5173)

```
error when starting dev server:
Error: listen EADDRINUSE: address already in use :::5173
```

**Solution:**

```bash
# Kill process on port 5173 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force

# Or change port in vite.config.js
export default {
  server: { port: 5174 }
}
```

### Login Page Has Form Errors

**Solution:**

- Check browser console (F12 → Console tab)
- Verify backend `/auth/login` endpoint is working
- Test with Postman if needed
- Check `.env` file exists and has correct `VITE_API_URL`

### localStorage Issues (User Not Persisting)

**Solution:**

- Clear browser cache: DevTools → Application → Local Storage → Clear All
- Check localStorage with: `localStorage.getItem('user')`
- Re-login and check if token/user are stored

## 🚨 Important Notes

- ⚠️ Never commit `.env` file - use `.env.example` template instead
- 🔒 JWT tokens expire in 7 days - user needs to re-login after
- 💾 localStorage can be cleared by browser settings - not persistent across browser resets
- ✅ Always test API endpoints with backend running
- 📱 Responsive design works best on 768px+ width screens

## 🔄 Workflow for New Developers

1. **Clone repository**

   ```bash
   git clone <repo-url>
   cd Ecommerce/client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment**

   ```bash
   # Create .env file with backend URLs
   echo "VITE_API_URL=http://localhost:5000/api/v1" > .env
   echo "VITE_IMAGE_URL=http://localhost:5000" >> .env
   ```

4. **Start backend** (in separate terminal)

   ```bash
   cd ../backend
   npm start
   ```

5. **Start frontend**

   ```bash
   npm run dev
   ```

6. **Open in browser**
   - Visit: http://localhost:5173
   - Sign up or login to see products

## 📞 Common Tasks

### Change API Endpoint

Edit `.env`:

```env
VITE_API_URL=http://your-backend-url/api/v1
```

### Change Image URL

Edit `.env`:

```env
VITE_IMAGE_URL=http://your-image-server-url
```

### Add New Component

1. Create file: `src/components/MyComponent.jsx`
2. Import and use in parent component:
   ```jsx
   import MyComponent from "../components/MyComponent";
   ```

### Add New Page/Route

1. Create file: `src/pages/MyPage.jsx`
2. Add route in `App.jsx`:
   ```jsx
   <Route path="/my-page" element={<MyPage />} />
   ```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Lucide Icons](https://lucide.dev)

## 🔐 Security Notes

- ⚠️ Passwords sent to backend (HTTPS only in production)
- 🔐 JWT tokens stored in localStorage (XSS vulnerable if not careful)
- ✅ CORS configured to allow frontend-backend communication
- 📝 API validation done on backend (never trust client data)

## 📊 Performance Tips

- Use React DevTools to check for re-renders
- Images use placeholder service for fast loading
- Production build minifies and optimizes code
- Consider adding lazy loading for product images

---

**Ready to start?**

1. `npm install` - Install dependencies
2. Create `.env` with API/image URLs
3. `npm run dev` - Start development server
4. Visit http://localhost:5173

**Backend must be running!**

- In separate terminal: `cd ../backend && npm start`

See [Main README](../README.md) and [Backend README](../backend/README.md) for complete setup.
