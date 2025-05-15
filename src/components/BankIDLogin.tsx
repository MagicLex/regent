import { useState } from 'react'
import { useTranslations } from '../utils/i18n'

interface BankIDLoginProps {
  onSuccess: () => void
  onCancel: () => void
}

const BankIDLogin = ({ onSuccess, onCancel }: BankIDLoginProps) => {
  const { t } = useTranslations()
  const [isLoading, setIsLoading] = useState(false)
  const [personalNumber, setPersonalNumber] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!personalNumber.trim()) {
      setError('Please enter your personal number')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate BankID authentication
    setTimeout(() => {
      setIsLoading(false)
      onSuccess()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <span className="text-blue-700 font-bold mr-2">BankID</span>
            {t.loginWithBankID}
          </h2>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-700">
            {t.loginMessage}
          </p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Personal Number
            </label>
            <input
              type="text"
              value={personalNumber}
              onChange={(e) => setPersonalNumber(e.target.value)}
              placeholder="YYYYMMDD-XXXX"
              className="input w-full"
              disabled={isLoading}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <button 
              type="button"
              onClick={onCancel}
              className="btn"
              disabled={isLoading}
            >
              {t.cancelButton}
            </button>
            <button 
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                t.loginWithBankID
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BankIDLogin