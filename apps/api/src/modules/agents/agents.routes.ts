import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { agentService } from "./agents.service";

const agentRoutes = new Hono().post(
  "/analyze",
  zValidator(
    "json",
    z.object({
      query: z.string(),
    }),
  ),
  async (c) => {
    const { query } = c.req.valid("json");
    const result = await agentService.analyze({ query });
    return c.json({ result });
  },
);

export { agentRoutes };
