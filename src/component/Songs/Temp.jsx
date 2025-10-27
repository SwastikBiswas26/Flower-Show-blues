import React, { useEffect } from "react";

const Temp = () => {
  useEffect(() => {
    const audio = new Audio("/blues.mp3");
    audio.loop = true; // keep playing in background
    audio.volume = 0.5; // moderate volume

    const tryPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Autoplay successful 🎵");
          })
          .catch(() => {
            console.log("Autoplay blocked — waiting for user click...");
            alert("🔊 Browser blocked autoplay. Click anywhere to start the show🎶");

            // Wait for user interaction
            const onUserInteraction = () => {
              audio.play();
              console.log("Playback started after user gesture 🎶");
              window.removeEventListener("click", onUserInteraction);
              window.removeEventListener("keydown", onUserInteraction);
              window.removeEventListener("touchstart", onUserInteraction);
              window.removeEventListener("pointerdown", onUserInteraction);
            };

            window.addEventListener("click", onUserInteraction);
            window.addEventListener("keydown", onUserInteraction);
            window.addEventListener("touchstart", onUserInteraction);
            window.addEventListener("pointerdown", onUserInteraction);
          });
      }
    };

    tryPlay();

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  return (
    <div style={{ height: "0px", width: "0px" }}>
      {/* Hidden element (music only) */}
    </div>
  );
};

export default Temp;
