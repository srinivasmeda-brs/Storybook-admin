import express from 'express'; 
import expressLayouts from 'express-ejs-layouts';
import dotenv from "dotenv";
import cors from 'cors';
import connectdb from './src/config/db.js';
import { notFound, errorHandler } from "./src/middleWare/errMiddleWare.js";
import adminRoute from "./src/routes/adminRoute.js";

const app = express();
const port = process.env.PORT || 3005;

// Load environment variables
dotenv.config();

// Connect to the database
connectdb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Path to the views directory

// Routes
app.use('/api', adminRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
