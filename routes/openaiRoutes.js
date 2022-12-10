const router = require("express").Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/generateImage", async function handler(req, res) {
  const { prompt, size } = req.body;

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const openaiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = openaiResponse.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.error(error.message);
    }

    res.status(400).json({
      success: false,
      error: "Image can't be generated",
    });
  }
});

module.exports = router;
