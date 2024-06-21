import express, {Request, Response} from "express";
import { middleware } from "./middlewares/middleware";

const app = express();

app.use(express.json());
app.use(middleware);

app.get("/user", (req: Request,res: Response)=>{
    res.status(200).send({
        name:"swata swayam dash",
        age: 21
    })
})

app.post("/user", (req:Request, res:Response) => {
    const user = req.body.user;
    res.status(200).send({
        ...user,
        id:1
    })
})

app.listen(3000, ()=>{
    console.log('server is listening on port 3000');
})