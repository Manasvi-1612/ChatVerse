"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const ws_1 = __importDefault(require("ws"));
const initializeSocket = (wsServer) => {
    return wsServer.on('connection', (socket) => {
        try {
            socket.on('error', (err) => console.log(err));
            socket.on('message', (message) => {
                console.log('received: %s', message);
                wsServer.clients.forEach((client) => {
                    if (client.readyState === ws_1.default.OPEN) {
                        client.send(message, { binary: false });
                    }
                });
            });
            socket.on('close', () => {
                console.log('Client disconnected', wsServer.clients.size);
            });
            console.log('Client connected', wsServer.clients.size);
            socket.send('Hello, you are connected to the server');
        }
        catch (error) {
            socket.emit((error === null || error === void 0 ? void 0 : error.message) || "Something went wrong while connecting to the socket.");
        }
    });
};
exports.initializeSocket = initializeSocket;
