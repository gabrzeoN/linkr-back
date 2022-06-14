import bcrypt from 'bcrypt'
import { createUser, verifyEmail } from '../Repositories/authRepository.js'

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