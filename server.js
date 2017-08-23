const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.locals.title = 'BYOB';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api', router);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
