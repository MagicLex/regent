import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BankIDLogin from './BankIDLogin'
import LanguageSelector from './LanguageSelector'
import { useTranslations, LanguageCode } from '../utils/i18n'

const WelcomePage = () => {
  const { t, setLanguage } = useTranslations()
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [showBankID, setShowBankID] = useState(false)
  const [uiRefresh, setUiRefresh] = useState(0)
  const navigate = useNavigate()

  // Force UI refresh when language changes
  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang)
    setUiRefresh(prev => prev + 1)
  }

  const handleStart = () => {
    // If API key is provided, save it
    if (apiKey) {
      localStorage.setItem('regent_api_key', apiKey)
    }
    // Always navigate to chat, even without an API key
    navigate('/chat')
  }

  const handleBankIDSuccess = () => {
    // For demo purposes, just close the modal and navigate
    setShowBankID(false)
    navigate('/chat')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-light">
      <div className="absolute top-4 right-4">
        <LanguageSelector 
          onLanguageChange={handleLanguageChange}
          minimal={true}
        />
      </div>

      <div className="card w-full max-w-md text-center p-8 shadow-sm">
        <div className="flex justify-center items-center mb-4">
          <img 
            src="/assets/eu-flag.svg" 
            alt="EU" 
            className="h-6 mr-2"
          />
          <img 
            src="/assets/sweden-flag.svg" 
            alt="Sweden" 
            className="h-6"
          />
        </div>

        <div className="text-6xl mb-4">👑</div>
        <h1 className="text-3xl font-bold mb-2">{t.welcomeTitle}</h1>
        <p className="text-lg text-primary mb-4">{t.welcomeSubtitle}</p>
        
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
            <p className="text-gray-600 mb-2">{t.slogan}</p>
            <p className="text-sm text-gray-500">{t.description}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <button 
            onClick={handleStart}
            className="btn btn-primary w-full"
            disabled={showApiKeyInput && !apiKey}
          >
            {showApiKeyInput ? t.continueButton : t.startButton}
          </button>
          
          <button
            onClick={() => setShowBankID(true)}
            className="btn w-full flex items-center justify-center bg-white"
          >
            <img 
              src="/assets/bankid-logo.svg" 
              alt="BankID"
              className="h-4 mr-2"
            />
            {t.loginWithBankID}
          </button>
        </div>
        
        {showApiKeyInput && (
          <button 
            onClick={() => setShowApiKeyInput(false)}
            className="mt-2 text-sm text-gray-500 hover:underline"
          >
            {t.cancelButton}
          </button>
        )}

        <div className="mt-8">
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </div>
      </div>

      {showBankID && (
        <BankIDLogin 
          onSuccess={handleBankIDSuccess}
          onCancel={() => setShowBankID(false)}
        />
      )}
    </div>
  )
}

export default WelcomePage