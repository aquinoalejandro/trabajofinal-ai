import React, { useState } from 'react';
import { Send, FileText, Loader2, RefreshCcw  } from 'lucide-react';
import axios from 'axios';

const ChatInterface = ({ fileName, uploadedFile }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatDisabled, setChatDisabled] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('quest', input);
      formData.append('file', uploadedFile); 
  
      const response = await axios.post('http://localhost:5000/api/ai', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const botMessage = {
        id: Date.now() + 1,
        text: response.data,
        isUser: false,
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Manejo de errores
      const botMessage = {
        id: Date.now() + 1,
        text: 'Lo siento, ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.',
        isUser: false,
      }
      setMessages((prev) => [...prev, botMessage]); 
      setChatDisabled(true);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-4 mb-4 flex items-center">
        <FileText className="h-5 w-5 text-blue-400 mr-2" />
        <span className="text-gray-300">Documento actual: {fileName}</span>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <p>Haz una pregunta sobre el documento</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg p-4">
                <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            disabled={chatDisabled}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Haz una pregunta sobre el documento..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || chatDisabled}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <RefreshCcw className="h-5 w-5 text-white animate-spin" />
            ) : (
              <Send className="h-5 w-5 text-white" />
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
