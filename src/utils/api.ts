import axios from 'axios'
import { getApiKey, getBankIDUser, saveBankIDUser } from './storage'

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

// BankID API configuration
// Note: In a real implementation, this would be a server-side API
// We're simulating this client-side for demonstration purposes
const bankIDAPI = axios.create({
  // In a real implementation, this would be the real BankID API URL
  // For now we're using a simulated endpoint
  baseURL: '/api/bankid', // This would be proxied to your backend
  headers: {
    'Content-Type': 'application/json',
  }
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

interface BankIDAuthRequest {
  personalNumber: string
  endUserIp: string
}

interface BankIDAuthResponse {
  orderRef: string
  autoStartToken: string
  qrStartToken: string
  qrStartSecret: string
}

interface BankIDCollectRequest {
  orderRef: string
}

interface BankIDUser {
  personalNumber: string
  name: string
  givenName: string
  surname: string
}

interface BankIDCollectResponse {
  orderRef: string
  status: 'pending' | 'failed' | 'complete'
  hintCode?: string
  completionData?: {
    user: BankIDUser
    signature: string
    ocspResponse: string
  }
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

// Function to start BankID authentication
export const startBankIDAuth = async (personalNumber: string): Promise<BankIDAuthResponse> => {
  try {
    // In a real implementation, this would call your backend which would then call BankID
    // For simulation purposes, we're mocking the response
    
    // Simulate a network request delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Simulate a successful response
    const mockResponse: BankIDAuthResponse = {
      orderRef: 'order-' + Math.random().toString(36).substring(2, 10),
      autoStartToken: 'auto-' + Math.random().toString(36).substring(2, 10),
      qrStartToken: 'qr-' + Math.random().toString(36).substring(2, 10),
      qrStartSecret: 'secret-' + Math.random().toString(36).substring(2, 10),
    }
    
    return mockResponse
  } catch (error) {
    console.error('Error starting BankID authentication:', error)
    throw new Error('Failed to start BankID authentication')
  }
}

// Function to check BankID authentication status
export const collectBankIDAuth = async (orderRef: string): Promise<BankIDCollectResponse> => {
  try {
    // In a real implementation, this would call your backend which would then call BankID
    // For simulation purposes, we're mocking the response
    
    // Simulate a network request delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Simulate a successful response with the user's information
    const mockUser: BankIDUser = {
      personalNumber: '198001019999',
      name: 'Anna Andersson',
      givenName: 'Anna',
      surname: 'Andersson'
    }
    
    const mockResponse: BankIDCollectResponse = {
      orderRef: orderRef,
      status: 'complete',
      completionData: {
        user: mockUser,
        signature: 'base64-encoded-signature-would-go-here',
        ocspResponse: 'base64-encoded-ocsp-would-go-here'
      }
    }
    
    // Save the user in local storage
    saveBankIDUser(mockUser)
    
    return mockResponse
  } catch (error) {
    console.error('Error collecting BankID authentication:', error)
    throw new Error('Failed to collect BankID authentication')
  }
}

// Function to check if a user is logged in with BankID
export const isBankIDLoggedIn = (): boolean => {
  return !!getBankIDUser()
}

// Function to get the current BankID user
export const getCurrentBankIDUser = (): BankIDUser | null => {
  return getBankIDUser()
}

// Function to log out BankID user
export const logoutBankID = (): void => {
  localStorage.removeItem('regent_bankid_user')
}