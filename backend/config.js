export const DEFAULTS = {
  LIMIT_PAGINATION: 10,
  LIMIT_OFFSET: 0,
  PORT: 1234
}

export const AI = {
  PROVIDER: 'groq',
  MODEL: process.env.GROQ_MODEL ?? 'llama3-8b-8192',
  BASE_URL: 'https://api.groq.com/openai/v1'
}