
import WebSocket from 'ws';

export const initializeSocket = (wsServer: WebSocket.Server<typeof WebSocket>) => {
  return wsServer.on('connection', (socket) => {
    try {
      socket.on('error', (err) => console.log(err));

      socket.on('message', (message) => {
        console.log('received: %s', message);

        wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message, { binary: false });
          }
        });
      })

      socket.on('close', () => {
        console.log('Client disconnected', wsServer.clients.size);
      })

      console.log('Client connected', wsServer.clients.size);

      socket.send('Hello, you are connected to the server');
    } catch (error: any) {
      socket.emit(
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  })
}