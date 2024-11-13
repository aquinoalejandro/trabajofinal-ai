import React, { useState } from 'react';
import { Upload, MessageSquare, FileText, Loader2 } from 'lucide-react';
import DocumentUpload from '../components/DocumentUpload';
import ChatInterface from '../components/ChatInterface';

function Ia() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setFileName(file.name);
    setUploadedFile(file);
    setIsFileUploaded(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Docu AI</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!isFileUploaded ? (
          <DocumentUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
        ) : (
          <ChatInterface fileName={fileName} uploadedFile={uploadedFile} />
        )}
      </main>

    </div>
  );
}

export default Ia;
