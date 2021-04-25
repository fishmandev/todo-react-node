const task = require('../model/task');

module.exports = {
  index: (req, res, next) => {
    task.fetchAll().then(rows => {
      return res.json({'items': rows});
    }).catch(next);
  },
};