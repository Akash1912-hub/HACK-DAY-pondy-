import React, { useState, useEffect } from 'react';

const VoiceAssistant = () => {
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = false;
      recog.lang = 'en-US';
      recog.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        handleCommand(transcript);
      };
      setRecognition(recog);
    } else {
      console.error('Speech Recognition not supported in this browser.');
    }
  }, []);

  const handleCommand = (command) => {
    let response = "";

    // Navigate to pages
    if (command.includes("dashboard")) {
      response = "Navigating to Dashboard";
      window.location.href = "/dashboard";
    } else if (command.includes("make a payment")) {
      response = "Navigating to Peer to Peer Section";
      window.location.href = "/peer";
    } 
    // Peer Transfer Page Specific Commands
    else if (command.includes("set recipient to")) {
      const recipientName = command.replace("set recipient to", "").trim();
      fillField("#recipient-input", recipientName); // Use CSS selector of the input field
      response = `Recipient set to ${recipientName}`;
    } else if (command.includes("set amount to")) {
      const amountValue = command.replace("set amount to", "").trim();
      fillField("#amount-input", amountValue); // Use CSS selector of the input field
      response = `Amount set to ${amountValue}`;
    } else if (command.includes("set description to")) {
      const descriptionText = command.replace("set description to", "").trim();
      fillField("#description-input", descriptionText); // Use CSS selector of the input field
      response = `Description set to ${descriptionText}`;
    } else if (command.includes("transfer money")) {
      response = "Navigating to Payment Section";
      window.location.href = "http://localhost:5174/";
    } else {
      response = "Sorry, I didn't understand that command.";
    }

    speak(response);
  };

  const fillField = (selector, value) => {
    const field = document.querySelector(selector);
    if (field) field.value = value;
  };

  const speak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div>
      <button onClick={startListening} className="bg-green-500 text-white px-4 py-2 rounded">Start Listening</button>
      <button onClick={stopListening} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Stop Listening</button>
    </div>
  );
};

export default VoiceAssistant;
