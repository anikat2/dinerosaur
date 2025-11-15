import React, { useState, useEffect, useRef } from "react";
import dino from "/Users/rakshanadevalla/dinerosaur/src/assets/dinosaur-cartoon-dinosaur-cute-dinosaur-dinosaur-clipart-cat-dog-meter-snout-png-clipart-removebg-preview.png";
import asteroid from "/Users/rakshanadevalla/dinerosaur/src/assets/pngtree-asteroid-icon-flat-style-png-image_1977257-removebg-preview.png";

function AsteroidGame() {
  const containerRef = useRef(null);

  const dinoWidth = 150;
  const dinoHeight = 150;
  const asteroidWidth = 120;
  const asteroidHeight = 120;

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [gameOver, setGameOver] = useState(false);

  // Set initial asteroid position at top-right when component mounts
  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    setPosition({ top: 0, left: containerWidth - asteroidWidth });
  }, []);

  const moveAsteroid = () => {
    if (gameOver) return;
  
    const horizontalStep = 12; // moves left faster
    const verticalStep = 5;    // moves down slower → less vertical
  
    setPosition(prev => {
      const newTop = prev.top + verticalStep;
      const newLeft = Math.max(prev.left - horizontalStep, 0);
  
      // Collision detection
      if (
        newLeft < dinoWidth-80 &&
        newTop + asteroidHeight > containerRef.current.offsetHeight - dinoHeight
      ) {
        setGameOver(true);
      }
  
      return { top: newTop, left: newLeft };
    });
  };
  

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Save the Dino! 🦖☄️</h1>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "400px",
          height: "250px",
          margin: "0 auto",
          border: "1px solid #ccc",
          overflow: "hidden"
        }}
      >
        {/* Dinosaur */}
        <img
          src={dino}
          alt="dino"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: `${dinoWidth}px`
          }}
        />

        {/* Asteroid */}
        {!gameOver && (
          <img
            src={asteroid}
            alt="asteroid"
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${asteroidWidth}px`,
              transition: "top 0.2s ease, left 0.2s ease"
            }}
          />
        )}

        {/* Game Over overlay */}
        {gameOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "32px",
              fontWeight: "bold"
            }}
          >
            💥 Game Over! 💥
          </div>
        )}
      </div>

      <button
        onClick={moveAsteroid}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "18px" }}
        disabled={gameOver} // disable button after game over
      >
        Move Asteroid Diagonally
      </button>
    </div>
  );
}

export default AsteroidGame;
