import { axios } from "../config.js"

// 登录
async function Login(user) {
    try {
        let result = await axios.post("/user/login", user);     //uname  upwd
    //   console.log(user)//有
        return result.data;
    } catch (err) { 
        //返回错误信息 格式？
        return { code: -1, msg: "异步调用出错了，错误信息" + err }
    }
}
// 退出
async function Logout() {
    try {
        let result = await axios.post("/user/logout");     //uname  upwd
        return result.data;
    } catch (err) {
        //返回错误信息 格式？
        return { code: -1, msg: "异步调用出错了，错误信息" + err }
    }
}

//获取用户列表
async function getUserList(params){  
    try{ 
        let result = await axios.get("/user/list",{params});   //{params:{}}   可选参数pno  pageSize   
        return result.data;
    }catch(err)
    {   //返回Json数据格式要与result.data一致     
        return {code:-1,msg:"异步调用出错了，错误信息：" + err};
    }
}
//注册用户
async function Register(user) {
    try {
        let result = await axios.post("/user/reg", user);     //uname  upwd
    //   console.log(user)//有
        return result.data;
    } catch (err) { 
        //返回错误信息 格式？
        return { code: -1, msg: "异步调用出错了，错误信息" + err }
    }
}



export {Login,Logout,getUserList,Register}    //导出接口名