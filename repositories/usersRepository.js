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

export async function verifyEmail(email) {
    return await db.query(`
        SELECT * FROM users WHERE email = $1
    `, [email])
}

export async function createUser({ name, email, image }, passwordHash) {
    return await db.query(`
        INSERT INTO
            users(name, email, password, image)
        VALUES ($1, $2, $3, $4)
    `, [name, email, passwordHash, image]);
}

export async function getUserPosts(userId){
    return await db.query(`
        SELECT posts.*, users.name, users.image 
        FROM users
        JOIN posts ON posts."userId" = users.id
        WHERE posts."userId"=$1
    `, [userId])
}