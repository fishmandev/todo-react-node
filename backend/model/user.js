const mysql = require('../mysql');

module.exports = {
  /**
   * Retrieves user by username field
   * 
   * @param field 
   * @param value 
   * @returns user object || null
   */
  getUserByUsername: (username) => {
    return mysql.getSession().then(session => {
      const userTable = session.getDefaultSchema().getTable('user');

      return userTable
        .select()
        .where('username=:username')
        .bind('username', username)
        .execute()
        .then(result => {
          session.close();
          let user = result.fetchOne();
          if (user) {
            return {
              'id': user[0],
              'username': user[1],
              'password': user[2]
            }
          }
          return null;        
        });
    });
  },
};