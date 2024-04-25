import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import AppError from "./utils/errorHandler";
import { NextFunction } from "express";
import { WebSocketServer } from "ws";
import { initializeSocket } from "./socket";
// import { initializeSocket } from "./socket";

dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();

const server = require("http").createServer(app);

const main = async () => {

    app.use(express.json());
    app.use(helmet());
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true,
        })
    );

    // GLOBAL ERROR HANDLER
    app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
        err.status = err.status || 'error';
        err.statusCode = err.statusCode || 500;

        console.log("Global error", err)

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    });

    app.use('/api', require('./routes/auth.route'))

    app.get("/", (req: Request, res: Response) => {
        res.send("HELLO TO THE SERVER!");
    });

    const port = process.env.PORT || 3000;

    const server = app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });


    const wsServer = new WebSocketServer({ server });
    initializeSocket(wsServer);
}

main()
    .catch((err) => {
        throw err;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });