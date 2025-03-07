import { logger } from "@repo/logs";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const agentService = {
  async analyze({ query }: { query: string }) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are a DeFi yield optimization expert.",
          },
          {
            role: "user",
            content: query,
          },
        ],
      });

      return completion.choices[0]?.message?.content || "";
    } catch (error) {
      logger.error("Error in agent analysis:", error);
      throw error;
    }
  },
};
