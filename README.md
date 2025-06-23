# 📚 Books Management API

A RESTful API for managing books, authors, and categories built with **Express**, **TypeScript**, and **MongoDB**.

## 🚀 Features

- **Full CRUD Operations** for Books, Authors, and Categories
- **TypeScript** for type safety and better development experience
- **MongoDB** with Mongoose for data persistence
- **Express.js** with middleware support (CORS, Morgan, Multer)
- **Modular Architecture** with separate routes, controllers, and models
- **Error Handling** with custom middleware
- **Development Tools** with hot reload support

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Mini-Project-Books
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/books-management
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud instance.

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with hot reload using `ts-node-dev`.

### Production Mode

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint              | Description                  |
| ------ | --------------------- | ---------------------------- |
| GET    | `/`                   | Welcome message and API info |
| GET    | `/api/books`          | Get all books                |
| POST   | `/api/books`          | Create a new book            |
| GET    | `/api/books/:id`      | Get a specific book          |
| PUT    | `/api/books/:id`      | Update a book                |
| DELETE | `/api/books/:id`      | Delete a book                |
| GET    | `/api/authors`        | Get all authors              |
| POST   | `/api/authors`        | Create a new author          |
| GET    | `/api/authors/:id`    | Get a specific author        |
| PUT    | `/api/authors/:id`    | Update an author             |
| DELETE | `/api/authors/:id`    | Delete an author             |
| GET    | `/api/categories`     | Get all categories           |
| POST   | `/api/categories`     | Create a new category        |
| GET    | `/api/categories/:id` | Get a specific category      |
| PUT    | `/api/categories/:id` | Update a category            |
| DELETE | `/api/categories/:id` | Delete a category            |

## 🏗️ Project Structure

```
src/
├── models/          # Mongoose models
├── controllers/     # Route controllers
├── routes/          # Express routes
├── middlewares/     # Custom middleware
├── app.ts          # Express app configuration
└── server.ts       # Server entry point
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## 🔧 Technologies Used

- **Backend**: Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Middleware**: CORS, Morgan, Multer
- **Development**: ts-node-dev, TypeScript

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Happy Coding! 🎉**
