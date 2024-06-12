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
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketService {
    constructor() {
        console.log('SocketService init');
        this._io = new socket_io_1.Server({
            cors: {
                origin: "*",
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
            //whenever there's a new message 
            socket.on('event:message', (message) => __awaiter(this, void 0, void 0, function* () {
                console.log('message', message);
                // io.emit('event:message', { message })
            }));
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
