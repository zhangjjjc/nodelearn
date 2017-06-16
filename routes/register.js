/**
 * Created by zhangjc on 2017/6/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    response.render('register', {title : '注册', message : ''});
});

router.post('/', function (request, response) {

});

module.exports = router;