/**
 * Created by zhangjc on 2017/6/19.
 */
var user = {
    insert: 'INSERT INTO user (id, username, email, password) VALUES (0, ?, ?, ?)',
    update: 'UPDATE user SET email=?, password=? WHERE id=?',
    delete: 'DELETE FROM user WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user',
    queryByUsername: 'SELECT * FROM user WHERE username=?'
};
module.exports = user;