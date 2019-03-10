import express from 'express';
import nunjucks from 'nunjucks';

const app = express();

nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
  watch: true,
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');

app.get('/', (_req, res) => res.render('main'));

app.post('/check', (req, res) => {
  const { age } = req.body;

  if (age > 18) {
    res.redirect(`/major?age=${age}`);
  }

  res.redirect(`/minor?age=${age}`);
});

app.get('/major', (req, res) => {
  const { age } = req.query;

  res.render('major', { age });
});

app.listen(3000);
