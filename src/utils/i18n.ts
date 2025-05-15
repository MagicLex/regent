// Language options
export const LANGUAGES = {
  EN: 'en',
  SV: 'sv',
  FR: 'fr'
}

export type LanguageCode = 'en' | 'sv' | 'fr';

// Default language
export const DEFAULT_LANGUAGE = LANGUAGES.EN;

// Storage key for language preference
export const LANGUAGE_STORAGE_KEY = 'regent_language';

// Translations
export const translations = {
  [LANGUAGES.EN]: {
    welcomeTitle: 'Welcome to Regent',
    welcomeSubtitle: 'Sovereign AI Chat',
    slogan: 'Your data. Your models. Your control.',
    description: 'A privacy-focused interface for self-hosted AI models',
    startButton: 'Start Regent',
    continueButton: 'Continue',
    settingsTitle: 'Settings',
    apiKeyLabel: 'AI Model API Key',
    apiKeyPlaceholder: 'sk-...',
    apiKeyStorageInfo: 'Your API key is stored only in your browser\'s local storage and never sent to our servers.',
    apiKeyAdditionalInfo: 'Connect to your preferred AI model by providing the appropriate API key.',
    saveButton: 'Save',
    cancelButton: 'Cancel',
    newChatButton: 'New Chat',
    settingsButton: 'Settings',
    sendButton: 'Send',
    messagePlaceholder: 'Type a message...',
    loginWithBankID: 'Login with BankID',
    loginMessage: 'Secure login with Swedish BankID',
    thinkingMessage: 'Thinking...',
    chatHistoryTitle: 'Chat History',
    noChatHistory: 'No chat history yet',
    emptyStateMessage: 'Control your data. Own your conversations.',
  },
  [LANGUAGES.SV]: {
    welcomeTitle: 'Välkommen till Regent',
    welcomeSubtitle: 'Suverän AI-chatt',
    slogan: 'Din data. Dina modeller. Din kontroll.',
    description: 'Ett integritetsfokuserat gränssnitt för egenhandhållna AI-modeller',
    startButton: 'Starta Regent',
    continueButton: 'Fortsätt',
    settingsTitle: 'Inställningar',
    apiKeyLabel: 'API-nyckel för AI-modell',
    apiKeyPlaceholder: 'sk-...',
    apiKeyStorageInfo: 'Din API-nyckel lagras endast i din webbläsares lokala lagring och skickas aldrig till våra servrar.',
    apiKeyAdditionalInfo: 'Anslut till din föredragna AI-modell genom att ange lämplig API-nyckel.',
    saveButton: 'Spara',
    cancelButton: 'Avbryt',
    newChatButton: 'Ny chatt',
    settingsButton: 'Inställningar',
    sendButton: 'Skicka',
    messagePlaceholder: 'Skriv ett meddelande...',
    loginWithBankID: 'Logga in med BankID',
    loginMessage: 'Säker inloggning med svenskt BankID',
    thinkingMessage: 'Tänker...',
    chatHistoryTitle: 'Chatthistorik',
    noChatHistory: 'Ingen chatthistorik än',
    emptyStateMessage: 'Kontrollera din data. Äg dina konversationer.',
  },
  [LANGUAGES.FR]: {
    welcomeTitle: 'Bienvenue sur Regent',
    welcomeSubtitle: 'Chat IA Souverain',
    slogan: 'Vos données. Vos modèles. Votre contrôle.',
    description: 'Une interface centrée sur la confidentialité pour les modèles IA auto-hébergés',
    startButton: 'Démarrer Regent',
    continueButton: 'Continuer',
    settingsTitle: 'Paramètres',
    apiKeyLabel: 'Clé API du modèle IA',
    apiKeyPlaceholder: 'sk-...',
    apiKeyStorageInfo: 'Votre clé API est stockée uniquement dans le stockage local de votre navigateur et n\'est jamais envoyée à nos serveurs.',
    apiKeyAdditionalInfo: 'Connectez-vous à votre modèle IA préféré en fournissant la clé API appropriée.',
    saveButton: 'Enregistrer',
    cancelButton: 'Annuler',
    newChatButton: 'Nouvelle discussion',
    settingsButton: 'Paramètres',
    sendButton: 'Envoyer',
    messagePlaceholder: 'Tapez un message...',
    loginWithBankID: 'Connexion avec BankID',
    loginMessage: 'Connexion sécurisée avec BankID suédois',
    thinkingMessage: 'Réflexion en cours...',
    chatHistoryTitle: 'Historique des discussions',
    noChatHistory: 'Pas encore d\'historique de discussion',
    emptyStateMessage: 'Contrôlez vos données. Possédez vos conversations.',
  }
}

// Get currently selected language
export const getCurrentLanguage = (): LanguageCode => {
  const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
  return savedLang || DEFAULT_LANGUAGE;
}

// Set language
export const setLanguage = (lang: LanguageCode): void => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

// Get translations for current language
export const getTranslations = () => {
  const currentLang = getCurrentLanguage();
  return translations[currentLang];
}

// Hook to get translations
export const useTranslations = () => {
  return {
    t: getTranslations(),
    currentLanguage: getCurrentLanguage(),
    setLanguage,
    LANGUAGES
  }
}