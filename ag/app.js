const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const userRouter = require('./routes/user.js');
const productRouter = require('./routes/product.js');
const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');

const cors = require('cors');
//创建web服务器
let app = express();

let corsOptions = {
    origin: ["http://172.16.22.45:8080", "http://localhost:8080","http://localhost:8081","http://localhost:8082"],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));

  app.use(express.json()); //在其他路由中间件前（尽可能靠前，以能够通过bodyPaser获取req.body）
  app.use(express.urlencoded({ extended: false }));


// 使用 session 中间件
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));



//托管静态资源(html,css,js,图像)，内置中间件
app.use(express.static('public'));
//第三方中间件，主体解析
app.use(bodyparser.urlencoded({
    extended: false    //使用核心模块querystring,不使用第三方模块qs
}));
//把用户路由器挂载到服务器  给url添加前缀/user
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use(indexRouter);

const port = 5050;
app.listen(port, () => console.log(`XZ App listening oe port:${port}`));
