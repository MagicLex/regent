import { useState, useEffect } from 'react'
import { useTranslations } from '../utils/i18n'
import { startBankIDAuth, collectBankIDAuth } from '../utils/api'

interface BankIDLoginProps {
  onSuccess: () => void
  onCancel: () => void
}

enum AuthState {
  IDLE = 'idle',
  INITIATED = 'initiated',
  POLLING = 'polling',
  COMPLETED = 'completed',
  ERROR = 'error'
}

const BankIDLogin = ({ onSuccess, onCancel }: BankIDLoginProps) => {
  const { t } = useTranslations()
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE)
  const [personalNumber, setPersonalNumber] = useState('')
  const [error, setError] = useState('')
  const [orderRef, setOrderRef] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)

  // Clean up polling interval on component unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [pollingInterval])

  // Start the BankID authentication process
  const initiateAuth = async () => {
    if (!personalNumber.trim()) {
      setError('Please enter your personal number')
      return
    }

    try {
      setAuthState(AuthState.INITIATED)
      setError('')

      const response = await startBankIDAuth(personalNumber)
      
      // Store the orderRef for polling
      setOrderRef(response.orderRef)
      
      // In a real implementation, we would generate a QR code using the qrStartToken and qrStartSecret
      // For this simulation, we'll just create a dummy QR value
      setQrCode(`bankid:///?autostarttoken=${response.autoStartToken}`)
      
      // Start polling for status
      setAuthState(AuthState.POLLING)
      startPolling(response.orderRef)
    } catch (err) {
      setAuthState(AuthState.ERROR)
      setError('Failed to start authentication. Please try again.')
      console.error('BankID auth initiation error:', err)
    }
  }

  // Poll for the authentication status
  const startPolling = (ref: string) => {
    // Clear any existing polling
    if (pollingInterval) {
      clearInterval(pollingInterval)
    }
    
    // Poll every 2 seconds
    const interval = setInterval(async () => {
      try {
        const statusResponse = await collectBankIDAuth(ref)
        
        if (statusResponse.status === 'complete') {
          // Authentication completed successfully
          clearInterval(interval)
          setAuthState(AuthState.COMPLETED)
          // Wait a moment before calling onSuccess to show the completed state
          setTimeout(() => {
            onSuccess()
          }, 1000)
        } else if (statusResponse.status === 'failed') {
          // Authentication failed
          clearInterval(interval)
          setAuthState(AuthState.ERROR)
          setError(`Authentication failed: ${statusResponse.hintCode || 'Unknown error'}`)
        }
        // Continue polling if status is still 'pending'
      } catch (err) {
        clearInterval(interval)
        setAuthState(AuthState.ERROR)
        setError('Error checking authentication status. Please try again.')
        console.error('BankID polling error:', err)
      }
    }, 2000)
    
    setPollingInterval(interval)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    initiateAuth()
  }

  const renderContent = () => {
    switch (authState) {
      case AuthState.IDLE:
        // Personal number input form
        return (
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
                disabled={authState !== AuthState.IDLE}
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
                disabled={authState !== AuthState.IDLE}
              >
                {t.cancelButton}
              </button>
              <button 
                type="submit"
                className="btn btn-primary flex items-center"
                disabled={authState !== AuthState.IDLE}
              >
                {t.loginWithBankID}
              </button>
            </div>
          </form>
        )
        
      case AuthState.INITIATED:
      case AuthState.POLLING:
        // Waiting for BankID authentication
        return (
          <div className="text-center py-4">
            <div className="mb-4">
              <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-medium mb-2">
              Waiting for BankID...
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Open your BankID app to authenticate
            </p>

            {/* QR code for "other device" flow */}
            <div className="mx-auto w-48 h-48 bg-gray-100 flex items-center justify-center border rounded">
              <p className="text-xs text-gray-500 p-2">
                [QR code would display here in a real implementation]
              </p>
            </div>
            <p className="text-sm mt-2 text-gray-500">
              Scan with your BankID app
            </p>
            
            <div className="mt-6">
              <button 
                onClick={onCancel}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )
        
      case AuthState.COMPLETED:
        // Authentication successful
        return (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-medium text-green-700 mb-2">
              Authenticated Successfully
            </h3>
            <p className="text-sm text-gray-600">
              You are now logged in with BankID
            </p>
          </div>
        )
        
      case AuthState.ERROR:
        // Authentication error
        return (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">✕</span>
            </div>
            <h3 className="text-lg font-medium text-red-700 mb-2">
              Authentication Failed
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {error || 'An unknown error occurred. Please try again.'}
            </p>
            
            <div className="flex justify-center gap-2">
              <button 
                onClick={onCancel}
                className="btn"
              >
                Cancel
              </button>
              <button 
                onClick={() => setAuthState(AuthState.IDLE)}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <span className="text-blue-700 font-bold mr-2">BankID</span>
            {t.loginWithBankID}
          </h2>
          {authState !== AuthState.POLLING && (
            <button 
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>

        {renderContent()}
      </div>
    </div>
  )
}

export default BankIDLogin