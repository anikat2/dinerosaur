import React, { useState, useEffect, useRef } from "react";
import dino from "./assets/dino.png";
import asteroid from "./assets/asteroid.png";
import hat from "./assets/halloweenhatpowerup.png";
import earth from "./assets/earth.png";

function AsteroidGame({
  hatPowerUp,
  dragPowerUp,
  iciclePowerUp,
  resetDrag,
  resetIcicle,
  asteroidPosition,
  setAsteroidPosition,
  triggerMove
}) {
  const containerRef = useRef(null);

  const dinoWidth = 150;
  const dinoHeight = 150;
  const asteroidWidth = 120;
  const asteroidHeight = 120;

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    if (
      (asteroidPosition == null) ||
      (asteroidPosition.top === 0 && asteroidPosition.left === 0)
    ) {
      setAsteroidPosition({ top: 0, left: containerWidth - asteroidWidth });
    }
  }, []);

  // Listen for external trigger to move asteroid
  useEffect(() => {
    if (triggerMove) {
      moveAsteroid();
    }
  }, [triggerMove]);

  const moveAsteroid = () => {
    if (gameOver) return;

    // --- POWER-UP LOGIC -----------------------------------

    // Icicle → freeze for one move, then turn it OFF
    if (iciclePowerUp) {
      console.log("Icicle activated → asteroid frozen for this click");
      resetIcicle();  // turn off after using ONCE
      return;
    }

    // Drag → slow movement ONCE
    const horizontalStep = dragPowerUp ? 6 : 12;
    const verticalStep = dragPowerUp ? 2 : 5;

    if (dragPowerUp) {
      console.log("Drag activated → slow asteroid this click");
      resetDrag(); // RESET after one use
    }

    // --------------------------------------------------------

    setAsteroidPosition(prev => {
      const newTop = prev.top + verticalStep;
      const newLeft = Math.max(prev.left - horizontalStep, 0);

      // Collision detection
      if (
        newLeft < dinoWidth - 80 &&
        newTop + asteroidHeight > containerRef.current.offsetHeight - dinoHeight
      ) {
        setGameOver(true);
      }

      return { top: newTop, left: newLeft };
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5vh" }}>
      <h1>Save the Dino! 🦖☄️</h1>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "60vw",
          height: "50vh",
          margin: "0 auto",
          border: "1px solid #ccc",
          overflow: "hidden"
        }}
      >
        {/* Earth - positioned in bottom left */}
        <img
          src={earth}
          alt="earth"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "28%",
            height: "44%",
            zIndex: 1
          }}
        />

        {/* Dinosaur - on top of earth in bottom left */}
        <img
          src={dino}
          alt="dino"
          style={{
            position: "absolute",
            bottom: "40%",  // Positioned on top of the earth
            left: "6%",     // Centered on the earth
            width: `${dinoWidth}px`,
            zIndex: 2
          }}
        />

        {/* Hat */}
        {hatPowerUp && (
          <img
            src={hat}
            alt="hat"
            style={{
              position: "absolute",
              bottom: "calc(40% + 85px)",  // Adjusted for new dino position
              left: "calc(6% + 70px)",  // Adjusted for new dino position
              width: "50px",
              zIndex: 3
            }}
          />
        )}

        {/* Asteroid */}
        {!gameOver && (
          <img
            src={asteroid}
            alt="asteroid"
            style={{
              position: "absolute",
              top: `${asteroidPosition.top}px`,
              left: `${asteroidPosition.left}px`,
              width: `${asteroidWidth}px`,
              transition: "top 0.2s ease, left 0.2s ease",
              zIndex: 2
            }}
          />
        )}

        {/* Game Over */}
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
              fontSize: "2rem",
              fontWeight: "bold",
              zIndex: 10
            }}
          >
            💥 Game Over! 💥
          </div>
        )}
      </div>

      <button
        onClick={moveAsteroid}
        style={{ marginTop: "2vh", padding: "1vh 2vw", fontSize: "1.1rem" }}
        disabled={gameOver}
      >
        Move Asteroid Diagonally
      </button>
    </div>
  );
}

export default AsteroidGame;