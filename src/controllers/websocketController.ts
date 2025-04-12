import { WebSocketServer, WebSocket } from "ws";
import { pool } from "../db/dbConnection.js";

let currentCount = 0;

async function initializeCount() {
  try {
    const result = await pool.query('SELECT times_pressed FROM button_metrics');
    currentCount = result.rows[0].times_pressed;
  } catch (error) {
    console.error('Error initializing count:', error);
    currentCount = 0;
  }
}

export function setupWebSocketServer(server: any) {
  try {
    const wss = new WebSocketServer({ server });

    initializeCount();

    wss.on("connection", (ws) => {
      console.log("Client connected");
      
      ws.send(JSON.stringify({ count: currentCount }));

      ws.on("message", async (message) => {
        try {
          console.log(`Received: ${message}`);
          const action = message.toString();
          
          // update count based on action
          if (action === "increment") {
            currentCount++;
            await pool.query('UPDATE button_metrics SET times_pressed = times_pressed + 1');
          } else if (action === "decrement") {
            currentCount--;
            await pool.query('UPDATE button_metrics SET times_pressed = times_pressed - 1');
          }

          // broadcast the updated count to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ count: currentCount }));
            }
          });
        } catch (error) {
          console.error('Error handling message:', error);
        }
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    });

    return wss;
  } catch (error) {
    console.error('Error setting up WebSocket server:', error);
    throw error;
  }
} 