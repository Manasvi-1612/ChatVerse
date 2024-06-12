import { Server } from "socket.io"

class SocketService {
    //instance variable of class of type Server
    private _io: Server

    constructor() {
        console.log('SocketService init')
        this._io = new Server({
            cors: {
                origin: "*",
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

            //whenever there's a new message 
            socket.on('event:message', async (message: string) => { //destructuring message from the object
                console.log('message', message)
                // io.emit('event:message', { message })
            })
        })
    }

    get io() {
        return this._io
    }
}

export default SocketService