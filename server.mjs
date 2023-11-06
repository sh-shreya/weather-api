import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};

  for (const city of cities) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87d31b80eaaab4b56abba87962aaf9a9`);
    const data = await response.json();
    const temperature = data.main.temp;
    weatherData[city] = `${Math.round(temperature - 273.15)}°C`;
  }

  res.json({ weather: weatherData });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
