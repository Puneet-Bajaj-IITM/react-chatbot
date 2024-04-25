import React, { useState } from 'react';
import './App.css';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios'; // Import axios for making HTTP requests

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserMessage = async (event) => {
    const userInput = event.message;

    // Make a POST request to your Python server
    try {
      const response = await axios.post('https://localhost:3000/query', { query: userInput }); // Specify the full URL including the port

      // Update chat history with the received response
      const updatedHistory = [...chatHistory, { user: userInput, bot: response.data.response }];
      setChatHistory(updatedHistory);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ChatBot
        steps={[
          {
            id: '1',
            message: 'What is your query?',
            trigger: '2',
          },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message : () => {
              handleUserMessage('{previousValue}')
            },
            trigger: '2'
          },
          
        ]}
        floating={true}
      />
  );
}

export default App;
