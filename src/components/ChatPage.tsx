import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../hooks/useChat'
import SettingsDialog from './SettingsDialog'
import ChatHistory from './ChatHistory'
import Overlay from './Overlay'
import LanguageSelector from './LanguageSelector'
import { useTranslations, LanguageCode } from '../utils/i18n'
import { getCurrentBankIDUser, logoutBankID } from '../utils/api'

const ChatPage = () => {
  const { t, setLanguage, currentLanguage } = useTranslations()
  const [input, setInput] = useState('')
  const [uiRefresh, setUiRefresh] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
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
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Ensure language is properly set
  useEffect(() => {
    document.documentElement.lang = currentLanguage
  }, [currentLanguage])

  const [showSettings, setShowSettings] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [bankIDUser, setBankIDUser] = useState(getCurrentBankIDUser())

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
  
  const handleLogout = () => {
    logoutBankID()
    setBankIDUser(null)
    navigate('/')
  }

  return (
    <div className="flex flex-col h-screen bg-surface-light">
      {/* Header */}
      <header className="border-b border-border bg-white p-2 md:p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => setShowSidebar(true)}
            className="mr-2 md:mr-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-primary"
            aria-label="Toggle history sidebar"
          >
            ☰
          </button>
          <span className="text-2xl mr-2">👑</span>
          <h1 className="text-xl font-semibold hidden sm:inline">Regent</h1>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          {bankIDUser && (
            <div className="flex items-center mr-2 text-sm">
              <span className="hidden md:inline mr-1 text-gray-600">Logged in as:</span>
              <span className="font-medium text-primary">{bankIDUser.givenName}</span>
              <button 
                onClick={handleLogout}
                className="ml-2 text-sm text-gray-500 hover:text-red-600 underline"
                title="Log out"
              >
                {isMobile ? '🚪' : 'Log out'}
              </button>
            </div>
          )}
          <div className="mr-1 md:mr-2">
            <LanguageSelector 
              onLanguageChange={handleLanguageChange}
              minimal={true}
            />
          </div>
          <button 
            onClick={handleNewChat}
            className="btn bg-surface-light hover:bg-surface-light/80 text-sm md:text-base px-2 md:px-4"
          >
            {isMobile ? '+' : t.newChatButton}
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="btn bg-surface-light hover:bg-surface-light/80 text-sm md:text-base px-2 md:px-4"
          >
            {isMobile ? '⚙️' : t.settingsButton}
          </button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 w-full">
        <div className="max-w-4xl mx-auto">
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
            <div className="space-y-4 w-full">
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
      </div>

      {/* Input area */}
      <div className="py-4 md:py-6 px-2 md:px-4 bg-surface-light w-full">
        <div className="w-full max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-end gap-2 w-full">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.messagePlaceholder}
              className="input flex-1 resize-none h-[80px] max-h-[300px] min-h-[80px] bg-white/50 focus:bg-white transition-colors duration-200 w-full"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn btn-primary h-[80px] px-4 md:px-6 shadow-sm flex-shrink-0"
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