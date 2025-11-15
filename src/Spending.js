import React, { useState } from "react";
import calculatorImg from "./calculator.png"; // your calculator image
import "./Spending.css"; // the CSS we'll define

function Spending() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        setInput(eval(input)); // simple evaluation
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="spending-page">
      <h1>Spending Page</h1>

      <div className="calculator-container">
        <img src={calculatorImg} alt="Calculator" className="calculator-img" />

        <div className="calculator-display">
          <div>{input || "0"}</div>
        </div>

        {/* Example button positions */}
        <button className="calc-btn" style={{ top: "100px", left: "30px" }} onClick={() => handleClick("1")}>1</button>
        <button className="calc-btn" style={{ top: "100px", left: "90px" }} onClick={() => handleClick("2")}>2</button>
        <button className="calc-btn" style={{ top: "100px", left: "150px" }} onClick={() => handleClick("3")}>3</button>
        <button className="calc-btn" style={{ top: "100px", left: "210px" }} onClick={() => handleClick("+")}>+</button>

        <button className="calc-btn" style={{ top: "160px", left: "30px" }} onClick={() => handleClick("4")}>4</button>
        <button className="calc-btn" style={{ top: "160px", left: "90px" }} onClick={() => handleClick("5")}>5</button>
        <button className="calc-btn" style={{ top: "160px", left: "150px" }} onClick={() => handleClick("6")}>6</button>
        <button className="calc-btn" style={{ top: "160px", left: "210px" }} onClick={() => handleClick("-")}>-</button>

        <button className="calc-btn" style={{ top: "220px", left: "30px" }} onClick={() => handleClick("7")}>7</button>
        <button className="calc-btn" style={{ top: "220px", left: "90px" }} onClick={() => handleClick("8")}>8</button>
        <button className="calc-btn" style={{ top: "220px", left: "150px" }} onClick={() => handleClick("9")}>9</button>
        <button className="calc-btn" style={{ top: "220px", left: "210px" }} onClick={() => handleClick("*")}>*</button>

        <button className="calc-btn" style={{ top: "280px", left: "30px" }} onClick={() => handleClick("0")}>0</button>
        <button className="calc-btn" style={{ top: "280px", left: "90px" }} onClick={() => handleClick(".")}>.</button>
        <button className="calc-btn" style={{ top: "280px", left: "150px" }} onClick={() => handleClick("=")}>=</button>
        <button className="calc-btn" style={{ top: "280px", left: "210px" }} onClick={() => handleClick("/")}>/</button>

        <button className="calc-btn" style={{ top: "340px", left: "30px", width: "190px" }} onClick={() => handleClick("C")}>C</button>
      </div>
    </div>
  );
}

export default Spending;
