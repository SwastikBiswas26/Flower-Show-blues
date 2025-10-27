import React, { useEffect, useState, useRef } from "react";
import "./Check.css";

const Check = () => {
  const [currentLine, setCurrentLine] = useState("Tap or click anywhere to start 🎵");
  const [fade, setFade] = useState(false);
  const [started, setStarted] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const hasStartedRef = useRef(false);

  const lyrics = [
    { time: 0, text: "🎶 Music 🎶" },
    { time: 17, text: "Your morning eyes, I could stare like watching stars" },
    { time: 24, text: "I could walk you by, and I'll tell without a thought" },
    { time: 31, text: "You'd be mine, would you mind if I took your hand tonight?" },
    { time: 38, text: "Know you're all that I want this life" },
    { time: 45, text: "🎶 Music 🎶" },
    { time: 46, text: "I'll imagine we fell in love" },
    { time: 49, text: "I'll nap under moonlight skies with you" },
    { time: 53, text: "I think I'll picture us, you with the waves" },
    { time: 57, text: "The ocean's colors on your face" },
    { time: 61, text: "I'll leave my heart with your air" },
    { time: 65, text: "So let me fly with you" },
    { time: 68, text: "Will you be forever with me?" },
    { time: 73, text: "🎶 Music 🎶" },
    { time: 78, text: "🌸 You are beautiful in your own world 🌿" },
    { time: 83, text: "Just don't compare yourself ✨" },
    { time: 88, text: "Made with 💖 ~ By Swastik 🤗🧿 " },
    { time: 95, text: "🎶 Music 🎶" },
    { time: 106, text: "My love will always stay by you" },
    { time: 111, text: "I'll keep it safe, so don't you worry a thing" },
    { time: 116, text: "I'll tell you I love you more" },
    { time: 120, text: "It's stuck with you forever, so promise you won't let it go" },
    { time: 126, text: "I'll trust the universe will always bring me to you" },
    { time: 131, text: "🎶 Music 🎶" },
    { time: 135, text: "I'll imagine we fell in love" },
    { time: 137, text: "I'll nap under moonlight skies with you" },
    { time: 142, text: "I think I'll picture us, you with the waves" },
    { time: 145, text: "The ocean's colors on your face" },
    { time: 148, text: "I'll leave my heart with your air" },
    { time: 153, text: "So let me fly with you" },
    { time: 157, text: "Will you be forever with me?" },
    { time: 162, text: "🎶 Music 🎶" },
    { time: 166, text: "Thanks For Watching! 🌻🍃" },
  ];

  const startMusic = async () => {
    // Prevent multiple triggers
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    setStarted(true);

    // Clear any previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Stop and cleanup any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = "";
      audioRef.current = null;
    }

    const audio = new Audio("/blues.mp3");
    audioRef.current = audio;
    audio.volume = 0.6;
    audio.loop = false;

    try {
      await audio.play();
      console.log("🎵 Playback started");

      let lastText = "";
      intervalRef.current = setInterval(() => {
        const t = Math.floor(audio.currentTime);
        const line = lyrics.findLast((l) => t >= l.time);
        if (line && line.text !== lastText) {
          setFade(true);
          setTimeout(() => {
            setCurrentLine(line.text);
            setFade(false);
          }, 400);
          lastText = line.text;
        }
      }, 1000);

      // Reset everything when song ends
      audio.addEventListener("ended", () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        hasStartedRef.current = false;
        setStarted(false);
        setCurrentLine("Click or tap to play again 🎶");
      });
    } catch (err) {
      console.log("⚠️ Playback blocked:", err);
      setCurrentLine("Tap again to allow sound 🔊");
      hasStartedRef.current = false;
      setStarted(false);
    }
  };

  useEffect(() => {
    const handleStart = (e) => {
      // Prevent event from bubbling and triggering multiple times
      e.preventDefault();
      e.stopPropagation();
      startMusic();
    };

    // Use capture phase to catch events early
    document.addEventListener("click", handleStart, { capture: true });
    document.addEventListener("touchstart", handleStart, { capture: true, passive: false });

    return () => {
      document.removeEventListener("click", handleStart, { capture: true });
      document.removeEventListener("touchstart", handleStart, { capture: true });
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return <div className={`check ${fade ? "fade" : ""}`}>{currentLine}</div>;
};

export default Check;