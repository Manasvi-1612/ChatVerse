"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const ioredis_1 = __importDefault(require("ioredis"));
const { REDIS_URI } = process.env;
const pub = new ioredis_1.default(REDIS_URI);
pub.on('error', (err) => {
    throw new Error(err);
});
const sub = new ioredis_1.default(REDIS_URI);
sub.on('error', (err) => {
    throw new Error(err);
});
class SocketService {
    constructor() {
        console.log('SocketService init');
        this._io = new socket_io_1.Server({
            cors: {
                origin: "http://localhost:5173",
                allowedHeaders: ["*"]
            }
        });
    }
    initListeners() {
        const io = this._io;
        console.log('initListeners');
        //when ever someone connects to the server- handling connection event
        io.on('connection', (socket) => {
            console.log('user connected', socket.id);
            const handleMessage = (data) => __awaiter(this, void 0, void 0, function* () {
                const { message, roomId } = data;
                // io.to(roomId).emit('message', message);
                console.log("message sent to user", message, roomId);
                io.to(roomId).emit('event:message', {
                    from: socket.id,
                    message
                });
            });
            socket.on('joinRoom', function (room) {
                socket.join(room);
                console.log('user joined room', room);
            });
            //whenever there's a new message - emit message to server (one side communication)
            socket.on('event:message', (data) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield handleMessage(data);
                }
                catch (error) {
                    console.error("Error handling message:", error);
                }
            }));
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
