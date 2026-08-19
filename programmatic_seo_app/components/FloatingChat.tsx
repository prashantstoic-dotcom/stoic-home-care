'use client';
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type Message = { id: string, role: 'user' | 'ai', text: string };

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // New States for Chat Logic
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'ai', text: "Hi there! I'm your Care Advisor. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !socket) {
      const initChat = async () => {
        try {
          const res = await fetch('/api/chat/init', { method: 'POST' });
          const data = await res.json();
          if (data.success) {
            setSessionId(data.session_id);
            const newSocket = io({ path: '/socket.io' });
            setSocket(newSocket);
            
            // Listen to AI events
            newSocket.on('ai_typing', (data: { status: boolean }) => setIsTyping(data.status));
            
            newSocket.on('ai_response', (data: { text: string }) => {
              setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: data.text }]);
            });

            newSocket.on('error_message', (data: { error: string }) => {
               setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: `⚠️ ${data.error}` }]);
            });
          }
        } catch (err) {
          console.error("Chat init failed", err);
        }
      };
      initChat();
    }
  }, [isOpen, socket]);

  const handleSend = () => {
    if (!inputValue.trim() || !socket || !sessionId) return;

    // Add user message to UI immediately
    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMsg }]);
    setInputValue("");

    // Send to backend
    socket.emit('user_message', { sessionId, message: userMsg });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* The Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[500px] max-h-[80vh] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden mb-4 transition-all duration-300">
          
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
            <div>
              <h3 className="font-bold">Care Advisor</h3>
              <p className="text-xs text-blue-100">Usually replies instantly</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-3">
             {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'}`}>
                     {msg.text}
                  </div>
                </div>
             ))}
             
             {isTyping && (
               <div className="flex justify-start">
                 <div className="bg-white border border-gray-100 rounded-xl rounded-bl-none p-3 shadow-sm flex space-x-1">
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
             <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..." 
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm border focus:border-blue-400 transition-colors" 
             />
             <button onClick={handleSend} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 shadow-md transition-transform active:scale-95">
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
             </button>
          </div>

        </div>
      )}

      {/* The Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-blue-700 transition-transform hover:scale-110 active:scale-95 absolute bottom-0 right-0"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>
    </div>
  );
}
