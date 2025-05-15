import { useState, useCallback, useEffect } from 'react'
import { ChatMessage, ChatSession, generateId, saveChatSession, getChatSessionById } from '../utils/storage'
import { sendChatRequest } from '../utils/api'

interface UseChatProps {
  initialSessionId?: string
}

export function useChat({ initialSessionId }: UseChatProps = {}) {
  const [sessionId, setSessionId] = useState<string>(initialSessionId || generateId())
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load existing chat if sessionId is provided
  useEffect(() => {
    const existingSession = getChatSessionById(sessionId)
    if (existingSession) {
      setMessages(existingSession.messages)
    } else {
      setMessages([])
    }
  }, [sessionId])

  // Save messages to storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      const session: ChatSession = {
        id: sessionId,
        title: messages[0].content.substring(0, 30) + '...',
        messages,
        createdAt: messages[0].timestamp,
        updatedAt: Date.now()
      }
      saveChatSession(session)
    }
  }, [messages, sessionId])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now()
    }
    
    setMessages(prevMessages => [...prevMessages, userMessage])
    setIsLoading(true)
    setError(null)
    
    try {
      // Prepare messages for API format
      const apiMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }))
      
      // Send to API
      const response = await sendChatRequest({
        messages: apiMessages
      })
      
      // Add assistant message from response
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.choices[0].message.content,
        timestamp: Date.now()
      }
      
      setMessages(prevMessages => [...prevMessages, assistantMessage])
    } catch (err) {
      setError('Failed to send message. Please check your API key or try again later.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearMessages = useCallback(() => {
    const newId = generateId()
    setSessionId(newId)
    setMessages([])
  }, [])

  const switchChat = useCallback((chatId: string) => {
    setSessionId(chatId)
  }, [])

  return {
    sessionId,
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    switchChat
  }
}