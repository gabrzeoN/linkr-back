import db from "../config/db.js";

export async function insertNewPost (categoryId, url, message){
    return await db.query(`
    
    INSERT INTO posts("categoryId", url, message)
    VALUES ($1, $2, $3);

    `, [categoryId, url, message]);
}

/* export async function getPosts (){
    return await db.query(`
    
    SELECT * FROM posts

    `);

    return posts.rows;
} */