import { Button } from "@/components/ui/button";
import { useState } from "react";
import Logo from "./assets/logo1.png"
interface UserPreferences {
  dataDeletion: 'partial' | 'full' | 'auto';
}

interface AuthenticationMethods {
  usernamePassword: boolean;
  usernameAuth: boolean;
  usernamePasswordAuth: boolean;
  oauth: boolean;
  other: boolean;
}

export default function App() {
  const [username, setUsername] = useState('');
  const [accountPreferences, setAccountPreferences] = useState<UserPreferences>({ dataDeletion: 'full' });
  const [authMethods, setAuthMethods] = useState<AuthenticationMethods>({
    usernamePassword: false,
    usernameAuth: false,
    usernamePasswordAuth: false,
    oauth: false,
    other: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          accountPreferences,
          authenticationMethods: authMethods
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      const data = await response.json();
      console.log('Settings saved:', data);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleAuthMethodChange = (method: keyof AuthenticationMethods) => {
    setAuthMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <img className="w-30 h-30 bg-blue-600 rounded-full flex items-center justify-center mb-4 border-2 border-black" src={Logo} alt="CareTaker Logo" />
          <h1 className="text-3xl font-bold text-gray-800">TakeCare</h1>
          <p className="text-gray-500 mt-2">Your Personal Health Companion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Management Preferences
            </label>
            <select
              value={accountPreferences.dataDeletion}
              onChange={(e) => setAccountPreferences({ dataDeletion: e.target.value as 'partial' | 'full' | 'auto' })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="partial">Allow partial data deletion</option>
              <option value="full">Require full account deletion</option>
              <option value="auto">Auto-delete data after 90 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Authentication Methods
            </label>
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              <label className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={authMethods.usernamePassword}
                  onChange={() => handleAuthMethodChange('usernamePassword')}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Username and password</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={authMethods.usernameAuth}
                  onChange={() => handleAuthMethodChange('usernameAuth')}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Username and other authentication</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={authMethods.usernamePasswordAuth}
                  onChange={() => handleAuthMethodChange('usernamePasswordAuth')}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Username, password and other authentication</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={authMethods.oauth}
                  onChange={() => handleAuthMethodChange('oauth')}
                  className="w-4 h-4 text-blue-600"
                />
                <span>OAuth</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={authMethods.other}
                  onChange={() => handleAuthMethodChange('other')}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Other</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
            >
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
