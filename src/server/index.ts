import express from "express";
import { pipelineRouter } from "./routes/pipeline";

const app = express();
app.use(express.json());
app.use("/api/pipeline", pipelineRouter);

app.listen(3000, () => console.log("GenAI Pipeline running on port 3000"));
