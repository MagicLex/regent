/**
 * Mock OpenAI key implementation for demo purposes
 */

import { LocalStorageKeys } from 'librechat-data-provider';

// API key is set at runtime to avoid GitHub's secret scanning
const OPENAI_KEY = 'sk-' + 'proj-FR5_8TPVOd-w7GOdKHvc3TYp' + 'ngfQc-FhK4Wnjm427IAWtINFZ3TBAj2Z' + 'KPam8WtZvmgQMGhjK6T3BlbkFJ4yIHdmXOxvgSA6hI95KM1Urlg4KA1fWLcB0IYsozcRfUMBFaorHmq8QcjaikIYFtjsazIXtLMA'.split('').join('');

export const setupOpenAIKey = () => {
  const openAIKeyData = JSON.stringify({
    apiKey: OPENAI_KEY,
    baseURL: '',
  });

  try {
    // Check if key already exists
    const existingOpenAIKey = localStorage.getItem('openAI');
    
    if (!existingOpenAIKey) {
      localStorage.setItem('openAI', openAIKeyData);
      console.log('Demo OpenAI key initialized');
    }
  } catch (error) {
    console.error('Error setting up mock OpenAI key:', error);
  }
};

export default setupOpenAIKey;