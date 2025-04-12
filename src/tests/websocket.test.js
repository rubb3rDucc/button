import { WebSocket } from 'ws';
import { setupWebSocketServer } from '../controllers/websocketController.js';
import http from 'http';

describe('WebSocket Server', () => {
  let server;
  let wss;
  let client;

  beforeAll((done) => {
    server = http.createServer();
    wss = setupWebSocketServer(server);
    server.listen(0, (err) => {
      if (err) return err;
      const port = server.address().port;
      client = new WebSocket(`ws://localhost:${port}`);
      client.on('open', done);
    });
  });

  afterAll((done) => {
    client.close();
    wss.close(() => {
      server.close(done);
    });
  });


  it('should handle increment message', (done) => {
    client.once('message', (data) => {
      const message = JSON.parse(data.toString());
      expect(message.count).toBeGreaterThan(0);
      done();
    });
    client.send('increment');
  });

  it('should handle decrement message', (done) => {
    client.once('message', (data) => {
      const message = JSON.parse(data.toString());
      expect(message.count).toBeLessThan(5);
      done();
    });
    client.send('decrement');
  });
}); 