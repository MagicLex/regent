import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomePage = () => {
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const navigate = useNavigate()

  const handleStart = () => {
    if (apiKey) {
      localStorage.setItem('regent_api_key', apiKey)
      navigate('/chat')
    } else if (localStorage.getItem('regent_api_key')) {
      navigate('/chat')
    } else {
      setShowApiKeyInput(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-light">
      <div className="card w-full max-w-md text-center p-8 shadow-sm">
        <div className="text-6xl mb-6">👑</div>
        <h1 className="text-3xl font-bold mb-6">Regent</h1>
        
        {showApiKeyInput ? (
          <div className="mb-6">
            <p className="mb-4 text-sm text-gray-600">
              Please enter your OpenAI API key to get started. Your key will be stored locally on your device only.
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
          <p className="mb-6 text-gray-600">Your simple AI chat interface</p>
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