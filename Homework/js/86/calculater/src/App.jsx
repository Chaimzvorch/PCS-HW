import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "0",     // number user is typing
      total: null,      // stored first number
      operator: null    // "+", "-", "*", "/"
    };
  }

  handleNumberClick = (num) => {
    // If current is "0", replace. Otherwise, append.
    this.setState((prev) => ({
      current: prev.current === "0" ? String(num) : prev.current + String(num)
    }));
  };

  handleOperatorClick = (op) => {
    this.setState((prev) => ({
      total: prev.current,   // save the number typed so far
      operator: op,          // store operator
      current: "0"           // reset for next number typing
    }));
  };

  handleEquals = () => {
    const { total, current, operator } = this.state;

    if (!total || !operator) return;

    const a = Number(total);
    const b = Number(current);
    let result = 0;

    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = b !== 0 ? a / b : "ERR";
        break;
      default:
        break;
    }

    this.setState({
      current: String(result),
      total: null,
      operator: null
    });
  };

  handleClear = () => {
    this.setState({
      current: "0",
      total: null,
      operator: null
    });
  };

  render() {
    return (
      <div
        style={{
          fontFamily: "sans-serif",
          width: "220px",
          margin: "40px auto",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px"
        }}
      >
        <h2 style={{ textAlign: "center" }}>React Calculator</h2>

        {/* Display */}
        <div
          style={{
            height: "50px",
            fontSize: "24px",
            background: "#eee",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "4px",
            textAlign: "right"
          }}
        >
          {this.state.current}
        </div>

        {/* Calculator Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>

          {/* Row 1 */}
          <button onClick={() => this.handleNumberClick(7)}>7</button>
          <button onClick={() => this.handleNumberClick(8)}>8</button>
          <button onClick={() => this.handleNumberClick(9)}>9</button>
          <button onClick={() => this.handleOperatorClick("/")}>/</button>

          {/* Row 2 */}
          <button onClick={() => this.handleNumberClick(4)}>4</button>
          <button onClick={() => this.handleNumberClick(5)}>5</button>
          <button onClick={() => this.handleNumberClick(6)}>6</button>
          <button onClick={() => this.handleOperatorClick("*")}>*</button>

          {/* Row 3 */}
          <button onClick={() => this.handleNumberClick(1)}>1</button>
          <button onClick={() => this.handleNumberClick(2)}>2</button>
          <button onClick={() => this.handleNumberClick(3)}>3</button>
          <button onClick={() => this.handleOperatorClick("-")}>-</button>

          {/* Row 4 */}
          <button onClick={() => this.handleNumberClick(0)}>0</button>
          <button onClick={this.handleClear}>C</button>
          <button onClick={this.handleEquals}>=</button>
          <button onClick={() => this.handleOperatorClick("+")}>+</button>

        </div>
      </div>
    );
  }
}

export default App;