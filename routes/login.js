/**
 * Created by zhangjc on 2017/6/16.
 */
var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

router.get('/', function (req, res, next) {
    res.render('login', {title : '登录'});
});

router.post('/', function (req, res, next) {
    userDao.login(req, res, next);
});

module.exports = router;