const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("Connected to WebSocket server");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = () => {
  console.log("Disconnected from WebSocket server");
};

socket.onmessage = ({ data }) => {
  try {
    const message = JSON.parse(data);
    if (message.count !== undefined) {
      document.getElementById("btn-count").innerHTML = message.count;
    }
  } catch (error) {
    console.error("Error parsing WebSocket message:", error);
  }
};

async function getInitialCount() {
  const url = "/api/v1/count";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const parsed = json[0].times_pressed;
    document.getElementById("btn-count").innerHTML = parsed;
  } catch (error) {
    console.error(error.message);
  }
}

// get initial count when page loads
getInitialCount();

document
  .getElementById("increment-btn")
  .addEventListener("click", function (e) {
    socket.send("increment");
  });
  
document
  .getElementById("decrement-btn")
  .addEventListener("click", function (e) {
    socket.send("decrement");
  });
