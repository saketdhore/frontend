import React, { useState } from 'react';

const ChatInput = ({ onSend, loading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white">
      <textarea
        className="flex-1 resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-tilt-neon-title focus:outline-none focus:ring-2 focus:ring-gray-300"
        rows={1}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={loading}
        style={{ transition: 'background 0.2s' }}
      />
      <button
        className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-bold disabled:opacity-50 transition-colors"
        onClick={handleSend}
        disabled={loading || !input.trim()}
        type="button"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput; 