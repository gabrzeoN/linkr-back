import { getPostById } from "../repositories/postRepository.js";
import { insertHashtag, verifyHashtag } from "../repositories/hashtagRepository.js";

export async function verifyPost(req, res, next){
    const {postId, userId, newMessage} = req.body;
    const {session} = res.locals;
    try {
        if(userId !== session.userId) return res.sendStatus(401);
        
        const post = await getPostById(postId);
        if(post.rowCount === 0) return res.status(404).send("not found");

        if(newMessage === post.rows[0].message) return res.status(200);

        const hashtagsArr = [];
        if(newMessage.length > 0) {
            const auxArr = newMessage.split(" ");
            const auxFilter = auxArr.filter((item) => item.includes("#"));
            console.log( "arr", auxFilter);

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
        return res.status(500).send("An error occurred. Please, try again later");
    }
    next();
}