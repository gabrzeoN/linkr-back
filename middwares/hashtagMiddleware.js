import { response } from "express";
import {insertHashtag, verifyHashtag} from "../repositories/hashtagRepository.js";

export async function addHashtags(req, res, next){
    const {url, message} = req.body;
    const hashtagsArr = [];
    console.log("message", message);
    try {
        if(message.length > 0) {
            const auxArr = message.split(" ");
            const auxFilter = auxArr.filter((item) => item.includes("#"));
            //console.log( "arr", auxFilter);

            auxFilter.forEach((element) => {
                const nameHashtag = element.slice(-(element.length - 1));
                //console.log(nameHashtag);
                const verify = verifyHashtag(nameHashtag);
                    verify.then((response) => {
                        //console.log(response);
                        if(response.rowCount === 0){
                            insertHashtag(nameHashtag); 
                            const newHashtag = verifyHashtag(nameHashtag);
                                newHashtag.then((dataHashtag) => hashtagsArr.push(dataHashtag.rows[0].id));
                            res.locals.hashtags = [...hashtagsArr];
                        } else {
                            hashtagsArr.push(response.rows[0].id);
                            res.locals.hashtags = [...hashtagsArr];
                            console.log(res.locals.hashtags);
                        }
                    })
            }); 
        } 
        
        res.status(200); 
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
    next();
}