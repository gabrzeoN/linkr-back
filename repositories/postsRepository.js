import db from "../config/db.js";

export async function obtainPosts (){
    return await db.query(`
        SELECT
            usr.id AS "userId",
            usr.name,
            usr.image AS "image",
            pst.id,
            pst.url,
            pst.message,
            pst."createdAt"
        FROM posts pst
        JOIN users usr
            ON usr.id = pst."userId"
        ORDER BY "createdAt" DESC
        LIMIT 20;
    `);
} 

