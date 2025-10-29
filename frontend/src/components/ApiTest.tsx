import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

export function ApiTest() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testHealthEndpoint = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      setResult(`Health check successful: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Health check failed: ${error}`);
    }
    setLoading(false);
  };

  const testOrderCreation = async () => {
    setLoading(true);
    try {
      const testOrder = {
        customer: {
          email: "test@example.com",
          firstName: "Test",
          lastName: "User",
          phone: "1234567890"
        },
        shippingAddress: {
          address: "123 Test St",
          city: "Test City"
        },
        items: [{
          id: "1",
          name: "Test Product",
          price: 10,
          image: "test.jpg",
          quantity: 1,
          category: "tshirt"
        }],
        totalAmount: 10,
        paymentMethod: "cod"
      };

      const response = await api.createOrder(testOrder);
      const data = await response.json();
      
      if (response.ok) {
        setResult(`Order creation successful: ${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`Order creation failed: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      setResult(`Order creation failed: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      <div className="space-y-4">
        <Button 
          onClick={testHealthEndpoint} 
          disabled={loading}
          className="mr-4"
        >
          Test Health Endpoint
        </Button>
        
        <Button 
          onClick={testOrderCreation} 
          disabled={loading}
        >
          Test Order Creation
        </Button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Result:</h3>
          <pre className="text-sm overflow-auto">{result}</pre>
        </div>
      )}
    </div>
  );
}