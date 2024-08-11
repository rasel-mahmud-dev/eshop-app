import express from "express"
import cors from "cors";
import morgan from "morgan"
require("dotenv").config()

import routes from "src/routes"
import pool from "../database";


const app = express()

const whitelist = [
    process.env.FRONTEND,
    "http://localhost:3300",
    "http://192.168.121.203:3300",
    "http://192.168.115.57:5173",
    "http://192.168.16.57:5173",
    "http://localhost:3000",
    "https://rasel-portfolio.vercel.app",
    "https://rsl-redux-shop.netlify.app",
    "http://192.168.174.57:5173"
]
const corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json())
app.use("/public/", express.static("public"))
app.use("/static/", express.static("static"))


app.use(routes)

// Capture 500 errors
app.use((err, req, res, next) => {
    let message = "Internal error, Please try again"
    let status = 500

    if (err?.message && typeof err?.message === "string") {
        message = err.message
    } else if (err && typeof err === "string") {
        message = err
    }

    if (err?.status) {
        status = err.status
    }
    res.status(status).json({message: message})
})

// Capture 404 errors
app.use((req, res, next) => {
    res.status(404).send("API NOT FOUND");
})


async function init() {
    try {
        await pool.connect()
        console.log("Database Connected")
    } catch (ex) {
        console.log(ex?.message)
        console.log("db failed to connect to the database");
    }
}

init()

export default app