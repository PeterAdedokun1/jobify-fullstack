import "express-async-errors"
import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
const app: Application = express();
import morgan from "morgan";
import { nanoid } from "nanoid"
import router from "./routes/JobRouter";
import mongoose from "mongoose"
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", router)

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

