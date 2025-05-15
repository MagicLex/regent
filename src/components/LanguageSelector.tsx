import { useState, useEffect } from 'react'
import { LanguageCode, LANGUAGES, getCurrentLanguage, setLanguage } from '../utils/i18n'

interface LanguageSelectorProps {
  onLanguageChange?: (lang: LanguageCode) => void
  minimal?: boolean
}

const LanguageSelector = ({ onLanguageChange, minimal = false }: LanguageSelectorProps) => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(getCurrentLanguage())
  
  // Language names and flags
  const languages = [
    { code: LANGUAGES.EN, name: 'English', flag: '🇬🇧' },
    { code: LANGUAGES.SV, name: 'Svenska', flag: '🇸🇪' },
    { code: LANGUAGES.FR, name: 'Français', flag: '🇫🇷' }
  ]

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang)
    setCurrentLang(lang)
    if (onLanguageChange) {
      onLanguageChange(lang)
    }
  }

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  if (minimal) {
    return (
      <div className="flex items-center">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as LanguageCode)}
            className={`mr-2 text-lg ${currentLang === lang.code ? 'opacity-100' : 'opacity-40'} hover:opacity-100`}
            aria-label={`Switch to ${lang.name}`}
            title={lang.name}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code as LanguageCode)}
          className={`flex items-center mr-3 mb-2 px-3 py-2 ${
            currentLang === lang.code 
              ? 'bg-primary/10 border-primary/30 font-medium' 
              : 'bg-white/50 hover:bg-white/80'
          } border border-border rounded`}
        >
          <span className="mr-2">{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector