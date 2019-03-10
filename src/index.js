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

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`);
  }

  return res.redirect(`/minor?age=${age}`);
});

app.get('/major', (req, res) => {
  const { age } = req.query;

  return res.render('major', { age });
});

app.get('/minor', (req, res) => {
  const { age } = req.query;

  return res.render('minor', { age });
});

app.listen(3000);
