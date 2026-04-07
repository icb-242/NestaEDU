import { openai } from '@ai-sdk/openai'

export type AIModel = 'gpt-4o' | 'gpt-4o-mini'

/**
 * Returns a configured AI model instance.
 * Throws if the API key is not set.
 *
 * Phase 4 note: swap the provider import and model strings here when
 * migrating from OpenAI to Claude.
 */
export function getAIModel(model: AIModel = 'gpt-4o') {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured')
  }
  return openai(model)
}
