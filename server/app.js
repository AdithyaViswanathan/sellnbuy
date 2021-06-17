const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1', require('./api/v1'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _) => {
  const message = err.message || 'Internal Server Error';

  if (res.statusCode === 200) {
    res.status(500);
  }

  return res.json({
    ok: false,
    message,
  });
});

module.exports = app;
