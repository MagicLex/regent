import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BankIDLogin from './BankIDLogin'
import LanguageSelector from './LanguageSelector'
import { useTranslations, LanguageCode } from '../utils/i18n'
import { isBankIDLoggedIn } from '../utils/api'

const WelcomePage = () => {
  const { t, setLanguage, currentLanguage } = useTranslations()
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [showBankID, setShowBankID] = useState(false)
  const [uiRefresh, setUiRefresh] = useState(0)
  const navigate = useNavigate()
  
  // Ensure language is initialized properly
  useEffect(() => {
    document.documentElement.lang = currentLanguage
  }, [currentLanguage])
  
  // Check if user is already logged in with BankID
  useEffect(() => {
    if (isBankIDLoggedIn()) {
      // Automatically navigate to chat if already logged in
      navigate('/chat')
    }
  }, [])

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
    <div className="min-h-screen flex flex-col bg-surface-light">
      <div className="absolute top-4 right-4">
        <LanguageSelector 
          onLanguageChange={handleLanguageChange}
          minimal={true}
        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="card w-full max-w-md p-10 shadow-md bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-6xl mb-6">👑</div>
            <h1 className="text-4xl font-bold mb-3">{t.welcomeTitle}</h1>
            <p className="text-xl text-primary mb-6">{t.welcomeSubtitle}</p>
            
            {showApiKeyInput ? (
              <div className="mb-8">
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
              <div className="mb-8">
                <p className="text-lg text-gray-700 mb-2">{t.slogan}</p>
                <p className="text-sm text-gray-500">{t.description}</p>
              </div>
            )}
            
            <div className="space-y-3">
              <button 
                onClick={handleStart}
                className="btn btn-primary w-full py-3 text-lg"
                disabled={showApiKeyInput && !apiKey}
              >
                {showApiKeyInput ? t.continueButton : t.startButton}
              </button>
              
              <button
                onClick={() => setShowBankID(true)}
                className="btn w-full py-3 flex items-center justify-center bg-white text-lg"
              >
                {t.loginWithBankID}
              </button>
            </div>
            
            {showApiKeyInput && (
              <button 
                onClick={() => setShowApiKeyInput(false)}
                className="mt-4 text-sm text-gray-500 hover:underline"
              >
                {t.cancelButton}
              </button>
            )}

            <div className="mt-8">
              <LanguageSelector onLanguageChange={handleLanguageChange} />
            </div>
          </div>
        </div>
      </div>

      <footer className="p-4 border-t border-border text-center text-sm text-gray-500">
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm mr-1">🇸🇪</span>
          <span className="text-sm mr-2">🇪🇺</span>
          <span>Made with ❤️ in Sweden</span>
        </div>
        <p>Sovereign AI for a sovereign Europe</p>
      </footer>

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