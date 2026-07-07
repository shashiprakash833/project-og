# KAI - AI Shopping Assistant Documentation
## For PROJECT_OG Team Members

Welcome to the team! This document provides a complete overview of the KAI (Knowledge Assisted Intelligence) agent integrated into the PROJECT_OG e-commerce platform.

---

## 1. What is KAI?

KAI is not just a chatbot; it's a premium AI-powered fashion shopping assistant designed to enhance the user experience on PROJECT_OG. Its goal is to act like an experienced fashion consultant, providing users with:

-   Product recommendations
-   Styling and outfit advice
-   Custom printing ideas
-   Information about the brand
-   Order tracking assistance

KAI is designed to be confident, concise, and aligned with the luxury streetwear aesthetic of the brand.

---

## 2. Core Concepts Explained

### LLM (Large Language Model)

An LLM is the "brain" behind KAI. It's a massive neural network trained on a vast amount of text data, which allows it to understand and generate human-like text. It can answer questions, write copy, summarize text, and carry on a conversation.

### OpenAI

OpenAI is the company that created the LLM we are using. They provide access to their powerful models through an API.

### OpenAI API Key

An API Key is a secret password that our application uses to prove it has permission to use the OpenAI service.

-   **It is SECRET**: The API key should never be shared publicly or committed to the Git repository.
-   **It costs money**: Every request sent to the OpenAI API incurs a small cost, which is billed to the account associated with the key.
-   **It is stored in an environment variable**: Our project securely reads the key from a `.env` file on the server, which is ignored by Git.

---

## 3. Architecture Overview

KAI's architecture is designed for security and scalability. It follows a standard client-server model to ensure the OpenAI API key is never exposed to the user's browser.

**The flow of a message is as follows:**

1.  **Frontend (React)**: The user types a message in the chat window.
2.  **Frontend API Call**: The React app sends the user's message and conversation history to our own internal backend API.
3.  **Backend (KAI API)**: Our Node.js/Express server receives the request at the `/api/chat` endpoint.
4.  **Secure OpenAI Call**: The backend server adds the secret `OPENAI_API_KEY` and a detailed `systemPrompt` to the conversation, then sends the complete package to the OpenAI API.
5.  **OpenAI Response**: OpenAI's LLM generates a response based on the instructions and conversation history.
6.  **Backend Response**: Our server receives the response from OpenAI and sends it back to the frontend.
7.  **Frontend Display**: The React app receives the response and displays KAI's message in the chat window.

---

## 4. The KAI API (`server/routes/chat.js`)

This is the internal API endpoint that powers KAI. It is not a third-party service.

### Key Responsibilities:

-   **Security**: It acts as a secure bridge, preventing the `OPENAI_API_KEY` from being exposed to the client-side.
-   **Persona Management**: It injects a `systemPrompt` into every API call to OpenAI. This prompt is a crucial set of instructions that defines KAI's personality, rules, and brand knowledge. It's what makes the assistant sound like a fashion expert and not a generic chatbot.
-   **Fallback Mode**: If the `OPENAI_API_KEY` is not provided (e.g., during local development), the API uses a `fallbackReply` function. This function provides pre-written, keyword-based answers, ensuring the chat feature remains functional even without a live AI connection.

---

## 5. Frontend Implementation

The entire frontend for KAI is built with React and located in `src/`.

-   **State Management (`src/context/ChatContext.jsx`)**: A React Context provider that manages the entire state of the chat:
    -   Is the window open, closed, or minimized?
    -   The list of messages in the conversation.
    -   The current loading status.
    -   It also handles sending messages to the backend and persisting the chat history to `localStorage`.

-   **Custom Hook (`src/hooks/useChat.js`)**: A simple hook that allows any component to easily access the chat state and functions from `ChatContext`.

-   **UI Components (`src/components/AIChat/`)**: This directory contains all the reusable components that make up the chat interface, such as the floating button, chat window, message bubbles, and input area.

-   **API Service (`src/services/chatApi.js`)**: This file centralizes the `fetch` call to our backend's `/api/chat` endpoint, making the code cleaner and easier to maintain.

---

## 6. Local Development Setup

To run the full AI-powered version of KAI locally, you need to provide an OpenAI API key.

1.  **Get a Key**: Sign up on the OpenAI Platform and create a new secret key in your API keys dashboard.
2.  **Create `.env` file**: In the `server/` directory, create a file named `.env`.
3.  **Add the Key**: Add the following line to your `server/.env` file, replacing `sk-YourSecretKey...` with your actual key:
    ```
    OPENAI_API_KEY="sk-YourSecretKey..."
    ```
4.  **Restart Server**: If your backend server was running, stop it and restart it (`npm run dev` in the `server` directory) to load the new environment variable.

If you do not provide a key, the chatbot will operate in **Fallback Mode**.

---

## 7. Future-Ready Design

The current architecture is designed for future expansion. The backend API (`chat.js`) is the ideal place to integrate more advanced features:

-   **RAG (Retrieval-Augmented Generation)**: We can connect the API to our product database (or a vector database) to provide real-time, inventory-aware product recommendations.
-   **Customer Data**: The API can be enhanced to access the customer database to provide personalized advice based on past orders.
-   **Image Generation**: We can connect it to an image generation model (like DALL-E) to create custom T-shirt mockups based on user prompts.

This concludes the overview of the KAI assistant. Feel free to explore the files mentioned to get a deeper understanding of the implementation.