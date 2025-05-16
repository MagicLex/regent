// Local storage keys
export const STORAGE_KEYS = {
  API_KEY: 'regent_api_key',
  CHAT_HISTORY: 'regent_chat_history',
  SETTINGS: 'regent_settings',
  BANKID_USER: 'regent_bankid_user'
}

// Chat message type
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// Session type to store chats
export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

// Get all chat sessions
export const getChatSessions = (): ChatSession[] => {
  const sessions = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY)
  return sessions ? JSON.parse(sessions) : []
}

// Save a chat session
export const saveChatSession = (session: ChatSession): void => {
  const sessions = getChatSessions()
  const existingIndex = sessions.findIndex(s => s.id === session.id)
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session
  } else {
    sessions.push(session)
  }
  
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(sessions))
}

// Get a specific chat session by ID
export const getChatSessionById = (id: string): ChatSession | undefined => {
  const sessions = getChatSessions()
  return sessions.find(session => session.id === id)
}

// Delete a chat session
export const deleteChatSession = (id: string): void => {
  const sessions = getChatSessions()
  const updatedSessions = sessions.filter(session => session.id !== id)
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(updatedSessions))
}

// Get API key
export const getApiKey = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.API_KEY)
}

// Save API key
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey)
}

// Generate a unique ID (simple implementation for demo)
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

// BankID user type
export interface BankIDUser {
  personalNumber: string
  name: string
  givenName: string
  surname: string
}

// Get BankID user
export const getBankIDUser = (): BankIDUser | null => {
  const userData = localStorage.getItem(STORAGE_KEYS.BANKID_USER)
  return userData ? JSON.parse(userData) : null
}

// Save BankID user
export const saveBankIDUser = (user: BankIDUser): void => {
  localStorage.setItem(STORAGE_KEYS.BANKID_USER, JSON.stringify(user))
}

// Remove BankID user (logout)
export const removeBankIDUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.BANKID_USER)
}