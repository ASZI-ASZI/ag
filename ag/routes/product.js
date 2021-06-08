const express = require('express');
//引入连接池
const pool = require("../pool.js");
const query = require("../query");
//创建空路由器
var router = express.Router();
//创建路由
//1.商品列表 GET /list
router.get("/list", (req, res) => {

  if (!req.session.loginUid) {
    res.send({ code: 300, msg: "login required" });
    return;
  }

  //1.1获取数据
  let kw = req.query.kw || "";
  //"mac i5 128g"
  let kws = kw.split(" ");
  //[mac,i5,128g]
  kws.forEach((elem, i, arr) => {
    arr[i] = `title like '%${elem}%'`;
  });
  /*[
    title like '%mac%',
    title like '%i5%',
    title like '%128g%'
  ]*/
  //join(" and ");
  let where = kws.join(" and ");
  //console.log(where)
  //1.2如果页码pno为空 默认为1 如果pageSize大小为空默认是9  要保证pageSize大小为整数
  //验证页码
  let pno = parseInt(req.query.pno);
  pno = pno ? pno : 1;
  //验证每页大小
  let pageSize = parseInt(req.query.pageSize);
  pageSize = pageSize ? pageSize : 9;
  //1.3计算开始查询的值start
  let start = (pno - 1) * pageSize;

  //console.log(req.session)

  //1.4执行SQL语句 注意是2个SQL语句
  // let sql = `SELECT count(*) as Count FROM xz_laptop;
  //   SELECT a.lid,a.title,a.price,a.sold_count,a.is_onsale,b.md as pic FROM xz_laptop a
  //   INNER JOIN (select laptop_id, max(md) md from xz_laptop_pic GROUP BY laptop_id) b
  //   ON a.lid = b.laptop_id  LIMIT ?,?`;
  let sql = `SELECT count(*) as count FROM ag_electrical_equipment WHERE ${where};
      SELECT lid,title,price,sold_count,is_onsale,(SELECT md FROM ag_electrical_equipment_pic WHERE electrical_equipment_id = lid limit 1) as pic FROM ag_electrical_equipment WHERE ${where} LIMIT ?,?`;
  //执行SQL语句，响应查询到的数据
  pool.query(sql, [start, pageSize], (err, result) => {
    if (err) {
      res.send({ code: 301, msg: `list failed, errMessage: ${err}` }); //throw err;
      return;
    }
    let recordCount = result[0][0]["count"]; //获取记录总数，第1个SQL语句的执行结果
    let pageCount = Math.floor(recordCount / pageSize) + 1; //计算总页数
    //如果数据获取成功（记录数量是0也是一种成功），响应对象
    let retJson = {
      code: 200,
      msg: "list ok",
      recordCount: recordCount,
      pageSize: pageSize,
      pageCount: pageCount,
      pno: pno,
      data: result[1],//第2个SQL语句的执行结果
    };



    res.send(retJson);
  });
});


//2.商品详情
router.get('/detail', (req, res) => {
  var output = {
    details: {},
    family: {}
  };
  //获取数据，
  var obj = req.query;
  let lid = obj.lid;
  if (!lid) {
    res.send({ code: 401, msg: 'lid required' });
    return;
  }
  //执行SQL语句，把查询的数据响应给浏览器
  pool.query('SELECT * FROM ag_electrical_equipment WHERE lid=?', [lid], (err, result) => {
    if (err) throw err;
    //判断数据是否为空
    if (result.length == 0) {
      res.send({ code: 301, msg: 'detail err' });
    } else {
      output.details = result[0];
      var lid = result[0].lid;
      var fid = result[0].family_id;
      var sql = `
      SELECT * FROM ag_electrical_equipment_pic WHERE electrical_equipment_id=? ORDER BY pid;
      SELECT * FROM ag_electrical_equipment_family WHERE fid=?;
      SELECT lid,spec FROM ag_electrical_equipment WHERE family_id=?;
      `;
      pool.query(sql, [lid, fid, fid], (err, result) => {
        output.details.picList = result[0];
        output.family = result[1][0];
        output.family.electrical_equipmentList = result[2];
      });
    }
  });
});

//3.删除用户
router.get('/delete', (req, res) => {
  //获取数据
  let obj = req.query;
  console.log(obj);
  // 验证是否为空
  if (!obj.lid) {
    res.send({ code: 401, msg: '编号为空' });
    //阻止往下执行
    return;
  }
  // 执行sql语句
  pool.query('DELETE FROM ag_electrical_equipment WHERE lid=?;', [obj.lid], (err, result) => {
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

//4商品添加
router.post('/reg', (req, res) => {
  //获取表单数据
  let obj = req.body;
  //验证各项数据是否为空
  if (!obj.family_id) {
    res.send({ code: 401, msg: '所属型号家族编号为空' });
    //阻止往下执行
    return;
  }
  if (!obj.title) {
    res.send({ code: 402, msg: '主标题为空' });
    //阻止往下执行
    return;
  }
  if (!obj.price) {
    res.send({ code: 404, msg: '价格为空' });
    //阻止往下执行
    return;
  }
  if (!obj.promise) {
    res.send({ code: 404, msg: '服务承诺为空' });
    //阻止往下执行
    return;
  }
  if (!obj.spec) {
    res.send({ code: 404, msg: '规格/颜色为空' });
    //阻止往下执行
    return;
  }
  if (!obj.name) {
    res.send({ code: 404, msg: '商品名称为空' });
    //阻止往下执行
    return;
  }
  if (!obj.shelf_time) {
    res.send({ code: 404, msg: '上架时间为空' });
    //阻止往下执行
    return;
  }
  if (!obj.sold_count) {
    res.send({ code: 404, msg: '已售出的数量为空' });
    //阻止往下执行
    return;
  }
  if (!obj.is_onsale) {
    res.send({ code: 404, msg: '是否在售为空' });
    //阻止往下执行
    return;
  }

  //执行sql语句
  pool.query('INSERT INTO ag_electrical_equipment SET ?', [obj], (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: '添加成功' });
    } else {
      res.send({ code: 201, msg: '添加失败' });
    }
  });

});




//导出路由器
module.exports = router;
//在app.js服务器文件中挂载到/product下