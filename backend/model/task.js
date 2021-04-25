const mysql = require('../mysql');

module.exports = {
  fetchAll: () => {
    return mysql.getSession().then(session => {
      const taskTable = session.getDefaultSchema().getTable('task');

      return taskTable.select().execute().then(result => {
        session.close();
        return result.fetchAll().map(value => (
            {'id': value[0], 'name': value[1]}
        ));
      });
    });
  },
};