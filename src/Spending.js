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
            onClick={() => setAccessorizeClicked(true)}
            disabled={accessorizeClicked}
          />
          <button
            className="purchase-hotspot drag-btn"
            onClick={() => setDragClicked(!dragClicked)}
          />
          <button
            className="purchase-hotspot icicle-btn"
            onClick={() => setIcicleClicked(!icicleClicked)}
          />
          <button
            className="purchase-hotspot timetravel-btn"
            onClick={() => setTimeTravelClicked(!timeTravelClicked)}
          />
        </div>

      </div>
    </div>
  );
}

export default Spending;
