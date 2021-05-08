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

conf = {
  originUndefined: function (req, res, next) {
    if (!req.headers.origin) {
      res.json({
        mess:
          "Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined",
      });
    } else {
      next();
    }
  },
  cors: {
    origin: function (origin, cb) {
      let wl = ['https://devoleumverifier.netlify.app/', 'https://www.slenos.com'];
      if (wl.indexOf(origin) != -1) {
        cb(null, true);
      } else {
        cb(new Error("invalid origin: " + origin), false);
      }
    },
    optionsSuccessStatus: 200,
  },
};

app.use(conf.originUndefined, cors(conf.cors));
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
