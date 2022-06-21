import { getTrending } from "../repositories/trendingRepository.js";

export async function trendingController(req, res) {
  try {
    const { rows: trendingHashtags } = await getTrending();

    res.send(trendingHashtags);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}