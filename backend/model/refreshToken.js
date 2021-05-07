const mysql = require('../mysql');

module.exports = {
  delete: (id) => {
    return mysql.getSession().then(session => {
      const refreshTokenTable = session.getDefaultSchema().getTable('refreshToken');

      return refreshTokenTable
        .delete()
        .where('id=:id')
        .bind('id', parseInt(id))
        .execute()
        .then(result => {
          session.close();
          return result.getAffectedItemsCount();
      })
    });
  },
  create: (userId, createdAt) => {
    return mysql.getSession().then(session => {
      const refreshTokenTable = session.getDefaultSchema().getTable('refreshToken');

      return refreshTokenTable
        .insert(['user_id', 'created_at'])
        .values(userId, createdAt)
        .execute().then(result => {
          session.close();
          return result.getAutoIncrementValue();
      });
    });
  }
};