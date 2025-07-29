const axios = require('axios');

exports.generateResponse = async (req, res) => {
  const { prompt } = req.body;

  try {
    // 1. Buat prediction baru
    const predictionResponse = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: 'ibm-granite/granite-3.3-8b-instruct',
        input: {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.2,
        },
      },
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const prediction = predictionResponse.data;
    let result = null;
    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed' &&
      prediction.status !== 'canceled'
    ) {
      const check = await axios.get(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });
      prediction.status = check.data.status;
      result = check.data.output;

      if (prediction.status === 'succeeded') break;

      await new Promise((r) => setTimeout(r, 1000));
    }

    if (prediction.status === 'succeeded') {
      const combinedOutput = Array.isArray(result) ? result.join('') : result;
      res.json({ output: combinedOutput });
    } else {
      res.status(500).json({ error: `Prediction ${prediction.status}` });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate response' });
  }
};
