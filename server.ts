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

interface Jobs {
  id: any;
  company: string;
  position: string
}
// const id =nanoid()

let jobs: Jobs[] = [
  { id: 1, company: 'apple', position: 'front-end' },
  { id: 2, company: 'google', position: 'back-end' },

]



app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("thank godlkuhlkhkjhj")
});
app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "Data received", data: req.body });
});

app.get("/api/v1/jobs", router)

//get all jobs
app.post("/api/v1/jobs", (req: Request, res: Response) => {
  const { company, position } = req.body
  if (!company || !position) {
    return res.status(400).json({ msg: "Please provide company and position" });
  }
  const id = 20937409587349;
  const job = { id, company, position };
  jobs.push(job)
  res.status(200).json({ job })
})


app.get("/api/v1/jobs/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job })
})

//Edit job

app.patch("/api/v1/jobs/:id", (req: Request, res: Response) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });

  }
  job.company = company;
  job.position = position;
  res.status(200).json({ msg: "job modified", job })
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

