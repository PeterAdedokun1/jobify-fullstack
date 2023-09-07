import "express-async-errors"
import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import morgan from "morgan";
import router from "./routes/JobRouter";
import mongoose from "mongoose"
import errorHandlerMiddleWare from "./middleware/ErrorHandlerMiddleWare";
import { body, validationResult } from "express-validator"
import authRouter from "./routes/AuthRouter";
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", router)
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

