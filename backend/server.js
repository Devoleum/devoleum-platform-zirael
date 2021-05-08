import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import colors from "colors";

import historyRoutes from "./routes/historyRoutes.js";
import stepRoutes from "./routes/stepRoutes.js";
import userRoutes from "./routes/userRoutes.js";
/* 
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
*/

dotenv.config();

connectDB();

const app = express();

app.use(morgan("dev"));
var whitelist = [
  "http://localhost:3000",
  "https://devoleumverifier.netlify.app",
  "https://www.slenos.com",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/histories", historyRoutes);
app.use("/api/steps", stepRoutes);
app.use("/api/users", userRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
