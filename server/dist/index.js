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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const ws_1 = require("ws");
const socket_1 = require("./socket");
// import { initializeSocket } from "./socket";
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = require("http").createServer(app);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: "http://localhost:5173",
        credentials: true,
    }));
    // GLOBAL ERROR HANDLER
    app.use((err, req, res, next) => {
        err.status = err.status || 'error';
        err.statusCode = err.statusCode || 500;
        console.log("Global error", err);
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    });
    app.use('/api', require('./routes/auth.route'));
    app.get("/", (req, res) => {
        res.send("HELLO TO THE SERVER!");
    });
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    const wsServer = new ws_1.WebSocketServer({ server });
    (0, socket_1.initializeSocket)(wsServer);
});
main()
    .catch((err) => {
    throw err;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));