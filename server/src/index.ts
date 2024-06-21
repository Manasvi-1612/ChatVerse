import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import AppError from "./utils/errorHandler";
import { NextFunction } from "express";
import cookieParser from 'cookie-parser';
import SocketService from "./services/socket";
import { createServer } from "http";
import prisma from './services/db'

dotenv.config();

const app: Express = express();

const main = async () => {

    app.use(express.json());
    app.use(helmet());

    app.use(cookieParser())

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

    app.use('/api', require('./routes/auth'))

    app.get("/", (req: Request, res: Response) => {
        res.send("HELLO TO THE SERVER!");
    });


    //socket init
    const server = createServer(app);
    const socketService = new SocketService()

    socketService.io.attach(server)
    socketService.initListeners()


    const port = process.env.PORT || 3000;

    server.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });




}

main()
    .catch((err) => {
        throw err;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
