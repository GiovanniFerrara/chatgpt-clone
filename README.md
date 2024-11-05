# ChatGPT clone

A sleek and intuitive React-based frontend for interacting with GPT-4, featuring real-time streaming responses and conversation management.

## Features

- 🔐 Secure API key management using session storage
- 💬 Real-time streaming chat interface
- 📱 Responsive Material-UI design
- 🗂️ Conversation history management
- 🌐 Integration with GPT-4 streaming backend

## Tech Stack

- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- React Router
- ESLint

## Quick Start

1. Clone the repository:

git clone https://github.com/yourusername/ferrara-gpt-frontend.git
cd ferrara-gpt-frontend
npm install
npm run dev
# Backend Setup & Requirements

The application requires the GPT-4 Streaming Backend to be running. You can find it at https://github.com/GiovanniFerrara/chatgpt4-streaming-backend

## Setup Instructions

1. Clone the backend repository
2. Install dependencies with `npm install`

3. Start the server with `npm run dev`

## Backend Features

The backend provides:

- Streaming chat completions using OpenAI's GPT-4
- Conversation management with persistent storage
- RESTful API endpoints
- Event-stream based real-time responses

### Key Capabilities

- Automatic conversation title generation
- Message history persistence
- Real-time streaming responses
- Error handling and validation
- Chronological conversation sorting

## Usage
- Visit the application at http://localhost:5173
- Enter your OpenAI API key on the home page
- Start chatting with the AI in the dashboard

## Security
- API keys are stored only in session storage
- No sensitive data is persisted on the server
- Secure communication with backend API


# Building for Production
npm run build

# Linting
npm run lint


## Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## Backend Integration
This frontend is designed to work with the GPT-4 Streaming Backend. Make sure to set up the backend service for full functionality.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Gian Marco Ferrara - gianmarco.ferrara@gmail.com
