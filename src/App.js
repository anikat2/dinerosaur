import TempEr from "./TempEr";

import { useState } from 'react';
import './App.css';
import PowerUpsBack from './PowerUpsBack';
import Portfolio from './Portfolio';
import Spending from './Spending';
import Navbar from "./Navbar";
import AsteroidGame from './AsteroidGame';
import ParentComponent from "./ParentComponent";



function App() {
  const [page, setPage] = useState("home");

  // Shared state
  const [balance, setBalance] = useState(50);
  const [accessorizeClicked, setAccessorizeClicked] = useState(false);
  const [dragClicked, setDragClicked] = useState(false);
  const [icicleClicked, setIcicleClicked] = useState(false);
  const [timeTravelClicked, setTimeTravelClicked] = useState(false);
  const [asteroidPosition, setAsteroidPosition] = useState({ top: 0, left: 0 });

  return (
    <div className="App">
      {page === "home" && (
        <>
          <ParentComponent 
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
            asteroidPosition={asteroidPosition}
            setAsteroidPosition={setAsteroidPosition}
          />
          <Portfolio balance={balance} />

          <button onClick={() => setPage("spending")}>
            Go to Spending
          </button>
        </>
      )}
  

  return (
    <div className="App">
    <Navbar setPage={setPage} />

    {page === "home" && (
  <>
    <div style={{ position: "absolute", top: 10, right: 10, fontSize: "18px" }}>
      Balance: ${balance}
    </div>

    <AsteroidGame
      hatPowerUp={accessorizeClicked}
      dragPowerUp={dragClicked}
      iciclePowerUp={icicleClicked}
      resetDrag={() => setDragClicked(false)}
      resetIcicle={() => setIcicleClicked(false)}
    />
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
