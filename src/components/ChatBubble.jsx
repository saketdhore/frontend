import React from 'react';

const ChatBubble = ({ message, isUser }) => {
  if (!message) return null;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={
          `chat-bubble max-w-lg px-5 py-3 rounded-2xl shadow font-tilt-neon-title text-base break-words ` +
          (isUser
            ? 'bg-white text-gray-900 rounded-br-none font-luckiest-guy-regular border border-gray-300'
            : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-300 font-cherry-cream-soda-regular')
        }
        style={{ whiteSpace: 'pre-line', transition: 'background 0.2s' }}
      >
        {isUser || typeof message === 'string'
          ? message
          : (React.isValidElement(message) ? message : null)}
      </div>
    </div>
  );
};

export default ChatBubble; 