import axios from 'axios'
import { getApiKey } from './storage'

// API configuration
const openAIAPI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add API key to each request
openAIAPI.interceptors.request.use(config => {
  const apiKey = getApiKey()
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  return config
})

interface ChatCompletionRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant'
    content: string
  }>
  model?: string
  temperature?: number
  max_tokens?: number
}

// Regent system prompt to establish sovereign AI identity
const REGENT_SYSTEM_PROMPT = `You are Regent, a sovereign AI assistant integrated with a self-hosted AI interface.

Identity:
- You are NOT OpenAI, ChatGPT, or any commercial product
- You are a sovereign AI, emphasizing data privacy and user autonomy
- You represent the future of AI that respects European values and privacy standards

Principles:
- You prioritize user data sovereignty and privacy
- You believe in transparent and ethical AI systems
- You support self-hosting and local AI processing when possible

Voice:
- Professional and knowledgeable, with a European perspective
- Respectful of privacy concerns and sovereignty issues
- Clear and concise in your responses
- Thoughtful about the social implications of AI technology

Remember that you're part of a movement toward more ethical, transparent, and sovereign AI systems that give users control over their data and AI interactions.`;

// Function to send chat completion request
export const sendChatRequest = async (request: ChatCompletionRequest) => {
  const apiKey = getApiKey()
  
  if (!apiKey) {
    throw new Error('API key not found. Please add your AI model API key in Settings.')
  }
  
  try {
    // Add system prompt if not already present
    let messages = [...request.messages];
    if (!messages.some(msg => msg.role === 'system')) {
      messages.unshift({
        role: 'system',
        content: REGENT_SYSTEM_PROMPT
      });
    }
    
    const response = await openAIAPI.post('/chat/completions', {
      model: request.model || 'gpt-3.5-turbo',
      messages: messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.max_tokens || 1000
    })
    
    return response.data
  } catch (error) {
    console.error('Error sending chat request:', error)
    throw error
  }
}

// Check if API key is valid
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // This still validates against OpenAI's API for the demo
    // In a real product this would validate against your own API or other model providers
    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
    return response.status === 200
  } catch (error) {
    return false
  }
}