// App.jsx
import Address from "./Address";

function App() {
  const course = "Intro to React";
  const year = new Date().getFullYear();

  return (
    <div>
      <h1>Welcome to my Vite + React App!</h1>

      {/* Using curly brackets for JavaScript expressions */}
      <p>
        This page was created for the <strong>{course}</strong> class in {year}.
      </p>

      <h2>Address Component Below:</h2>

      {/* Passing props to Address */}
      <Address
        street="123 Main St"
        city="Springfield"
        state="IL"
        zip="62704"
      />
    </div>
  );
}

export default App;
