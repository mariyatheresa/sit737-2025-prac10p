const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the SIT737 Monitoring App Task-10.1P!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
