/**
 * API utility functions to handle communication with the Tic Tac Toe backend.
 * Provides user authentication and (stub) game endpoints.
 * Backend API root is assumed to be available at http://localhost:8000/.
 */

// Set BACKEND_ROOT via env in production
const BACKEND_ROOT = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

function handleHttpError(res) {
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }
  return res;
}

// PUBLIC_INTERFACE
/**
 * Login via backend API and return access token.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>} The JWT token string.
 */
export async function login(username, password) {
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);

  const response = await fetch(`${BACKEND_ROOT}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });
  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.detail || 'Invalid login');
  }
  const data = await response.json();
  if (data && data.access_token) {
    return data.access_token;
  }
  throw new Error('Unexpected API response');
}

// PUBLIC_INTERFACE
/**
 * Get authenticated user's profile/info from backend.
 * @param {string} token
 * @returns {Promise<object>}
 */
export async function fetchProfile(token) {
  const response = await fetch(`${BACKEND_ROOT}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleHttpError(response);
  return response.json();
}

/**
 * Game-related API stubs (to be implemented as UI expands):
 * - createGame(token, opponent)
 * - getMyGames(token)
 * - getGame(gameId, token)
 * - submitMove(gameId, moveData, token)
 * - getGameHistory(gameId, token)
 */
