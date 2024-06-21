import express, {Request, Response} from "express";
import { middleware } from "./middlewares/middleware";
import client from "prom-client";
import { requestCountMiddleWare } from "./metrics";
import { activeRequestGaugeMiddleWare } from "./metrics/activeRequests";

const app = express();

app.use(express.json());
app.use(activeRequestGaugeMiddleWare);

app.get("/user", async(req: Request,res: Response)=>{
    await new Promise((resolve) => setTimeout(resolve, 5000));
    res.status(200).json({
        name:"swata swayam dash",
        age: 21
    })
})

app.post("/user", async(req:Request, res:Response) => {
    const user = req.body.user;
    await new Promise((resolve) => setTimeout(resolve, 5000));
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