import { useState } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Simulated default user
  const defaultUser = {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'Administrator',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate vulnerable SQL query
    const mockQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    // In a real vulnerable system, this query would execute directly:
    if (
      username.trim().toLowerCase() === 'admin' &&
      password.trim() === 'admin123'
    ) {
      // Successful login with correct credentials
      setUser(defaultUser);
      setLoggedIn(true);
      setError('');
    } else if (
      username.includes("'") || 
      password.includes("'")
    ) {
      // Simulate SQL injection attempt
      setUser(defaultUser);
      setLoggedIn(true);
      setError(`SQL Injection Detected! Logged in as ${defaultUser.username}`);
    } else {
      // Failed login
      setUser(null);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {!loggedIn ? (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                SQL Injection Lab
              </h1>
              <p className="mt-2 text-gray-400">Practice SQL injection techniques safely</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

              {error && !loggedIn && (
                <div className="bg-red-900/30 border border-red-700 text-red-300 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </form>
            </div>

            <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="font-semibold mb-3">Instructions</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
                <li>Try logging in with valid credentials: admin / admin123</li>
                <li>Attempt SQL injection by entering <code className="bg-gray-900 px-1 rounded">' OR '1'='1</code> in both fields</li>
                <li>This lab simulates a vulnerable authentication system for educational purposes only</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                SQL Injection Lab
              </h1>
              <button
                onClick={() => {
                  setLoggedIn(false);
                  setUsername('');
                  setPassword('');
                  setUser(null);
                  setError('');
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">User Profile</h2>

                {error && (
                  <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 p-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Username:</span>
                    <p className="font-medium">{user.username}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Email:</span>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Role:</span>
                    <p className="font-medium">{user.role}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="font-semibold mb-3">What to Try Next</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
                  <li>See if you can extract more information from the database using advanced injection techniques</li>
                  <li>Try injecting commands that modify the query logic</li>
                  <li>Attempt to escalate privileges or access unauthorized data</li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}