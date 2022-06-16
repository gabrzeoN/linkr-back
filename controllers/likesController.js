import { selectLike, insertNewLike, deleteLike } from "../repositories/likesRepository.js";

export async function likeDislikePost(req, res){
    const {userId} = res.locals.session;
    const {postId} = req.params;
    try{
        const like = await selectLike(userId, postId);
        if(!like){
            await insertNewLike(userId, postId);
            return res.sendStatus(201);
        }else{
            await deleteLike(userId, postId);
            return res.sendStatus(202);
        }
    }catch(e){
        console.log(error.message);
        return res.sendStatus(500);
    }
}