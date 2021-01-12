const db = require('./db/connection');
const init = require('./menu');

db.connect(err => {
  if (err) throw err;
  init();
});
