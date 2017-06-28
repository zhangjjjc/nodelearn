/**
 * Created by zhangjc on 2017/6/19.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
// var $util = require('../util/util');
var $sql = require('../dao/userSqlMapping');

//使用连接池
// var pool = mysql.createPool($util.extend({}, $conf.mysql));
var pool = mysql.createPool($conf.mysql);

module.exports = {
    add: function (req, res) {
        pool.getConnection(function (err, connection) {
            var params = req.body || req.params;

            connection.query($sql.queryByUsername, params.username, function (err, results) {
                if (err){
                    res.sendStatus(500);
                    console.log(err);
                }else if (results[0]){
                    req.session.error = '当前用户名已存在';
                    res.sendStatus(404);
                }else {
                    connection.query($sql.insert, [params.username, params.email, params.password], function (err, result) {
                        if (err){
                            res.sendStatus(500);
                            console.log(err);
                        }else {
                            req.session.success = '用户注册成功';
                            res.sendStatus(200);
                        }
                    });
                }
                //释放连接
                connection.release();
            });
        });
    },

    login: function (req, res) {
        pool.getConnection(function (err, connection) {
            var params = req.body || req.params;

            connection.query($sql.queryByUsername, params.username, function (err, result) {
                if (err){
                    res.sendStatus(500);
                    console.log(err);
                }else if (!result[0]){
                    req.session.error = '用户名不存在';
                    res.sendStatus(404);
                }else {
                    if (result[0].password != params.password){
                        req.session.error = '密码错误';
                        res.sendStatus(404);
                    }else {
                        var userinfo = result[0];
                        delete userinfo['password'];
                        req.session.user = userinfo;
                        res.sendStatus(200);
                    }
                }

                connection.release();
            });
        });
    }
};