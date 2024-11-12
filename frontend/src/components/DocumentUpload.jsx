import React, { useCallback } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';

const DocumentUpload = ({ onFileUpload, isLoading }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.type === 'application/pdf' || file.type === 'text/plain')) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleFileInput = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Sube tu documento</h2>
        <p className="text-gray-400">
          Sube un archivo PDF o TXT para empezar a analizar
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center hover:border-blue-500 transition-colors duration-300"
      >
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <p className="text-xl font-medium">Procesando tu documento</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            <p className="text-xl mb-2">Arrastra y suelta tu archivo aquí</p>
            <p className="text-gray-400 mb-4">or</p>
            <label className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors duration-300">
              <FileText className="h-5 w-5 mr-2" />
              <span>Elige un archivo</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.txt"
                onChange={handleFileInput}
              />
            </label>
            <p className="mt-4 text-gray-400">Formatos: PDF, TXT</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
