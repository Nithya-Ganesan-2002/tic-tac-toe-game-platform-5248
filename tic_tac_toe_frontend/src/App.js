import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './GameBoard';
import { login as apiLogin, fetchProfile } from './api';

// PUBLIC_INTERFACE
/**
 * Main App component for the Tic Tac Toe Frontend.
 * Handles theme, authentication, and layout for the application.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [token, setToken] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Effect: Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Effect: On login, get user profile
  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      try {
        const profile = await fetchProfile(token);
        setUser(profile);
      } catch (e) {
        setUser(null);
      }
      setLoading(false);
    }
    if (token) getProfile();
  }, [token]);

  // PUBLIC_INTERFACE
  /**
   * Switch between dark/light theme.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  /**
   * Handle change in login form fields.
   * @param {object} evt
   */
  const handleLoginChange = (evt) => {
    setLoginForm(f => ({ ...f, [evt.target.name]: evt.target.value }));
  };

  // PUBLIC_INTERFACE
  /**
   * Submit the login form and call the backend login endpoint.
   * @param {object} evt
   */
  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const tok = await apiLogin(loginForm.username, loginForm.password);
      setToken(tok);
      setLoginForm({ username: '', password: '' });
    } catch (e) {
      setLoginError(e.message || 'Login failed');
    }
    setLoading(false);
  };

  // PUBLIC_INTERFACE
  /**
   * Logout: Clear user and token state.
   */
  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: 0 }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: 2, flex: 1 }}>
            <span role="img" aria-label="Tic Tac Toe" style={{ marginRight: 8 }}>🎮</span>Tic Tac Toe
          </div>
          <div style={{ marginRight: 16 }}>
            {user
              ? (
                <span style={{ fontWeight: 500, color: 'var(--text-secondary)', marginRight: 8 }}>
                  Hello, {user.username}
                </span>
              )
              : null
            }
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          {user &&
            <button style={{
              marginLeft: 16,
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--button-bg)',
              color: 'var(--button-text)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
              onClick={handleLogout}
            >
              Logout
            </button>
          }
        </div>
      </header>

      <main style={{ padding: 24, maxWidth: 420, margin: '0 auto' }}>
        {!user && (
          <section>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: 6 }}>Sign In</h2>
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--bg-secondary)', padding: '18px 14px', borderRadius: 10, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
              <input
                name="username"
                autoComplete="username"
                disabled={loading}
                style={{
                  padding: '10px',
                  fontSize: 16,
                  borderRadius: 6,
                  border: '1px solid var(--border-color)'
                }}
                placeholder="Username"
                value={loginForm.username}
                onChange={handleLoginChange}
                required
              />
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                disabled={loading}
                style={{
                  padding: '10px',
                  fontSize: 16,
                  borderRadius: 6,
                  border: '1px solid var(--border-color)'
                }}
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
              {loginError && (
                <span style={{ color: '#e74c3c', fontSize: 14, marginBottom: 2 }}>{loginError}</span>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'var(--button-bg)',
                  color: 'var(--button-text)',
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 6,
                  border: 'none',
                  padding: '10px'
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <div style={{ marginTop: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
              No account? Registration coming soon!
            </div>
          </section>
        )}
        {user && (
          <section style={{ marginTop: 24 }}>
            {/* Placeholder for the main Game UI */}
            <GameBoard />
            {/* Placeholders for game history/scoreboard will be added in future steps */}
          </section>
        )}
      </main>
      <footer style={{
        marginTop: 48,
        fontSize: 15,
        color: 'var(--text-secondary)',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '24px 0',
        letterSpacing: 1
      }}>
        &copy; {new Date().getFullYear()} KAVIA Tic Tac Toe — <a href="https://github.com/" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>GitHub</a>
      </footer>
    </div>
  );
}

export default App;
