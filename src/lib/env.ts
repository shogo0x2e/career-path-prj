if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
