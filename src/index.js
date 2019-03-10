import express from 'express';
import nunjucks from 'nunjucks';

const app = express();

nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
  watch: true,
});

app.set('view engine', 'njk');

app.get('/', (_req, res) => res.render('main'));

app.listen(3000);
