import db from "./../config/db.js";

export async function insertHashtag(nameHashtag){
    return await db.query(`
        INSERT INTO hashtags(name) 
        VALUES($1)`, 
        [nameHashtag]);
}

export async function verifyHashtag(nameHashtag){
    const hashtag = await db.query(`
        SELECT * FROM hashtags WHERE name=$1
        `, [nameHashtag]);
    return hashtag;
}