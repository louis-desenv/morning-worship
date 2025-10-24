
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatPanelProps {
  history: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const ChatMessageItem: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-sm break-words ${
          isUser
            ? 'bg-brand-DEFAULT text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {message.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            return <p key={index}>{paragraph}</p>;
        })}
      </div>
    </div>
  );
};

const ChatPanel: React.FC<ChatPanelProps> = ({ history, isLoading, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl flex flex-col h-full max-h-[85vh]">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Discuss the Article</h3>
        <p className="text-sm text-gray-500">Ask questions and reflect with your AI assistant.</p>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {history.length === 0 && !isLoading && (
             <div className="text-center text-gray-500 h-full flex items-center justify-center">
                <p>Start the conversation by asking a question about the article.</p>
             </div>
        )}
        {history.map((msg, index) => (
          <ChatMessageItem key={index} message={msg} />
        ))}
        {isLoading && history.some(m => m.role === 'user') && (
            <div className="flex justify-start mb-4">
                <div className="rounded-lg px-4 py-2 max-w-sm bg-gray-200 text-gray-800">
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-start">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-brand-DEFAULT"
            rows={2}
            disabled={isLoading}
            aria-label="Chat message input"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="ml-3 px-4 py-2 bg-brand-DEFAULT text-white rounded-md font-semibold hover:bg-brand-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors self-stretch flex items-center"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
