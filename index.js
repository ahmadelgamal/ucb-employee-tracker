const db = require('./db/database');
const init = require('./questions');

db.connect(err => {
  if (err) throw err;
  init();
});
