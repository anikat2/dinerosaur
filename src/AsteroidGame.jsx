import React, { useState, useEffect, useRef } from "react";
import earth from "./assets/earth.png";
import dino from "./assets/dino.png";
import asteroidImg from "./assets/asteroid.png";
import "./AsteroidGame.css";
import TempEr from "./TempEr";

export default function AsteroidGame({
  hatPowerUp,
  dragPowerUp,
  iciclePowerUp,
  resetDrag,
  resetIcicle,
}) {
  const containerRef = useRef(null);

  const dinoWidth = 300;
  const dinoHeight = 300;
  const asteroidWidth = 200;
  const asteroidHeight = 200;

  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Set initial asteroid position
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setPosition({
        top: 0,
        left: containerWidth - asteroidWidth
      });
    }
  }, []);
    const [gameOver, setGameOver] = useState(false);

  // Initial asteroid position (top-right corner)
useEffect(() => {
  if (containerRef.current) {
    const containerWidth = containerRef.current.offsetWidth;
    setPosition({
      top: 0,                                 // top of game area
      left: containerWidth - asteroidWidth    // right edge
    });
  }
}, []);


  const moveAsteroid = () => {
    if (gameOver) return;

    // Icicle powerup freezes asteroid once
    if (iciclePowerUp) {
      resetIcicle();
      return;
    }

    const horizontalStep = dragPowerUp ? 6 : 12;
    const verticalStep = dragPowerUp ? 2 : 5;

    if (dragPowerUp) resetDrag();

    setPosition((prev) => {
      const newTop = prev.top + verticalStep;
      const newLeft = Math.max(prev.left - horizontalStep, 0);

      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Dino position
      const dinoX = containerWidth / 2 - dinoWidth / 2;
      const dinoY = containerHeight - dinoHeight;

      // Asteroid position
      const asteroidX = newLeft;
      const asteroidY = newTop;

      const hitboxOffset = 0;

      const isCollision =
        asteroidX < dinoX + dinoWidth - hitboxOffset &&
        asteroidX + asteroidWidth > dinoX + hitboxOffset &&
        asteroidY < dinoY + dinoHeight - hitboxOffset &&
        asteroidY + asteroidHeight > dinoY + hitboxOffset;

      if (isCollision) {
        setGameOver(true);
      }

      return { top: newTop, left: newLeft };
    });
  };

  return (
    <div className="asteroid-layout">
      {/* Top Bar with Chart */}
      <div className="asteroid-top-bar">
        <TempEr
          onPercentChange={(percent) => {
            if (percent < 0) moveAsteroid(); // 🚀 Now works correctly
          }}
        />
      </div>

      {/* Game Area */}
      <div ref={containerRef} className="asteroid-container">
        <div className="earth-dino-wrapper">
          <img src={earth} alt="earth" className="earth" />
          <img src={dino} alt="dino" className="dino" />
        </div>

        {!gameOver && (
          <img
            src={asteroidImg}
            alt="asteroid"
            className="asteroid"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          />
        )}

        {gameOver && (
          <div className="asteroid-game-over">💥 Game Over! 💥</div>
        )}
      </div>

      {/* Test button */}
      <button
        style={{ marginTop: "20px" }}
        onClick={() => moveAsteroid()}
      >
        Test Move Asteroid
      </button>
    </div>
  );
}
