import { Server } from "socket.io"

import Redis from 'ioredis'

const { REDIS_URI } = process.env

const pub = new Redis(REDIS_URI as string)
pub.on('error', (err: string) => {
    throw new Error(err)
})


const sub = new Redis(REDIS_URI as string)

sub.on('error', (err: string) => {
    throw new Error(err)
})

class SocketService {
    //instance variable of class of type Server
    private _io: Server

    constructor() {
        console.log('SocketService init')
        this._io = new Server({
            cors: {
                origin: "http://localhost:5173",
                allowedHeaders: ["*"]
            }
        })
    }

    public initListeners() {
        const io = this._io

        console.log('initListeners')

        //when ever someone connects to the server- handling connection event
        io.on('connection', (socket) => {
            console.log('user connected', socket.id)

            const handleMessage = async (data: { message: string, roomId: string }) => {
                const { message, roomId } = data;
                // io.to(roomId).emit('message', message);
                    
                console.log("message sent to user",message,roomId)

                io.to(roomId).emit('event:message', {
                    from: socket.id,
                    message
                });
  
            };

            socket.on('joinRoom', function (room) {
                socket.join(room);
                console.log('user joined room', room) 

            })

            //whenever there's a new message - emit message to server (one side communication)
            socket.on('event:message', async (data) => { //destructuring message from the object
                try { 
                    await handleMessage(data);
                } catch (error) {
                    console.error("Error handling message:", error);
                }
            })
        })
    }

    get io() {
        return this._io
    }
}

export default SocketService