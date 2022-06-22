import { tagRepository } from "../repositories/tagsRepository.js";
import urlMetadata from "url-metadata";


export async function getTagPosts(req, res) {
  const { hashtag } = req.params;
  try {
    const result = await tagRepository.getPosts(hashtag);
    if (result.rowCount === 0) {
      return res.send("There are no posts yet").status(200);
    }
    const posts = [...result.rows];
    for (let i = 0; i < result.rows.length; i++) {
      const metadata = await urlMetadata(posts[i].url);
      posts[i] = {
        ...posts[i],
        metadata: {
          title: metadata.title,
          image: metadata.image,
          description: metadata.description
        }
      };
    }
    return res.status(200).send(posts);
  } catch (e) {
    return res.send("An error occurred. Please, try again later").status(500);
  }
}