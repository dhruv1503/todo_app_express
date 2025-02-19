import express, { Request, Response } from "express"
import cors from 'cors'
import http from "http"
import { MongoClient } from "mongodb"
import { CONFIG } from "./config/index.js"
import userRouter from "./routes/user.route.js"
import { ROUTER_PREFIX } from "./constants/index.js"

const app = express()
const dbName = CONFIG.DB_NAME

app.use(cors({
    credentials: true
}));
app.use(express.json());

const server = http.createServer(app)

app.get("/", (request : Request, response : Response) => {
    response.status(200).json({message : "Welcome to Todo Application!"})
})

app.use(ROUTER_PREFIX.users, userRouter)

const client = new MongoClient(CONFIG.MONGO_URI);

  

server.listen(CONFIG.PORT, () => {
    try{
        console.log(`Server running at ${CONFIG.PORT}...`)
    }
    catch(error){
        console.log(error)
    }
})
 client.connect().then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));
