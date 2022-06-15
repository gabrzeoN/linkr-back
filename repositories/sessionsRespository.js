import db from "../config/db.js";

export async function insertNewSession(userId, token){
    return await db.query(`INSERT INTO
        sessions("userId", token)
        VALUES ($1, $2);`,
        [userId, token]
    );
}

export async function selectSession(token){
    const session = await db.query(`
        SELECT *
        FROM sessions
        WHERE token = $1 AND status = true;`,
        [token]
    );
    return session.rows[0];
}

export async function invalidateSession(token){
    await db.query(`
        UPDATE sessions
        SET status = false
        WHERE token = $1 AND status = true;`,
        [token]
    );
    return;
}