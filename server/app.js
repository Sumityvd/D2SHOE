import express from "express";
import { PrismaClient } from "@prisma/client"; // Imported PrismaClient
import { config } from "dotenv";
import userrouter from "./routes/user.js";
import productrouter from "./routes/products.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import cartrouter from './routes/cart.js';
import wishlistrouter from "./routes/wishlist.js";
export const app = express();


config();

export const prisma = new PrismaClient(); // Initialized PrismaClient

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userrouter);
app.use("/api/products", productrouter);
app.use("/api/cart", cartrouter);
app.use("/api/user",wishlistrouter);