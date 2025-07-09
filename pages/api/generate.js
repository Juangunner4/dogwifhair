export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt' });
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `profile picture with ${prompt}`,
        n: 1,
        size: '256x256',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      res.status(response.status).json({ error });
      return;
    }

    const data = await response.json();
    const url = data.data && data.data[0] ? data.data[0].url : null;
    res.status(200).json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
