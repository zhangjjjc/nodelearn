/**
 * Created by zhangjc on 2017/6/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', {title : '登录', message : ''});
});

module.exports = router;