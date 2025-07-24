import React from 'react';

// PUBLIC_INTERFACE
/**
 * Placeholder component for the Tic Tac Toe Game Board.
 * Will be implemented in full later.
 */
function GameBoard() {
  return (
    <div style={{
      padding: 16,
      borderRadius: 10,
      background: 'var(--bg-secondary)',
      boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
      margin: '0 auto',
      minHeight: 220,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h3 style={{ marginBottom: 8, color: 'var(--text-primary)' }}>Game Board</h3>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
        (Game board UI will appear here)
      </div>
      <div style={{ marginTop: 16, fontSize: 14, color: 'var(--text-secondary)' }}>
        Board controls, moves and opponent info coming soon.
      </div>
    </div>
  );
}

export default GameBoard;
