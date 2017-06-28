/**
 * Created by zhangjc on 2017/6/16.
 */
var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

router.get('/', function (request, response) {
    response.render('register', {title : '注册'});
});

router.post('/', function (request, response, next) {
    userDao.add(request, response, next);
});

module.exports = router;