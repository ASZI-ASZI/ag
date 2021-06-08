import { axios } from "../config.js"


async function addCart(params) {
    try {
        let result = await axios.post("/cart/add", params);     //Post调用可以这样传递参数
        return result.data;
    } catch (err) {
        //返回Json数据格式要与resule.data一致
        return { code: -1, msg: "异步调用出错了，错误信息" + err }
    }
}


async function deleteCart(params) {
    try {
        let result = await axios.get("/cart/del", {params});     //get调用可以这样传递参数
        return result.data;
    } catch (err) {
        //返回Json数据格式要与resule.data一致
        return { code: -1, msg: "异步调用出错了，错误信息" + err }
    }
}

async function listCart() {
    try {
        let result = await axios.get("/cart/list");     //get调用可以这样传递参数
        return result.data;
    } catch (err) {
        //返回Json数据格式要与resule.data一致
        return { code: -1, msg: "异步调用出错了，错误信息" + err }
    }
}


export { addCart, deleteCart, listCart}