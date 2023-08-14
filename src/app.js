import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import genderRoutes from "./modules/gender/routes/genderRoutes.js";
import userRoutes from "./modules/user/routes/userRoutes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(morgan("dev"));
//app.use(cors)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", genderRoutes);
app.use("/api", userRoutes);

export default app;
