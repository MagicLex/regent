import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomePage = () => {
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const navigate = useNavigate()

  const handleStart = () => {
    // If API key is provided, save it
    if (apiKey) {
      localStorage.setItem('regent_api_key', apiKey)
    }
    // Always navigate to chat, even without an API key
    navigate('/chat')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-light">
      <div className="card w-full max-w-md text-center p-8 shadow-sm">
        <div className="text-6xl mb-6">👑</div>
        <h1 className="text-3xl font-bold mb-2">Regent</h1>
        <p className="text-lg text-primary mb-4">Sovereign AI Chat</p>
        
        {showApiKeyInput ? (
          <div className="mb-6">
            <p className="mb-4 text-sm text-gray-600">
              Connect to your AI model with your API key. Your key never leaves your device, ensuring complete privacy.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="input w-full mb-4"
            />
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Your data. Your models. Your control.</p>
            <p className="text-sm text-gray-500">A privacy-focused interface for self-hosted AI models</p>
          </div>
        )}
        
        <button 
          onClick={handleStart}
          className="btn btn-primary w-full"
          disabled={showApiKeyInput && !apiKey}
        >
          {showApiKeyInput ? "Continue" : "Start Regent"}
        </button>
        
        {showApiKeyInput && (
          <button 
            onClick={() => setShowApiKeyInput(false)}
            className="mt-2 text-sm text-gray-500 hover:underline"
          >
            Back
          </button>
        )}
      </div>
    </div>
  )
}

export default WelcomePage