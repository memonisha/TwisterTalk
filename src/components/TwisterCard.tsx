"use client";

import React, { useState, useEffect, useRef } from "react";
import tongueTwisters from "../utils/twister";

const TwisterCard = () => {
  const [currentTwister, setCurrentTwister] = useState<string | null>(null);
  const [spokenText, setSpokenText] = useState("");
  const [feedback, setFeedback] = useState("");

  const clapAudio = useRef<HTMLAudioElement | null>(null);
  const sadAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clapAudio.current = new Audio("/sounds/clap.mp3");
    sadAudio.current = new Audio("/sounds/sad-buzzer.mp3");
  }, []);

  useEffect(() => {
    const twister = tongueTwisters[Math.floor(Math.random() * tongueTwisters.length)];
    setCurrentTwister(twister);
  }, []);

  function normalizeText(text: string) {
    return text.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "");
  }

  const startRecording = () => {
    if (typeof window === "undefined" || !(window.SpeechRecognition || window.webkitSpeechRecognition)) {
      setFeedback("❌ Speech Recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition: SpeechRecognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speech = event.results[0][0].transcript;
      setSpokenText(speech);

      if (normalizeText(speech) === normalizeText(currentTwister || "")) {
        setFeedback("✅ Awesome! You nailed it!");
        clapAudio.current?.play();
      } else {
        setFeedback("❌ Oops! Try again: " + currentTwister);
        sadAudio.current?.play();
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setFeedback("❌ Error occurred in recognition: " + event.error);
      sadAudio.current?.play();
    };

    recognition.start();
    setFeedback("🎙️ Listening...");
  };

  const nextTwister = () => {
    const next = tongueTwisters[Math.floor(Math.random() * tongueTwisters.length)];
    setCurrentTwister(next);
    setSpokenText("");
    setFeedback("");
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
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#ff4081" }}>
        Try this tongue twister:
      </h2>
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "1rem",
        }}
      >
        {currentTwister ? `“${currentTwister}”` : "Loading..."}
      </p>
      <button
        onClick={startRecording}
        style={{
          padding: "0.8rem 2rem",
          fontSize: "1.1rem",
          borderRadius: "10px",
          border: "none",
          background: "#4caf50",
          color: "#fff",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        🎤 Say it
      </button>
      <button
        onClick={nextTwister}
        style={{
          padding: "0.8rem 2rem",
          fontSize: "1.1rem",
          borderRadius: "10px",
          border: "none",
          background: "#2196f3",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        🔁 Next
      </button>

      {spokenText && (
        <div style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#555" }}>
          <p>
            <strong>You said:</strong> &quot;{spokenText}&quot;
          </p>
        </div>
      )}

      {feedback && (
        <div
          style={{
            marginTop: "1rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: feedback.includes("✅") ? "green" : "red",
          }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default TwisterCard;
