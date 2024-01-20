// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/repos/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const perPage = req.query.perPage || 10;
    const page = req.query.page || 1;
    const searchQuery = req.query.search || '';

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          per_page: perPage,
          page: page,
          q: searchQuery,
        },
      }
    );

    const repos = response.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      topics: repo.topics,
    }));

    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
