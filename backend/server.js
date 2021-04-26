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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  const allowedOrigins = ["http://localhost:3000", "https://www.slenos.com"];
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
}



if (process.env.NODE_ENV === "production") {
  var corsOptions = {
    origin: ['https://devoleumverifier.netlify.app/','https://www.slenos.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(morgan("dev"));
  app.use(
    cors(corsOptions)
  );
}


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
