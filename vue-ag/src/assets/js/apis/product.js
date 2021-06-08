import {axios} from "../config.js" //导入axios

//获取商品列表
async function getProductList(params){  
    try{ 
        let result = await axios.get("/product/list",{params});   //{params:{}}   可选参数kw pno  pageSize   
        return result.data;
    }catch(err)
    {   //返回Json数据格式要与result.data一致     
        return {code:-1,msg:"异步调用出错了，错误信息：" + err};
    }
}
var baseURL=axios.defaults.baseURL
export {getProductList,baseURL}    //导出接口名