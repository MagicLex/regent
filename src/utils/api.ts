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

// Function to send chat completion request
export const sendChatRequest = async (request: ChatCompletionRequest) => {
  const apiKey = getApiKey()
  
  if (!apiKey) {
    throw new Error('API key not found. Please add your OpenAI API key in settings.')
  }
  
  try {
    const response = await openAIAPI.post('/chat/completions', {
      model: request.model || 'gpt-3.5-turbo',
      messages: request.messages,
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