import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { sendSuggestionPrompt } from '../api/api';

// Helper to format API response as JSX, robust to missing data
function formatApiResponse(data) {
  // Use top-level fields directly
  const score = data?.score ?? 'N/A';
  const reasons = Array.isArray(data?.reasons) && data.reasons.length > 0
    ? data.reasons
    : ['No reasons provided.'];

  return (
    <div>
      <div className="font-bungee-spice-regular text-lg mb-2 text-gray-800">
        Score: <span className="text-gray-900 font-bold">{score}</span>
      </div>
      <div className="font-tilt-neon-title text-base mb-1 text-gray-700">Reasons:</div>
      <ul className="list-disc list-inside space-y-1 text-sm font-sour-gummy-title text-gray-800">
        {reasons.map((reason, idx) => (
          <li key={idx}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}

// Helper to format suggestion as JSX
function formatSuggestion(data) {
  const suggestion = data?.suggestions ?? 'No suggestion provided.';
  return (
    <div>
      <div className="font-bungee-spice-regular text-lg mb-2 text-gray-800">
        <span className="text-green-600 font-bold">Suggestion:</span>
      </div>
      <div className="font-tilt-neon-title text-base text-gray-900 bg-green-50 p-3 rounded-lg border border-green-200">
        {suggestion}
      </div>
    </div>
  );
}

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    setMessages((msgs) => [...msgs, { sender: 'user', text: userMessage }]);
    setLoading(true);
    
    try {
      const data = await sendSuggestionPrompt(userMessage);
      console.log(data);
      if (data) {
        // Update the last user message to include the score
        setMessages((msgs) => {
          const updatedMessages = [...msgs];
          // Find and update the last user message with the score
          for (let i = updatedMessages.length - 1; i >= 0; i--) {
            if (updatedMessages[i].sender === 'user') {
              updatedMessages[i] = { ...updatedMessages[i], score: data.score };
              break;
            }
          }
          // Add the API response messages
          return [
            ...updatedMessages,
            { sender: 'api', text: formatApiResponse(data), isHtml: true },
            { sender: 'api', text: formatSuggestion(data), isHtml: true },
          ];
        });
      } else {
        setMessages((msgs) => [...msgs, { sender: 'api', text: 'Error: Could not reach server.' }]);
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'api', text: 'Error: Could not reach server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-900 py-4 px-6 text-white font-tilt-neon-title text-2xl tracking-wide border-b border-gray-200 select-none">
        <span className="font-bungee-spice-regular text-white">PromptBot</span>
      </div>
      
      <div className="flex-1 bg-gray-50 overflow-y-auto" style={{ minHeight: 0 }}>
        <ChatMessages messages={messages} />
      </div>
      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  );
};

export default ChatContainer; 