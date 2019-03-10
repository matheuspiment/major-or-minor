import express from 'express';
import nunjucks from 'nunjucks';

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

app.set('view engine', 'njk');

app.listen(3000);
