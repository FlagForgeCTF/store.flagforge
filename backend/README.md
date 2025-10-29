# FlagForge Store Backend

A complete Express.js backend for the FlagForge CTF merchandise store, perfectly matching the React/TypeScript frontend data structures.

## Features

- **Product Management**: T-shirts with size options and custom names, Stickers
- **Order Processing**: Complete checkout flow with customer info and shipping
- **Email Notifications**: Order confirmation emails via Brevo
- **Payment Methods**: Cash on Delivery and eSewa/FonePay support
- **MongoDB Integration**: Atlas cloud database with Mongoose ODM

## Tech Stack

- **Node.js** with ES6 modules
- **Express.js** for REST API
- **MongoDB Atlas** for database
- **Mongoose** for ODM
- **Nodemailer** with Brevo SMTP
- **CORS** enabled for frontend integration

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `POST /api/products/seed` - Seed initial products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

### Health Check
- `GET /api/health` - Server health status

## Data Structures

### Product
```javascript
{
  id: String,
  name: String,
  price: Number,
  image: String,
  category: 'tshirt' | 'sticker',
  description: String,
  sizes?: String[], // For t-shirts only
  inStock: Boolean
}
```

### Order
```javascript
{
  customer: {
    email: String,
    firstName: String,
    lastName: String,
    phone: String
  },
  shippingAddress: {
    address: String,
    city: String
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    image: String,
    quantity: Number,
    selectedSize?: String,
    customName?: String,
    category: String
  }],
  totalAmount: Number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  paymentStatus: 'pending' | 'paid' | 'failed',
  paymentMethod: 'esewa' | 'cod'
}
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Update `.env` file with your credentials:
   ```env
   # MongoDB Atlas
   MONGODB_URI=your_mongodb_connection_string
   
   # Brevo Email
   MAIL_HOST=smtp-relay.brevo.com
   MAIL_PORT=587
   MAIL_USER=your_brevo_email
   MAIL_PASS=your_brevo_smtp_key
   MAIL_FROM="FlagForge Store <noreply@flagforge.xyz>"
   
   # Server
   PORT=5000
   NODE_ENV=development
   ```

3. **Seed Database**
   ```bash
   npm run seed
   ```

4. **Start Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Frontend Integration

The backend is configured to work seamlessly with the React frontend:

- **CORS**: Enabled for `http://localhost:5173` (Vite dev server)
- **Data Matching**: All API responses match frontend TypeScript interfaces
- **Cart Integration**: Order creation accepts cart items with size/customization
- **Checkout Flow**: Handles complete checkout form data structure

## Email Templates

Order confirmation emails include:
- Professional FlagForge branding
- Complete order details with itemized list
- Customer and shipping information
- Payment method and status
- Responsive HTML design

## Error Handling

- Comprehensive validation for all endpoints
- Proper HTTP status codes
- Detailed error messages for debugging
- Email service fallback (order creation succeeds even if email fails)

## Development

The backend is designed to be:
- **Modular**: Clear separation of models, controllers, routes
- **Scalable**: Easy to add new products, payment methods, features
- **Maintainable**: Clean code with proper error handling
- **Frontend-First**: Built to match existing frontend requirements exactly