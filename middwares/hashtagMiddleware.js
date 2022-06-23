import {insertHashtag, verifyHashtag} from "../repositories/hashtagRepository.js";

export async function addHashtags(req, res, next){
    const {url, message} = req.body;
    
    try {
        const hashtagsArr = [];
        if(message.length > 0) {
            const auxArr = message.split(" ");
            const auxFilter = auxArr.filter((item) => item.includes("#"));

            for(let i = 0; i < auxFilter.length; i++){
                let item = auxFilter[i];
                const nameHashtag = auxFilter[i].slice(-(item.length - 1));
                const verify = await verifyHashtag(nameHashtag);
                if(verify.rowCount === 0){
                    await insertHashtag(nameHashtag); 
                    const newHashtag = await verifyHashtag(nameHashtag);
                    hashtagsArr.push(newHashtag.rows[0].id);
                    res.locals.hashtags = [...hashtagsArr];
                } else {
                    hashtagsArr.push(verify.rows[0].id);
                    res.locals.hashtags = [...hashtagsArr];
                }
            }
            res.locals.hashtags = [...hashtagsArr];
        }
        res.status(200); 
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
    next();
}