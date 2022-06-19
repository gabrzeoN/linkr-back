import bcrypt from "bcrypt";
import db from "../config/db.js";
import { v4 as uuid} from "uuid";
import { insertNewSession, invalidateSession } from "../repositories/sessionsRespository.js";
import { selectUserByEmail, createUser, verifyEmail } from "../repositories/usersRepository.js";

export async function signIn(req, res){
    const { email, password } = req.body;
    try{
        const user = await selectUserByEmail(email);
        if(!user)return res.status(401).send("Email and password doesn't match!");
        const correctPassword = await bcrypt.compare(password, user.password);
        if(!correctPassword) return res.status(401).send("Email and password doesn't match!");
        const token = uuid();
        await insertNewSession(user.id, token);
        delete user.createdAt;
        delete user.password;
        return res.status(200).send({...user, token});
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function signUp(req, res) {
    const user = req.body;
    try {
      const { rows: [existingEmail] } = await verifyEmail(user.email)
      if (existingEmail) {
        return res.sendStatus(409);
      }
      const passwordHash = bcrypt.hashSync(user.password, 10);
      await createUser(user, passwordHash);
      return res.sendStatus(201);
    } catch (error) {
      console.log(error.message)
      return res.sendStatus(500);
    }
  }

  export async function signOut(req, res){
    const {token} = res.locals.session;
    try{
      await invalidateSession(token);
      return res.sendStatus(200);
    }catch(e){
      console.log(error.message)
      return res.sendStatus(500);
    }
}

export async function getUserFromSearch(req, res) {
    
  const {name} = req.query;
  const params = [];
  let whereClause = "";

  if (name && name.length >= 3) {
      params.push(`${name}%`);
      whereClause = `WHERE users.name ILIKE $${params.length}`;
  }

  try {
    const result = await db.query(`
      SELECT users.*
      FROM users
      ${whereClause};
    `, params);
      res.status(200).send(result.rows);
  } catch (e) {
      res.sendStatus(500);
  }

}