const task = require('../model/task');

module.exports = {
  index: (req, res, next) => {
    task.fetchAll().then(rows => {
      return res.json({'items': rows});
    }).catch(next);
  },
  delete: (req, res, next) => {
    task.delete(req.params.id).then(result => {
      if (result === 1)
        return res.status(204).json();
      else
        return res.status(404).json();
    }).catch(next);
  },
};