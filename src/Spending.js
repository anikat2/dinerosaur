import React, { useState } from "react";
import calculatorImg from "./assets/calculator.png";
import powerupsImg from "./assets/powerups.png";   // one screenshot image
import "./Spending.css";

function Spending({
  setPage,
  balance,
  setBalance,
  accessorizeClicked,
  setAccessorizeClicked,
  dragClicked,
  setDragClicked,
  icicleClicked,
  setIcicleClicked,
  timeTravelClicked,
  setTimeTravelClicked
}) {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        const result = eval(input);
        setInput(result);
        setBalance(Number(result));
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const accessorize = () => {
    if (balance >= 20) {
      setBalance(prev => prev - 20);
      setAccessorizeClicked(true);
    }
  };

  const drag = () => {
    if(balance >= 150) {
      setBalance(prev => prev - 150);
      setDragClicked(true);
    }
  };

  const icicle = () => {
    if(balance >= 20) {
      setBalance(prev => prev - 20);
      setIcicleClicked(true);
    }
  };

  const timetravel = () => {
    if(balance >= 20) {
      setBalance(prev => prev - 20);
      setTimeTravelClicked(true);
    }
  };

  return (
    <div className="spending-page-wrapper">
      <h1 className="spending-title">Spending / Power-Ups Page</h1>

      <button
        onClick={() => setPage("home")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px"
        }}
      >
        Back to Home
      </button>

      <div className="spending-page">

        {/* ============= CALCULATOR ============= */}
        <div className="calculator-container">
          <img src={calculatorImg} alt="Calculator" className="calculator-img" />

          <div className="calculator-display">
            <div>{input || "0"}</div>
          </div>

          {/* Calculator Buttons */}
          <button className="calc-btn" style={{ top: "115px", left: "35px" }} onClick={() => handleClick("1")}>1</button>
          <button className="calc-btn" style={{ top: "115px", left: "101px" }} onClick={() => handleClick("2")}>2</button>
          <button className="calc-btn" style={{ top: "115px", left: "166px" }} onClick={() => handleClick("3")}>3</button>
          <button className="calc-btn" style={{ top: "115px", left: "229px" }} onClick={() => handleClick("+")}>+</button>

          <button className="calc-btn" style={{ top: "165px", left: "35px" }} onClick={() => handleClick("4")}>4</button>
          <button className="calc-btn" style={{ top: "165px", left: "101px" }} onClick={() => handleClick("5")}>5</button>
          <button className="calc-btn" style={{ top: "165px", left: "166px" }} onClick={() => handleClick("6")}>6</button>
          <button className="calc-btn" style={{ top: "165px", left: "229px" }} onClick={() => handleClick("-")}>-</button>

          <button className="calc-btn" style={{ top: "217px", left: "35px" }} onClick={() => handleClick("7")}>7</button>
          <button className="calc-btn" style={{ top: "217px", left: "101px" }} onClick={() => handleClick("8")}>8</button>
          <button className="calc-btn" style={{ top: "217px", left: "166px" }} onClick={() => handleClick("9")}>9</button>
          <button className="calc-btn" style={{ top: "217px", left: "229px" }} onClick={() => handleClick("*")}>*</button>

          <button className="calc-btn" style={{ top: "274px", left: "35px" }} onClick={() => handleClick("0")}>0</button>
          <button className="calc-btn" style={{ top: "274px", left: "101px" }} onClick={() => handleClick(".")}>.</button>
          <button className="calc-btn" style={{ top: "274px", left: "166px" }} onClick={() => handleClick("=")}>=</button>
          <button className="calc-btn" style={{ top: "274px", left: "229px" }} onClick={() => handleClick("/")}>/</button>

          <button className="calc-btn" style={{ top: "328px", left: "35px", width: "176px", height: "46px"}} onClick={() => handleClick("C")}>C</button>
        </div>

        {/* ============= POWER-UPS ============= */}
        <div className="powerups-container">
          <img src={powerupsImg} alt="Power-ups" className="powerups-img" />

          {/* Hotspots — positioned by CSS */}
          <button
            className="purchase-hotspot accessorize-btn"
            onClick={accessorize}
            disabled={accessorizeClicked || balance < 20}
          />
          <button
            className="purchase-hotspot drag-btn"
            onClick={drag}
            disabled={balance < 150}
          />
          <button
            className="purchase-hotspot icicle-btn"
            onClick={icicle}
            disabled={balance < 300}
          />
          <button
            className="purchase-hotspot timetravel-btn"
            onClick={timetravel}
            disabled={balance < 1000}
          />
        </div>

      </div>
    </div>
  );
}

export default Spending;
