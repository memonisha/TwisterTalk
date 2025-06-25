"use client";

import React, { useState, useRef } from "react";

const SpeechRecognitionComponent = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    const SpeechRecognitionConstructor =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognitionConstructor) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      setListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      alert("Error occurred in recognition: " + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.9)",
        padding: "2rem",
        borderRadius: "20px",
        textAlign: "center",
        maxWidth: "600px",
        width: "90%",
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        margin: "auto",
      }}
    >
      <h2 style={{ color: "#ff4081" }}>🎤 Speech Recognition Test</h2>
      <button
        onClick={startListening}
        disabled={listening}
        style={{
          padding: "0.8rem 2rem",
          fontSize: "1.1rem",
          borderRadius: "10px",
          border: "none",
          background: listening ? "#9e9e9e" : "#4caf50",
          color: "#fff",
          cursor: listening ? "not-allowed" : "pointer",
          marginBottom: "1rem",
        }}
      >
        {listening ? "Listening..." : "Start Speaking"}
      </button>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#333",
          minHeight: "2rem",
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "10px",
          backgroundColor: "#f7f7f7",
          userSelect: "text",
        }}
      >
        {transcript || "Your speech will appear here..."}
      </p>
    </div>
  );
};

export default SpeechRecognitionComponent;
