import { selectSession } from "../repositories/sessionsRespository.js";

export default async function validToken(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if(!token) return res.status(401).send("Token not found!");
    try{
        const session = await selectSession(token);
        if(!session) return res.status(401).send("You are logged off, please sign in first!");
        res.locals.session = session;
        next();
    } catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
    
}