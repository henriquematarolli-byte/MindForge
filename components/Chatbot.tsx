
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, GeolocationPosition } from '../types';
import { runChat } from '../services/geminiService';
import { ChatBubbleIcon, CloseIcon, SendIcon, LocationMarkerIcon } from './icons';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{
        role: 'model',
        text: 'Hello! How can I help you with the competitor monitoring platform today?',
      }]);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position as GeolocationPosition);
        },
        () => {
          console.warn('Geolocation permission denied. Maps grounding will be less accurate.');
        }
      );
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await runChat(input, location);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', text: `Sorry, I ran into an issue: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, location]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) { // Reset on open
        setInput('');
        setError(null);
    }
  }

  return (
    <>
      <button
        onClick={toggleOpen}
        className={`fixed bottom-6 right-6 bg-brand-blue text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-transform transform ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat"
      >
        <ChatBubbleIcon className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[calc(100%-3rem)] sm:w-96 h-[70vh] sm:h-[600px] flex flex-col bg-slate-800 rounded-xl shadow-2xl animate-slide-in border border-slate-700">
          <header className="flex items-center justify-between p-4 bg-slate-900/50 rounded-t-xl border-b border-slate-700">
            <h3 className="text-lg font-bold text-white">Gemini Assistant</h3>
            <button onClick={toggleOpen} className="text-slate-400 hover:text-white">
              <CloseIcon className="w-6 h-6" />
            </button>
          </header>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                   {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                     <div className="mt-2 border-t border-slate-600 pt-2">
                       <h4 className="text-xs font-bold text-slate-400 mb-1">Sources:</h4>
                       <ul className="space-y-1">
                       {msg.groundingChunks.map((chunk, i) => chunk.maps && (
                           <li key={i}>
                             <a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-sky-400 hover:underline">
                               <LocationMarkerIcon className="w-3 h-3 flex-shrink-0" />
                               <span className="truncate">{chunk.maps.title}</span>
                             </a>
                           </li>
                         ))}
                       </ul>
                     </div>
                   )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="max-w-xs rounded-lg px-4 py-2 bg-slate-700 text-slate-200">
                      <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                      </div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 bg-slate-800 rounded-b-xl">
            <div className="flex items-center bg-slate-700 rounded-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 w-full bg-transparent p-3 text-white placeholder-slate-400 focus:outline-none"
                disabled={isLoading}
              />
              <button type="submit" className="p-3 text-slate-400 hover:text-white disabled:text-slate-600" disabled={isLoading || !input.trim()}>
                <SendIcon className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
