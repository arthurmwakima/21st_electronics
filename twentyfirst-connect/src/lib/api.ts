// API Configuration
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const API_BASE_URL = (apiBaseUrl && typeof apiBaseUrl === 'string') 
  ? apiBaseUrl 
  : 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/contact/submit`,
  QUOTE: `${API_BASE_URL}/quote/submit`,
};

export const submitContactForm = async (data) => {
  try {
    const response = await fetch(API_ENDPOINTS.CONTACT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};

export const submitQuoteForm = async (data) => {
  try {
    const response = await fetch(API_ENDPOINTS.QUOTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit quote request');
    }

    return await response.json();
  } catch (error) {
    console.error('Quote form submission error:', error);
    throw error;
  }
};
