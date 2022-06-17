import { selectLike, insertNewLike, deleteLike, countLikesByPost } from "../repositories/likesRepository.js";
import postRepository from "../repositories/postRepository.js";

export async function likeDislikePost(req, res){
    const {userId} = res.locals.session;
    const {postId} = req.params;
    try{
        const post = await postRepository.selectPostById(postId);
        if(!post) return res.status(404).send("This post no longer exists!");
        const like = await selectLike(userId, postId);
        if(!like){
            await insertNewLike(userId, postId);
        }else{
            await deleteLike(userId, postId);
        }
        
        const amountLikes = await countLikesByPost(postId);
        return res.status(200).send(amountLikes);
    }catch(e){
        console.log(error.message);
        return res.sendStatus(500);
    }
}