export const DEFAULTS = {
  LIMIT_PAGINATION: 10,
  LIMIT_OFFSET: 0,
  PORT: 1234
}

export const AI = {
  PROVIDER: 'groq',
  MODEL: process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant',
  BASE_URL: 'https://api.groq.com/openai/v1'
}