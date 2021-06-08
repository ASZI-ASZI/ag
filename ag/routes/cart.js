const express = require('express');
const pool = require('../pool.js');

var router = express.Router();
//1.添加购物车
router.post('/add', (req, res) => {
    var obj = req.body;

    let uid = req.session.loginUid;
    let lid = obj.lid;
    var buyCount = obj.buyCount;
    if (!obj.lid) {
        res.send({ code: 401, msg: 'lid required' });
        return;
    }
    if (!obj.buyCount) {
        res.send({ code: 402, msg: 'buyCount required' });
        return;
    }
    if (!uid) {
        req.session.pageToJump = 'cart.html';
        req.session.toBuyLid = obj.lid;
        req.session.toBuyCount = obj.buyCount;
        res.send({ code: 300, msg: 'login required' });
        return;
    }
    var sql = `SELECT iid FROM ag_shopping_cart WHERE user_id=? AND product_id=?`;
    pool.query(sql, [uid, lid], (err, result) => {
        if (err) throw err;
        var sql2;
        if (result.length > 0) {
            sql2 = `UPDATE ag_shopping_cart SET count=count+${buyCount} WHERE user_id=${uid} AND product_id=${lid}`;

        } else {
            sql2 = `INSERT INTO ag_shopping_cart VALUES(NULL, ${uid}, ${lid}, ${buyCount}, false)`;
        }
        pool.query(sql2, (err, result2) => {
            if (err) throw err;
            if (result2.affectedRows > 0) {
                res.send({ code: 200, msg: 'add suc' });
            } else {
                res.send({ code: 500, msg: 'add err' });
            }
        });
    });
});
//2.购物车列表
router.get('/list', (req, res) => {
    var output = {};
    if (!req.session.loginUid) {
        req.session.pageToJump = 'cart.html';
        res.send({ code: 300, msg: 'login required' });
        return;
    }
    let user = { id: req.session.loginUid};
    var sql = `SELECT a.iid,a.product_id as lid ,b.title,b.spec, b.price,a.count,'' as pic
    FROM ag_shopping_cart a INNER JOIN ag_electrical_equipment b ON a.product_id = b.lid
    WHERE a.user_id = ? `;
    pool.query(sql, [user.id], (err, result) => {
        if (err) throw err;
        output.code = 200;
        output.data = result;
        for (var i = 0; i < output.data.length; i++) {
            var lid = output.data[i].lid;
            (function (lid, i) {
                pool.query('SELECT md FROM ag_electrical_equipment_pic WHERE electrical_equipment_id=? LIMIT 1', [lid], (err, result) => {
                    console.log(result);
                    output.data[i].pic = result[0].md;
                });
            })(lid, i);
        }
        setTimeout(() => {
            res.send(output);
        }, 100);
    });
});
//3.删除购物车
router.get('/del', (req, res) => {
    let obj = req.query;
    
    if (!obj.iid) {
        res.send({ code: 401, msg: 'iid required' });
        return;
    }
    if (!req.session.loginUid) {
        res.send({ code: 300, msg: 'login required' });
        return;
    }
    let sql=`DELETE FROM ag_shopping_cart WHERE iid in (${obj.iid})`;
    pool.query(sql, (err, result) => {
        if (err) {
            res.send({
              code: 201,
              msg: `delete failed, err: ${err}`,
            }); //throw err;
            return;
          }

        //数据库操作影响的记录行数
        if (result.affectedRows > 0) {
            res.send({ code: 200, msg: 'delete succ' });
        } else {
            res.send({ code: 500, msg: 'delete err' });
        }
    });
});


module.exports = router;