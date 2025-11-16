import { useState } from 'react';
import './App.css';
import PowerUpsBack from './PowerUpsBack';
import ParentComponent from './ParentComponent';
import Portfolio from './Portfolio';
import Spending from './Spending';

function App() {
  const [page, setPage] = useState("home");

  // Shared state
  const [balance, setBalance] = useState(5);
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
