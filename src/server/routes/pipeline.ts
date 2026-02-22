import { Router } from "express";
import { researchAgent, writerAgent, editorAgent } from "../agents";

export const pipelineRouter = Router();

pipelineRouter.post("/execute", async (req, res) => {
  const { topic, steps } = req.body;
  const results: any[] = [];

  for (const step of steps) {
    switch (step.type) {
      case "research":
        results.push(await researchAgent.execute(topic));
        break;
      case "write":
        results.push(await writerAgent.execute(topic, results));
        break;
      case "edit":
        results.push(await editorAgent.execute(results[results.length - 1]));
        break;
    }
  }

  res.json({ results, completedAt: new Date().toISOString() });
});

pipelineRouter.get("/templates", (_req, res) => {
  res.json({
    templates: [
      { id: 1, name: "Blog Post Pipeline", steps: ["research", "write", "edit"] },
      { id: 2, name: "Technical Doc", steps: ["research", "write"] },
      { id: 3, name: "Social Media Pack", steps: ["research", "write", "edit"] },
    ],
  });
});
