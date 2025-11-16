import { useState } from 'react';
import './App.css';
import AsteroidGame from "./AsteroidGame";
import Spending from './Spending';
import TempEr from './TempEr';

function App() {
  const [page, setPage] = useState("home");

  // SINGLE shared balance for BOTH portfolio and game spending
  const [balance, setBalance] = useState(50);
  
  // Power-up states
  const [accessorizeClicked, setAccessorizeClicked] = useState(false);
  const [dragClicked, setDragClicked] = useState(false);
  const [icicleClicked, setIcicleClicked] = useState(false);
  const [timeTravelClicked, setTimeTravelClicked] = useState(false);
  
  // Game state
  const [asteroidPosition, setAsteroidPosition] = useState({ top: 0, left: 0 });
  const [triggerAsteroidMove, setTriggerAsteroidMove] = useState(0);

  // Function to trigger asteroid movement from TempEr
  const handleNegativeChange = () => {
    setTriggerAsteroidMove(prev => prev + 1);
  };

  return (
    <div className="App">
      {page === "home" && (
        <>
          {/* Portfolio Graph Section - uses same balance */}
          <TempEr 
            balance={balance} 
            setBalance={setBalance}
            onNegativeChange={handleNegativeChange}
          />

          {/* Dinosaur Game Section */}
          <AsteroidGame
            hatPowerUp={accessorizeClicked}
            dragPowerUp={dragClicked}
            iciclePowerUp={icicleClicked}
            resetDrag={() => setDragClicked(false)}
            resetIcicle={() => setIcicleClicked(false)}
            asteroidPosition={asteroidPosition}
            setAsteroidPosition={setAsteroidPosition}
            triggerMove={triggerAsteroidMove}
          />

          <button 
            onClick={() => setPage("spending")}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              fontSize: "18px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Go to Spending
          </button>
        </>
      )}

      {page === "spending" && (
        <Spending
          setPage={setPage}
          balance={balance}
          setBalance={setBalance}
          accessorizeClicked={accessorizeClicked}
          setAccessorizeClicked={setAccessorizeClicked}
          dragClicked={dragClicked}
          setDragClicked={setDragClicked}
          icicleClicked={icicleClicked}
          setIcicleClicked={setIcicleClicked}
          timeTravelClicked={timeTravelClicked}
          setTimeTravelClicked={setTimeTravelClicked}
        />
      )}
    </div>
  );
}

export default App;