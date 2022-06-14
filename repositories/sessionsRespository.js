import db from "../config/db.js";

export async function insertNewSession(userId, token){
    return await db.query(`INSERT INTO
        sessions("userId", token)
        VALUES ($1, $2);`,
        [userId, token]
    );
}