import "express-async-errors"
import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import morgan from "morgan";
import JobRouter from "./routes/JobRouter";
import mongoose from "mongoose"
import errorHandlerMiddleWare from "./middleware/ErrorHandlerMiddleWare";
import { body, validationResult } from "express-validator"
import authRouter from "./routes/AuthRouter";
import UserRouter from "./routes/userRoute"
import { authenticateUser } from "./middleware/AuthMiddleWare";
import cookieParser from "cookie-parser"
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

//for accessing the cookie
app.use(cookieParser())

//routers
app.use("/api/v1/jobs", authenticateUser, JobRouter)
app.use("/api/v1/users", authenticateUser,  UserRouter)
app.use("/api/v1/auth", authRouter)
app.use(errorHandlerMiddleWare)





const port = process.env.PORT || 3000;

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:3000/Full-stack Jobify')

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

