import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaUser, FaComments } from 'react-icons/fa';

// Default chat messages
const defaultMessages = [
  {
    _id: "msg1",
    senderId: "user1",
    senderName: "Ahmed Khan",
    message: "Hello! I'm planning to visit Islamabad next week. Can you recommend some good places to visit?",
    timestamp: "2024-03-15T10:30:00",
    isRead: true
  },
  {
    _id: "msg2",
    senderId: "guide1",
    senderName: "Local Guide",
    message: "Hi Ahmed! Welcome to Islamabad. I'd recommend visiting Faisal Mosque, Daman-e-Koh, and Lok Virsa Museum. Would you like more details about any of these places?",
    timestamp: "2024-03-15T10:35:00",
    isRead: true
  },
  {
    _id: "msg3",
    senderId: "user1",
    senderName: "Ahmed Khan",
    message: "Yes, please tell me more about Faisal Mosque. What are the visiting hours?",
    timestamp: "2024-03-15T10:40:00",
    isRead: false
  }
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Get messages from localStorage or use default messages
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages && storedMessages.length > 0) {
      setMessages(storedMessages);
    } else {
      setMessages(defaultMessages);
      // Store default messages in localStorage
      localStorage.setItem('chatMessages', JSON.stringify(defaultMessages));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      _id: `msg${Date.now()}`,
      senderId: "guide1",
      senderName: "Local Guide",
      message: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl flex-1 flex flex-col p-6">
        <div className="flex items-center mb-8 pb-4 border-b border-gray-200">
          <FaComments className="text-blue-600 text-3xl mr-3" />
          <h1 className="text-3xl font-extrabold text-gray-900">Chat with Users</h1>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.senderId === "guide1" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 shadow-md ${
                  msg.senderId === "guide1"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <FaUser className="text-gray-500" />
                  </div>
                  <span className="font-semibold">{msg.senderName}</span>
                </div>
                <p className="text-base">{msg.message}</p>
                <div className="text-xs mt-2 opacity-85 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {!msg.isRead && msg.senderId === "guide1" && (
                    <span className="ml-2 font-medium">• Sent</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <FaPaperPlane className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat; 