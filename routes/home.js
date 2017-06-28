/**
 * Created by zhangjc on 2017/6/16.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req, res) {
    if (!req.session.user){
        req.session.error = '请先登录';
        res.redirect('/login');
    }
    res.render('home', {title : '主页'});
});

module.exports = router;