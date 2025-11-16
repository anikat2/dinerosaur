import React from "react";
import PowerUpsBack from "./PowerUpsBack";
import AsteroidGame from "./AsteroidGame";

export default function ParentComponent({
  balance,
  setBalance,
  accessorizeClicked,
  setAccessorizeClicked,
  dragClicked,
  setDragClicked,
  icicleClicked,
  setIcicleClicked,
  timeTravelClicked,
  setTimeTravelClicked,
  asteroidPosition,
  setAsteroidPosition
}) {
  return (
    <div>
      <h1>PowerUps Dashboard</h1>

      <PowerUpsBack
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

      <AsteroidGame
        hatPowerUp={accessorizeClicked}
        dragPowerUp={dragClicked}
        iciclePowerUp={icicleClicked}
        resetDrag={() => setDragClicked(false)}
        resetIcicle={() => setIcicleClicked(false)}

        asteroidPosition={asteroidPosition}
        setAsteroidPosition={setAsteroidPosition}
        
      />
    </div>
  );
}
