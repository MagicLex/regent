import { useState, useEffect } from 'react'
import { getApiKey, saveApiKey } from '../utils/storage'

interface SettingsDialogProps {
  isOpen: boolean
  onClose: () => void
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  useEffect(() => {
    if (isOpen) {
      const currentKey = getApiKey() || ''
      setApiKey(currentKey)
      setSaveMessage('')
      setShowApiKey(false)
    }
  }, [isOpen])
  
  const handleSave = () => {
    saveApiKey(apiKey.trim())
    setSaveMessage('API key saved successfully!')
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const toggleShowApiKey = () => {
    setShowApiKey(prev => !prev)
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded w-full max-w-md p-6 m-4" 
        role="dialog"
        aria-labelledby="settings-title"
        aria-modal="true"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="settings-title" className="text-xl font-semibold">Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          <label htmlFor="api-key-input" className="block text-sm font-medium mb-1">
            AI Model API Key
          </label>
          <div className="relative">
            <input
              id="api-key-input"
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="input w-full pr-10"
            />
            <button
              type="button"
              onClick={toggleShowApiKey}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showApiKey ? "Hide API key" : "Show API key"}
            >
              {showApiKey ? "👁️‍🗨️" : "👁️"}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Your API key is stored only in your browser's local storage and never sent to our servers.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Connect to your preferred AI model by providing the appropriate API key.
          </p>
        </div>

        {saveMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-center">
            {saveMessage}
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-6">
          <button 
            onClick={onClose}
            className="btn"
            disabled={!!saveMessage}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="btn btn-primary"
            disabled={!!saveMessage}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsDialog