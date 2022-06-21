import { trending } from "../repositories/trendingRepository.js";

export async function getTrending(req, res) {
  try {
    const { rows: trendingHashtags } = await trending.getTrending();

    res.send(trendingHashtags);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}