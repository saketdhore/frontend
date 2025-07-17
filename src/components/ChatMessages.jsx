import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';

const ChatMessages = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4">
      {messages.map((msg, idx) => (
        <ChatBubble 
          key={idx} 
          message={msg.text} 
          isUser={msg.sender === 'user'} 
          score={msg.score}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages; 