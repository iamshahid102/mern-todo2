import express from "express";
import cors from "cors";
import dbConnection from './config/db.js'
import routes from "./routes/ToDoroutes.js";
import dotenv from "dotenv";
dotenv.config()

export const app = express();


// Middleware
app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:5173"
  }
));

// MongoDB connection
dbConnection();


app.use("/api", routes);

// Start server
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}...`));
