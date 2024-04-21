import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";

import connectToDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5010;

connectToDb();

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running at port: ${port}`));
