import express from "express";
import itemRouter from "./routes/item.js";
import authRouter from "./routes/auth.js";
import cors from "cors";

// Create an express server
const app = express();

// Enable CORS for all origins
app.use(
  cors({
    origin: "http://localhost:5173", // Change this to your frontend URL in production
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);

// Tell express to use the json middleware
app.use(express.json());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/items", itemRouter);
app.use("/api/auth", authRouter);

export default app;
