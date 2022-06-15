import db from "./../config/db.js";

async function insertHashtag(item){
    return db.query(`
        INSERT INTO hashtags(name) 
        VALUES($1)`, 
        [item]);
}

async function verifyHashtag(item){
    return db.query(`
        SELECT * FROM hashtags WHERE name=$1
    `, [item]);
}

const hashtagsRepository = {
    insertHashtag,
    verifyHashtag
}

export default hashtagsRepository;

