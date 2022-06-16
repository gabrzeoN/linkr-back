import postRepository from "../repositories/postRepository.js";
//import hashtagsRepository from "../repositories/hashtagRepository.js";

export async function addPost(req, res){
    console.log("passeiii")
    const {userId} = res.locals.session;
    console.log("userId", res.locals.session);

    const {hashtags} = res.locals;
    console.log("hashtagId", hashtags);

    const {url, message} = req.body;

    try {
        // await postRepository.createPost(url, message, userId);   

        // const postsUserList = postRepository.findPostId(userId);
        
    
        
        //falta criar a tabela de postshashtags!!!
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
}

