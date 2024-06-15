import dotenv from 'dotenv';
dotenv.config();
import express, { urlencoded } from "express";
import session from "express-session";
import flash from "connect-flash";
import expressEjsLayouts from 'express-ejs-layouts';
import path from "path";
import setFlash from "./middlewares/customFlash.js";
import homeRouter from "./routes/home.js";
import csvRouter from "./routes/csv.js";

const app = express();

//to create sessions
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false }
}));

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(express.static(path.resolve("public")));
app.use(express.static(path.resolve("public", "css")));

// set up view engine
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

//extract styles and scripts from layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//using connect-flash to display flash notification in FE
app.use(flash());
app.use(setFlash);

// configure routes
app.use("/", homeRouter);
app.use("/file", csvRouter);

export default app;