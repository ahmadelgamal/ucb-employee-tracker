const db = require('./db/database');
const init = require('./menu');

db.connect(err => {
  if (err) throw err;
  init();
});
