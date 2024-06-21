import express, {Request, Response} from "express";
import { middleware } from "./middlewares/middleware";
import client from "prom-client";
import { requestCountMiddleWare } from "./metrics";

const app = express();

app.use(express.json());
//app.use(middleware);
app.use(requestCountMiddleWare);

app.get("/user", (req: Request,res: Response)=>{
    res.status(200).json({
        name:"swata swayam dash",
        age: 21
    })
})

app.post("/user", (req:Request, res:Response) => {
    const user = req.body.user;
    res.status(200).json({
        ...user,
        id:1
    })
})

app.get("/metrics", async(req,res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000, ()=>{
    console.log('server is listening on port 3000');
})