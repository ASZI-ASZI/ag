//用户路由器，包含很多用户相关的路由
const express = require('express');
//引入连接池模块
const pool = require('../pool.js');

//创建路由器对象，
let router = express.Router();
//挂载路由
//1.注册用户， post    /reg

router.post('/reg', (req, res) => {
    //获取表单数据
    let obj = req.body;
    //验证各项数据是否为空
    if (!obj.uname) {
        res.send({ code: 401, msg: '用户名为空' });
        //阻止往下执行
        return;
    }
    if (!obj.upwd) {
        res.send({ code: 402, msg: '密码为空' });
        //阻止往下执行
        return;
    }
    if (!obj.email) {
        res.send({ code: 403, msg: '邮箱为空' });
        //阻止往下执行
        return;
    }
    if (!obj.phone) {
        res.send({ code: 404, msg: '手机为空' });
        //阻止往下执行
        return;
    }
    pool.query('INSERT INTO ag_user SET ?', [obj], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows > 0) {
            res.send({ code: 200, msg: '注册成功' });
        } else {
            res.send({ code: 301, msg: '注册失败' });
        }
    });

});

//2.用户登录  post  /login
router.post('/login', (req, res) => {
    //获取表单数据
    let obj = req.body;
    //验证表单数据是否为空

    if (!obj.uname) {
        res.send({ code: 401, msg: '用户名为空' });
        // console.log(obj.uname);
        //阻止往下执行
        return;
    }
    if (!obj.upwd) {
        res.send({ code: 402, msg: '密码为空' });
        //阻止往下执行
        return;
    }

    //执行SQL语句
    pool.query('SELECT * FROM ag_user WHERE uname=? AND upwd=?', [obj.uname, obj.upwd], (err, result) => {
        if (err) throw err;
        //返回的数组，如果查到相应的用户，数组中就会出现这数据，否则没查找到，返回空数组，登录失败。
        if (result.length > 0) {
            req.session.loginUname = obj.uname;
            req.session.loginUid = result[0].uid;
            console.log(req.session);
            res.send({ code: 200, msg: '登录成功' });
        } else {
            res.send({ code: 301, msg: '登录失败' });
        }
    });
});
//3.用户检索  get  /detail
router.get('/detail', (req, res) => {
    //获取数据
    let obj = req.query;
    console.log(obj);
    //验证是否为空
    if (!obj.uid) {
        res.send({ code: 401, msg: '编号为空' });
        //阻止往下执行
        return;
    }
    //执行SQL语句
    pool.query('SELECT * FROM ag_user WHERE uid=?', [obj.uid], (err, result) => {
        if (err) throw err;
        console.log(result);
        //返回的数组，如果数组长度大于0，则检索到该用户，否则检索不到。
        if (result.length > 0) {
            res.send({
                code: 200,
                msg: '用户检索成功',
                data: result[0]
            });
        } else {
            res.send({ code: 301, msg: '检索失败' });
        }
    });
});
//修改用户信息  get    /update
router.get('/update', (req, res) => {
    //获取数据
    let obj = req.query;
    console.log(obj);
    //验证数据是否为空, 遍历对象，访问每个属性，如果属性值为空，提示属性名那一项是必须的
    let i = 400;
    for (let key in obj) {
        i++;
        console.log(key, obj[key]);   //key属性名，obj[key]属性值
        if (!obj[key]) {
            res.send({ code: i, msg: key + '为空' });
        }
    }
    //执行SQL语句
    pool.query('UPDATE ag_user SET ? WHERE uid=?', [obj, obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 200, msg: '修改成功' });
        } else {
            res.send({ code: 301, msg: '修改失败' });
        }
    });
});

//用户列表  get /list
router.get('/list', (req, res) => {
    //获取数据
    let obj = req.query;
    console.log(obj);
    //验证是否为空 用默认值来实现
    if (!obj.pno) obj.pno = 1;
    if (!obj.count) obj.count = 2;
    //将count转为整形
    obj.count = parseInt(obj.count);
    //计算 start
    let start = (obj.pno - 1) * obj.count;
    //执行查询
    pool.query('SELECT * FROM ag_user limit ?,?', [start, obj.count], (err, result) => {
        if (err) throw err;
        console.log(result);
        //返回的数组，如果数组长度大于0，则查询到用户，否则查询不到。
        if (result.length > 0) {
            res.send({
                code: 200,
                msg: '用户查询成功',
                data: result
            });
        } else {
            res.send({ code: 301, msg: '用户查询失败' });
        }
    });


});
//6.删除用户
router.get('/delete', (req, res) => {
    //获取数据
    let obj = req.query;
    console.log(obj);
    // 验证是否为空
    if (!obj.uid) {
        res.send({ code: 401, msg: '编号为空' });
        //阻止往下执行
        return;
    }
    // 执行sql语句
    pool.query('DELETE FROM ag_user WHERE uid=?;', [obj.uid], (err, result) => {
        if (err) throw err;
        console.log(result);
        // 返回的数组，如果数组的长度大于0，则检索到该用户，否则检索不到
        if (!result.length) {
            res.send({
                code: 200,
                msg: '用户删除成功',
                data: result[0]
            })
        } else (
            res.send({ code: 301, msg: '删除失败' })
        )
    })
});
//退出登录
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send({ code: 200, msg: '退出登录成功' });
});
//返回当前登录用户的信息
router.get('/sessiondata', (req, res) => {
    res.send({ uid: req.session.loginUid, uname: req.session.loginUname });
});


//导出路由器对象
module.exports = router;