import { useState } from "react";

function App() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: fontFamily,
        minHeight: "100vh",
        padding: "2rem"
      }}
    >
      <h1>Color & Font Picker</h1>

      <label>
        Background Color:
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        Text Color:
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        Font:
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </label>

      <p>
        This text updates immediately when you change colors or font.
      </p>
    </div>
  );
}

export default App;
