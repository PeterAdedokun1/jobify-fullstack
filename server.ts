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
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", router)
app.use(errorHandlerMiddleWare)


app.post("/api/v1/test", [body("name").notEmpty().withMessage("name is required")], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  console.log(errors.isEmpty())
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg)
    return res.status(400).json({ errors: errorMessages })
  }
  next()
}, (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ msg: `hello ${name}` })
})



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

