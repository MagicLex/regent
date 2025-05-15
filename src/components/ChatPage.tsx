import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../hooks/useChat'
import SettingsDialog from './SettingsDialog'
import ChatHistory from './ChatHistory'
import Overlay from './Overlay'

const ChatPage = () => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { 
    sessionId, 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearMessages,
    switchChat
  } = useChat()

  const [showSettings, setShowSettings] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSelectChat = (chatId: string) => {
    switchChat(chatId)
    setShowSidebar(false)
  }

  const handleNewChat = () => {
    clearMessages()
    setShowSidebar(false)
  }

  return (
    <div className="flex flex-col h-screen bg-surface-light">
      {/* Header */}
      <header className="border-b border-border bg-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setShowSidebar(true)}
            className="mr-4 text-gray-600 hover:text-gray-900"
            aria-label="Toggle history sidebar"
          >
            ☰
          </button>
          <span className="text-2xl mr-2">👑</span>
          <h1 className="text-xl font-semibold">Regent</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleNewChat}
            className="btn"
          >
            New Chat
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="btn"
          >
            Settings
          </button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 container-sm">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">👑</div>
              <h2 className="text-xl font-medium mb-2">Welcome to Regent</h2>
              <p className="text-gray-600">Your sovereign AI chat experience</p>
              <p className="text-sm text-gray-500 mt-2">Control your data. Own your conversations.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-bubble ${
                  message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble chat-bubble-ai animate-pulse">
                Thinking...
              </div>
            )}
            {error && (
              <div className="text-red-500 p-3 text-center">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-white p-4 container-sm">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="input flex-1 resize-none h-[60px] max-h-[200px] min-h-[60px]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn btn-primary h-[60px] px-6"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
      
      {/* Sidebar, Overlay and Dialogs */}
      <ChatHistory 
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onSelectChat={handleSelectChat}
        currentSessionId={sessionId}
      />
      <Overlay 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)} 
      />
      <SettingsDialog 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  )
}

export default ChatPage