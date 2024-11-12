# Docu AI - Sistema de Respuestas a Preguntas

![Docu AI](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=400)

## Descripción General

Docu AI es una aplicación web moderna que utiliza tecnología RAG (Generación Aumentada por Recuperación) para ofrecer capacidades inteligentes de análisis de documentos y respuestas a preguntas. Los usuarios pueden subir documentos e interactuar con un sistema de IA para obtener respuestas precisas basadas en el contenido del documento.

## Features

- 📄 **Carga de Documentos**: Soporte para formatos PDF y TXT
- 🤖 **Analisis potenciado por IA**: Procesamiento avanzado de documentos con tecnología RAG
- 💬 **Interfaz de Chat Interactiva**: Interfaz de preguntas y respuestas fácil de usar
- 🎨 **UI/UX Moderna**: Diseño responsivo con animaciones fluidas
- 🔒 **Procesamiento Seguro**: Manejo de archivos en el lado del cliente

## Tecnologias utilizadas para el Front

- **Frontend Framework**: React con javascript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Herramienta de construccion**: Vite

## Estructura del Proyecto

```
src/
├── components/
│   ├── DocumentUpload.jsx 
│   └── ChatInterface.jsx
├── pages/
│   ├── IA.jsx  
│   └── Principal.jsx       
├── App.jsx       
├── main.jsx         
└── index.css            
```

## Resumen de Componentes

### DocumentUpload
- Carga de archivos mediante arrastrar y soltar
- Validación de tipo de archivo
- Indicador de progreso de carga
- Soporte para archivos PDF y TXT

### ChatInterface
- Interfaz de chat en tiempo real
- Visualización del historial de mensajes
- Estados de carga para respuestas
- Indicador de documento actual

## Primeros pasos

1. Clona el repositorio:
```bash
git clone https://github.com/yourusername/documind-ai.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Desarrollo

### Prerrequisitos
- Node.js 16+
- npm o yarn
