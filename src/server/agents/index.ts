import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function callAI(systemPrompt: string, userPrompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  return response.choices[0].message.content;
}

export const researchAgent = {
  async execute(topic: string) {
    return callAI(
      "You are a research agent. Gather key facts, statistics, and insights about the given topic.",
      `Research the following topic thoroughly: ${topic}`
    );
  },
};

export const writerAgent = {
  async execute(topic: string, context: any[]) {
    return callAI(
      "You are a content writer. Create engaging, well-structured content based on the research provided.",
      `Write about: ${topic}\n\nResearch context: ${JSON.stringify(context)}`
    );
  },
};

export const editorAgent = {
  async execute(draft: string) {
    return callAI(
      "You are an editor. Polish the content for clarity, grammar, and engagement. Maintain the original voice.",
      `Edit and improve this content:\n\n${draft}`
    );
  },
};
