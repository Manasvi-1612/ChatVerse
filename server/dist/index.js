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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = __importDefault(require("./services/socket"));
const http_1 = require("http");
const db_1 = __importDefault(require("./services/db"));
<<<<<<< HEAD
=======

>>>>>>> 7f66f1c0d0b0c2f16704c4665a160e585e42d2b1
dotenv_1.default.config();
const app = (0, express_1.default)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
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
    app.use('/api', require('./routes/auth'));
    app.get("/", (req, res) => {
        res.send("HELLO TO THE SERVER!");
    });
    //socket init
    const server = (0, http_1.createServer)(app);
    const socketService = new socket_1.default();
    socketService.io.attach(server);
    socketService.initListeners();
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});
main()
    .catch((err) => {
    throw err;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.$disconnect();
}));
