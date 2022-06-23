import { selectFollow, insertNewFollow, deleteFollow } from "../repositories/followersRepository.js";
import { selectUserById } from "../repositories/usersRepository.js";

export async function followUnfollowUser(req, res){
    let {userId: followerId} = res.locals.session;
    let {userId: followedId} = req.params;
    followerId = parseInt(followerId);
    followedId = parseInt(followedId);
    try{
        if(followerId === followedId) return res.status(406).send("You cannot follow yourself!");
        const user = await selectUserById(followedId);
        if(!user) return res.status(404).send("This user no longer exists!");
        const following = await selectFollow(followerId, followedId);
        let followedByMe = null;
        if(!following){
            await insertNewFollow(followerId, followedId);
            followedByMe = true;
        }else{
            await deleteFollow(followerId, followedId);
            followedByMe = false;
        }
        return res.status(200).send({followedByMe});
    }catch(error){
        console.log(error.message);
        return res.sendStatus(500);
    }
}

export async function checkFollowingStatus(req, res){
    let {userId: followerId} = res.locals.session;
    let {userId: followedId} = req.params;
    followerId = parseInt(followerId);
    followedId = parseInt(followedId);
    try{
        if(followerId === followedId) return res.status(200).send({isMe: true});
        const user = await selectUserById(followedId);
        if(!user) return res.status(404).send("This user no longer exists!");
        const following = await selectFollow(followerId, followedId);
        let followedByMe = null;
        if(following){
            followedByMe = true;
        }else{
            followedByMe = false;
        }
        return res.status(200).send({followedByMe, isMe: false});
    }catch(error){
        console.log(error.message);
        return res.sendStatus(500);
    }
}