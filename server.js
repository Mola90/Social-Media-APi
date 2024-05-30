const express = require("express");
const db = require('./config/connection');
const routes = require('./routes');




const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).send({ message: 'Invalid JSON' });
  }
  next();
});

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`running on port ${PORT}!`);
  });
});
