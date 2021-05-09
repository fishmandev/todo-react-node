const mysql = require('../mysql');

const getSessionTable = async () => {
  let session = await mysql.getSession();
  let table = session.getDefaultSchema().getTable('refreshToken');

  return { session, table };
}

module.exports = {
  delete: async (id) => {
    let { session, table } = await getSessionTable();
    let result = await table.delete().where('id=:id').bind('id', parseInt(id)).execute();
    session.close();

    return result.getAffectedItemsCount();
  },
  create: async (userId, createdAt) => {
    let { session, table } = await getSessionTable();
    let result = await table.insert(['user_id', 'created_at']).values(userId, createdAt).execute();
    session.close();

    return result.getAutoIncrementValue();
  }
};