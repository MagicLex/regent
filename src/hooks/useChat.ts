import { useState, useCallback, useEffect } from 'react'
import { ChatMessage, ChatSession, generateId, saveChatSession, getChatSessionById } from '../utils/storage'
import { sendChatRequest } from '../utils/api'

interface UseChatProps {
  sessionId?: string
}

export function useChat({ sessionId = generateId() }: UseChatProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load existing chat if sessionId is provided
  useEffect(() => {
    if (sessionId) {
      const existingSession = getChatSessionById(sessionId)
      if (existingSession) {
        setMessages(existingSession.messages)
      }
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
    setMessages([])
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  }
}