/**
 * Created by zhangjc on 2017/6/20.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req, res) {
    req.session.user = null;
    req.session.error = null;
    res.redirect('/');
});

module.exports = router;