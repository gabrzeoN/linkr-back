import hashtagsRepository from "../repositories/hashtagRepository.js";

export async function addHashtags(req, res, next){
    const {url, message} = req.body;
    try {
        if(message.length > 0) {
            if(message.includes("#") === false) return res.sendStatus(200);
            const idx = message.indexOf("#");
            const aux = message.slice(idx);
            const auxString = aux.split("#");
            auxString.forEach((item) => {
                if(item.length !== 0){
                    console.log(item);
                    const verify = hashtagsRepository.verifyHashtag(item);
                    if(verify.rowCount === 0){
                        hashtagsRepository.insertHashtag(item); 
                        const newHashtag = hashtagsRepository.verifyHashtag(item);
                            res.locals.hashtags= newHashtag.rows[0].id;
                            console.log(res.locals);
                    } else {
                        res.locals.hashtags = verify.rows[0].id;
                        console.log(res.locals);
                    }
                }
            });
        } else {
            console.log(message);
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
    next();
}