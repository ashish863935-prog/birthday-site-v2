"use client";

import { useEffect, useState } from "react";

const heartEmojis = ["💖", "💕", "💘", "💝", "❤️", "💗", "💞", "💓"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 30 + 25,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        glowColor: randomColor(),
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 6000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heart-container">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}vw`,
            fontSize: `${heart.size}px`,
            filter: `drop-shadow(0 0 5px rgba(255,105,180,0.5))`,

          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}

function randomColor() {
  const colors = ["#ff69b4", "#ff1493", "#ff4da6", "#ff85c1", "#ff3399"];
  return colors[Math.floor(Math.random() * colors.length)];
}

