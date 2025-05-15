import { useState, useEffect } from 'react'
import { getChatSessions, deleteChatSession, ChatSession } from '../utils/storage'
import { useTranslations } from '../utils/i18n'

interface ChatHistoryProps {
  isOpen: boolean
  onClose: () => void
  onSelectChat: (sessionId: string) => void
  currentSessionId?: string
}

const ChatHistory = ({ isOpen, onClose, onSelectChat, currentSessionId }: ChatHistoryProps) => {
  const { t } = useTranslations()
  const [sessions, setSessions] = useState<ChatSession[]>([])

  useEffect(() => {
    if (isOpen) {
      // Refresh sessions when sidebar opens
      setSessions(getChatSessions().sort((a, b) => b.updatedAt - a.updatedAt))
    }
  }, [isOpen])

  const handleDeleteChat = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation()
    deleteChatSession(sessionId)
    setSessions(prev => prev.filter(session => session.id !== sessionId))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-border shadow-lg transform transition-transform ease-in-out duration-300">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">{t.chatHistoryTitle}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {sessions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {t.noChatHistory}
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {sessions.map(session => (
              <li 
                key={session.id}
                onClick={() => onSelectChat(session.id)}
                className={`p-3 hover:bg-surface-light cursor-pointer flex justify-between items-center ${
                  session.id === currentSessionId ? 'bg-primary/10' : ''
                }`}
              >
                <div className="truncate flex-1">
                  <span className="block text-sm">{session.title}</span>
                  <span className="block text-xs text-gray-500">
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(e, session.id)}
                  className="text-gray-400 hover:text-red-500 ml-2"
                  aria-label="Delete chat"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ChatHistory