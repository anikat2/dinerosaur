import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Spending from "./Spending";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="App">
      {page === "home" && (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.js</code> and save to reload.</p>

          <button onClick={() => setPage("spending")}>
            Go to Spending
          </button>
        </header>
      )}

      {page === "spending" && <Spending />}
    </div>
  );
}

export default App;
