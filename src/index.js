import path from 'path';
import express from 'express';
import nunjucks from 'nunjucks';

import checkAge from '~/checkAge';

const app = express();

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  watch: true,
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');

const checkAgeQueryParamsMiddleware = (req, res, next) => {
  const { age } = req.query;
  const parsedAge = Number(age);

  if (!typeof parsedAge === 'number' || !Number.isFinite(parsedAge)) {
    return res.redirect('/');
  }

  return next();
};

app.get('/', (_req, res) => res.render('main'));

app.post('/check', (req, res) => {
  const { age } = req.body;

  if (checkAge) {
    return res.redirect(`/major?age=${age}`);
  }

  return res.redirect(`/minor?age=${age}`);
});

app.get('/major', checkAgeQueryParamsMiddleware, (req, res) => {
  const { age } = req.query;

  return res.render('major', { age });
});

app.get('/minor', checkAgeQueryParamsMiddleware, (req, res) => {
  const { age } = req.query;

  return res.render('minor', { age });
});

app.listen(process.env.PORT || 3000);
