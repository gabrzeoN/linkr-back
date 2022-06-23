import db from "../config/db.js";

export async function createComment(text, postId, userId) {
    return await db.query(`
        INSERT INTO
            comments(text, "postId", "userId")
        VALUES ($1, $2, $3)
    `, [text, postId, userId]);
}
export async function listComments(id) {
    const { rows: comments } = await db.query(`
        SELECT 
            c.*, u.name AS username, u.image AS image
            FROM
            comments c
            JOIN
            users u ON u.id= c."userId"
        WHERE
            "postId"=$1
    `, [parseInt(id)]);
    return comments
}

export async function numberComments(id) {
    const { rowCount: comments } = await db.query(`
        SELECT 
            u.name AS username, u.image AS image,
            c.*
            FROM
            comments c
            JOIN
            users u ON c."userId"= u.id
        WHERE
            "postId"=$1
    `, [id])
    return comments
}

export async function deletePostComments(postId) {
    return db.query(`
        DELETE FROM
            comments
        WHERE
            "postId" = $1
    `, [postId]);
}


