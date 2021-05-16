const mysql = require('../mysql');

const getSessionTable = async () => {
  let session = await mysql.getSession();
  let table = session.getDefaultSchema().getTable('task');

  return { session, table };
}

module.exports = {
  fetchAll: async () => {
    let { session, table } = await getSessionTable();
    let result = await table.select().execute();
    session.close();

    return result.fetchAll().map(value => (
      { 'id': value[0], 'name': value[1] }
    ));
  },
  delete: async (id) => {
    let { session, table } = await getSessionTable();
    let result = await table.delete().where('id=:id').bind('id', parseInt(id)).execute();
    session.close();

    return result.getAffectedItemsCount();
  },
  create: async (name) => {
    let { session, table } = await getSessionTable();
    let result = await table.insert(['name']).values(name).execute();
    session.close();

    return result.getAutoIncrementValue();
  }
};