import { selectLike, selectAllLikesButMine, insertNewLike, deleteLike } from "../repositories/likesRepository.js";
import { selectPostById } from "../repositories/postRepository.js";

export async function likeDislikePost(req, res){
    const {userId} = res.locals.session;
    const {postId} = req.params;
    try{
        const post = await selectPostById(postId);
        if(!post) return res.status(404).send("This post no longer exists!");
        const like = await selectLike(userId, postId);
        let likedByMe = null;
        if(!like){
            await insertNewLike(userId, postId);
            likedByMe = true;
        }else{
            await deleteLike(userId, postId);
            likedByMe = false;
        }
        const allLikesButMine = await selectAllLikesButMine(postId, userId);
        const allLikesName = []
        allLikesButMine.forEach( like => allLikesName.push(like.name))
        let likesAmount = allLikesButMine.length;
        if(likedByMe) likesAmount++;
        return res.status(200).send({likesAmount, likedByMe, allLikesName});
    }catch(error){
        console.log(error.message);
        return res.sendStatus(500);
    }
}

export async function checkLikeStatus(req, res){
    const {userId} = res.locals.session;
    const {postId} = req.params;
    try{
        const post = await selectPostById(postId);
        if(!post) return res.status(404).send("This post no longer exists!");
        const like = await selectLike(userId, postId);
        let likedByMe = null;
        if(like) likedByMe = true;
        else likedByMe = false;
        const allLikesButMine = await selectAllLikesButMine(postId, userId);
        const allLikesName = []
        allLikesButMine.forEach( like => allLikesName.push(like.name))
        let likesAmount = allLikesButMine.length;
        if(likedByMe) likesAmount++;
        return res.status(200).send({likesAmount, likedByMe, allLikesName});
    }catch(error){
        console.log(error.message);
        return res.sendStatus(500);
    }
}