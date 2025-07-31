import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatScreen = ({ activeChat, setActiveChat, conversations, setConversations, saveToStorage }) => {
  const [message, setMessage] = useState('');
  const chatMessages = conversations[activeChat?.id] || [];
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    const updatedConversations = {
      ...conversations,
      [activeChat.id]: [...(conversations[activeChat.id] || []), newMessage]
    };

    setConversations(updatedConversations);
    saveToStorage('conversations', updatedConversations);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="p-4 bg-white dark:bg-gray-800/50 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 flex items-center sticky top-0 z-10">
        <Button onClick={() => setActiveChat(null)} variant="ghost" size="icon" className="mr-4 text-gray-600 dark:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <img  alt={activeChat?.name} className="w-10 h-10 rounded-full object-cover mr-3" src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white">{activeChat?.name}</h2>
          <p className="text-sm text-green-500">En ligne</p>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-20">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="font-semibold">Commencez la conversation !</p>
            <p className="text-sm">Envoyez un message à {activeChat?.name}.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-purple-600 text-white rounded-br-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-lg'}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
      </main>

      <footer className="p-4 bg-white dark:bg-gray-800/50 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message..."
            className="flex-1 p-3 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Button type="submit" size="icon" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-12 h-12">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default ChatScreen;