'use client';

import { useState, useEffect } from 'react';
import { apiJson, withAuth } from '@/lib/apiClient';

export default function DevAuthPage() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Check if debug=1 is in URL
    const urlParams = new URLSearchParams(window.location.search);
    const isDebug = urlParams.get('debug') === '1';
    setShowPanel(isDebug);

    // Load token from localStorage
    const savedToken = localStorage.getItem('dev_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleTokenChange = (value: string) => {
    setToken(value);
    // Save to localStorage
    localStorage.setItem('dev_token', value);
  };

  const handleCallApi = async () => {
    if (!token.trim()) {
      setResult('Error: Please enter a token');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await apiJson('/api/me', withAuth({}, token));
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearResult = () => {
    setResult('');
  };

  if (!showPanel) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-400">This page is only available in debug mode.</p>
          <p className="text-sm text-gray-500 mt-2">
            Add ?debug=1 to the URL to access the DevAuth panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">DevAuth Panel</h1>
        <p className="text-gray-400 mb-8">
          Test Authorization flows with /api/me endpoint
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Token Input</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bearer Token
                </label>
                <textarea
                  value={token}
                  onChange={(e) => handleTokenChange(e.target.value)}
                  placeholder="Paste your token here (from /api/dev/mint-token)"
                  className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCallApi}
                  disabled={loading || !token.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md font-medium"
                >
                  {loading ? 'Calling...' : 'Call /api/me'}
                </button>
                
                <button
                  onClick={handleClearResult}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-medium"
                >
                  Clear Result
                </button>
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">API Response</h2>
            
            <div className="space-y-4">
              <div className="text-sm text-gray-400 mb-2">
                GET /api/me with Authorization: Bearer {token ? `${token.substring(0, 20)}...` : '[no token]'}
              </div>
              
              <textarea
                value={result}
                readOnly
                placeholder="API response will appear here..."
                className="w-full h-64 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">How to use:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
            <li>Get a token from <code className="bg-gray-700 px-1 rounded">/api/dev/mint-token?user_id=test123</code></li>
            <li>Paste the token in the input field above</li>
            <li>Click "Call /api/me" to test authentication</li>
            <li>Check the response to see if the token is valid</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
