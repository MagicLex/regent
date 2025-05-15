import { useState, useEffect } from 'react'
import { getApiKey, saveApiKey } from '../utils/storage'

interface SettingsDialogProps {
  isOpen: boolean
  onClose: () => void
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const [apiKey, setApiKey] = useState('')
  
  useEffect(() => {
    if (isOpen) {
      const currentKey = getApiKey() || ''
      setApiKey(currentKey)
    }
  }, [isOpen])
  
  const handleSave = () => {
    saveApiKey(apiKey.trim())
    onClose()
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            OpenAI API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="input w-full"
          />
          <p className="mt-1 text-xs text-gray-500">
            Your API key is stored only in your browser's local storage.
          </p>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <button 
            onClick={onClose}
            className="btn"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsDialog