import React from 'react';
import { Brain, ArrowRight, Search, FileText, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Principal({ onStart }) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/IA');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-center">
      <div className="mb-12">
        <div className="flex justify-center mb-6">
          <Brain className="h-20 w-20 text-blue-400 animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Bienvenido a nuestra IA para documentos
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Su asistente documental inteligente con tecnología de IA avanzada
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: <FileText className="h-8 w-8 text-blue-400" />,
            title: "Subir documentos",
            description: "Comparte tus archivos PDF o TXT de forma segura"
          },
          {
            icon: <Search className="h-8 w-8 text-purple-400" />,
            title: "Analisis IA",
            description: "Procesado avanzado con tecnología RAG"
          },
          {
            icon: <MessageSquare className="h-8 w-8 text-green-400" />,
            title: "Obtener respuestas",
            description: "Haga preguntas y reciba información al instante"
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full overflow-hidden hover:bg-blue-700 transition-colors duration-300"
      >
        <span className="relative z-10 flex items-center">
          Empezar
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
}

export default Principal;
