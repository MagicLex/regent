import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../hooks/useChat'
import SettingsDialog from './SettingsDialog'
import ChatHistory from './ChatHistory'
import Overlay from './Overlay'
import LanguageSelector from './LanguageSelector'
import { useTranslations, LanguageCode } from '../utils/i18n'

const ChatPage = () => {
  const { t, setLanguage } = useTranslations()
  const [input, setInput] = useState('')
  const [uiRefresh, setUiRefresh] = useState(0)
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

  // Force UI refresh when language changes
  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang)
    setUiRefresh(prev => prev + 1)
  }

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
      <header className="border-b border-border bg-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => setShowSidebar(true)}
            className="mr-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-primary"
            aria-label="Toggle history sidebar"
          >
            ☰
          </button>
          <div className="flex items-center mr-3">
            <span className="text-sm mr-1">🇸🇪</span>
            <span className="text-sm">🇪🇺</span>
          </div>
          <span className="text-2xl mr-2">👑</span>
          <h1 className="text-xl font-semibold">Regent</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2">
            <LanguageSelector 
              onLanguageChange={handleLanguageChange}
              minimal={true}
            />
          </div>
          <button 
            onClick={handleNewChat}
            className="btn bg-surface-light hover:bg-surface-light/80"
          >
            {t.newChatButton}
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="btn bg-surface-light hover:bg-surface-light/80"
          >
            {t.settingsButton}
          </button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 container-sm">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">👑</div>
              <h2 className="text-xl font-medium mb-2">{t.welcomeTitle}</h2>
              <p className="text-gray-600">{t.welcomeSubtitle}</p>
              <p className="text-sm text-gray-500 mt-2">{t.emptyStateMessage}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
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
                {t.thinkingMessage}
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
      <div className="py-6 px-4 container-sm bg-surface-light">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-end gap-2 w-full">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.messagePlaceholder}
              className="input flex-1 resize-none h-[60px] max-h-[200px] min-h-[60px] bg-white/50 focus:bg-white transition-colors duration-200 w-full"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn btn-primary h-[60px] px-6 shadow-sm flex-shrink-0"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                t.sendButton
              )}
            </button>
          </form>
        </div>
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