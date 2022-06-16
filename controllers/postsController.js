import {createPost, findPostId} from "../repositories/postRepository.js";
import { addPostHashtags } from "../repositories/postHashRepository.js";

export async function addPost(req, res){
    console.log("passeiii")
    const {userId} = res.locals.session;
    const {hashtags} = res.locals;
    const {url, message} = req.body;

    try {
        await createPost(url, message, userId);   

        for(let i = 0; i < hashtags.length; i++){
            let hashtagId = hashtags[i];
            const postsUserList = await findPostId(userId);
            let postId = postsUserList.rows[0].id; 
            await addPostHashtags(postId, hashtagId);
        }
        
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
}

