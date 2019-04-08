var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//查找数据
router.get('/getdata', function(req, res, next) {
    const { skip, limit } = req.query;
    mongo.find('test', 'yuekao', function(rs) {
        let total = Math.ceil(rs.length / limit);
        mongo.find('test', 'yuekao', function(result) {
            if (!result) {
                res.send({ code: 0, msg: 'error' })
            } else {
                res.send({ code: 1, data: result, total: total })
            }
        }, {
            skip: skip * 1 - 1,
            limit: limit * 1
        })
    })

});
//添加数据
router.get('/adddata', function(req, res, next) {
    //  const { data } = req.body;
    console.log(req.body)
    mongo.insert('test', 'yuekao', req.query, function(result) {
        if (!result) {
            res.send({ code: 0, msg: 'error' })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});
module.exports = router;