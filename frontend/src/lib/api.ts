// API configuration and utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Products
  getProducts: () => fetch(`${API_BASE_URL}/products`),
  getProduct: (id: string) => fetch(`${API_BASE_URL}/products/${id}`),
  
  // Orders
  createOrder: (orderData: any) => {
    console.log('Creating order with data:', orderData);
    console.log('API URL:', `${API_BASE_URL}/orders`);
    return fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
  },
  
  // Payments
  uploadScreenshot: (file: File) => {
    const formData = new FormData();
    formData.append('screenshot', file);
    return fetch(`${API_BASE_URL}/payments/upload-screenshot`, {
      method: 'POST',
      body: formData,
    });
  },
  
  submitPaymentProof: (data: any) =>
    fetch(`${API_BASE_URL}/payments/submit-proof`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
};

export default api;