import db from "../config/db.js";

export async function selectUserByEmail(email){
    const user = await db.query(`
        SELECT *
        FROM users
        WHERE email = $1;`,
        [email]
    );
    return user.rows[0];
}