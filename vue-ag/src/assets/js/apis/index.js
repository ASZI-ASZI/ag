import {axios} from "../config.js" //导入axios

//获取轮播列表
async function getCarouselList(){  
    try{ 
        let result = await axios.get("/index");     
        return result.data.carouselItems;
    }catch(err)
    {   //返回Json数据格式要与result.data一致     
        return {code:-1,msg:"异步调用出错了，错误信息：" + err};
    }
}

//商品推荐
async function getRecommendedList(){  
    try{ 
        let result = await axios.get("/index");   
        console.log(result);    //recommendedItems
        return result.data.recommendedItems;
    }catch(err)
    {   //返回Json数据格式要与result.data一致     
        return {code:-1,msg:"异步调用出错了，错误信息：" + err};
    }
}
export {getCarouselList,getRecommendedList}    //导出接口名