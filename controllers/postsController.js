import postRepository from "../repositories/postRepository.js";
//import hashtagsRepository from "../repositories/hashtagRepository.js";

export async function addPost(req, res){
    const {id} = 1; //pegar id do usuario pelo token
    const hashtagId = res.locals.hashtags;
    const {url, message} = req.body;
    try {
        await postRepository.createPost(url, message, id);   
        
        //falta criar a tabela de postshashtags!!!
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
}
