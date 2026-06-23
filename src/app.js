import express from "express";
import cors from "cors";
import { SET_LIMIT } from "./utils/constant.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({
    limit: SET_LIMIT
}))
app.use(express.urlencoded({
    limit: SET_LIMIT,
    extended: true
}))
app.use(express.static("public"));
app.use(cors({
    origin: process.env.ORIGIN?.split(",") || "https://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use(cookieParser());

app.use("/api/v1/users", authRouter);

export default app;