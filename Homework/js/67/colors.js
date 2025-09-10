
(function () {
const table = document.querySelector("#colorlog");
const tableBody = document.querySelector("#colorLog tbody");
let isRunning;
  let intervalId;
  let shouldLog = true;

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function logColorChange(bgColor, textColor) {
    if (!shouldLog) return;
    const now = new Date().toLocaleString();
    const row = document.createElement("tr");
    row.innerHTML = `<td>${now}</td><td>${bgColor}</td><td>${textColor}</td>`;
    
    // Closure to capture colors
    row.addEventListener("click", () => {
      clearInterval(intervalId);
      document.body.style.backgroundColor = bgColor;
      document.body.style.color = textColor;
    });

    tableBody.appendChild(row);
  }
   function stopColorCycle() {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    shouldLog = false;
  }

  function startColorCycle() {
    intervalId = setInterval(() => {
      const bgColor = getRandomColor();
      const textColor = getRandomColor();
      document.body.style.backgroundColor = bgColor;
      document.body.style.color = textColor;
      logColorChange(bgColor, textColor);
    }, 1000); // Change every 3 seconds
     isRunning = true;
    shouldLog = true
  }

  tableBody.addEventListener("click",()=>{
    if(isRunning){
        stopColorCycle();
    }
    else startColorCycle();{

    }
  })

  startColorCycle();
}());
