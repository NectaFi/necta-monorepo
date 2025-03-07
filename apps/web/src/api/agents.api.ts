import { apiRpc, getApiClient, InferRequestType } from "./client";

const $analyze = apiRpc.agents.analyze.$post;

export type AnalyzeParams = InferRequestType<typeof $analyze>["json"];

export async function analyzeQuery(query: string) {
  const client = await getApiClient();
  const response = await client.agents.analyze.$post({
    json: { query },
  });
  return response.json();
}
