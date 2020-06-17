import axios from 'axios';
import qs from 'qs';

import {baseUrl} from './config';


// 添加请求拦截器，在发送请求之前做点什么
axios.interceptors.request.use(function(config){
    // 显示loading
    return config
},
    function(err){
        // 请求错误时，弹窗提示，或做些其他事请
        return Promise.reject(err);
    }
)


// 添加响应拦截器
axios.interceptors.response.use(function(res){
    // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return res.data;
},function(err){
    // 对响应错误做点什么
    return Promise.reject(err);
})

// 封装数据返回失败提示函数
function errorState(res){
    // 隐藏loading
     // 如果http状态码正常，则直接返回数据
     if(res&&(res.status===200||res.status===304||res.status===400)){
         // 如果不需要除了data之外的数据，可以直接 return response.data
         return res;
     }else{
         alert('获取数据失败')
     }
}

// 封装数据返回成功提示函数
function successState(res){
    console.log(res,'请求成功了');
// 隐藏loading
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (res === 'success') {
    alert('success')
    return res
  }
}

// 封装axios

function apiAxios (method, url, params) {
    let httpDefault = {
      method: method,
      baseURL: baseUrl,
      url: url,
      // `params` 是即将与请求一起发送的 URL 参数
      // `data` 是作为请求主体被发送的数据
      params: method === 'GET' || method === 'DELETE' ? params : null,
      data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
      timeout: 10000
    }
  
    // 注意**Promise**使用(Promise首字母大写)
    return new Promise((resolve, reject) => {
      axios(httpDefault)
        // 此处的.then属于axios
        .then((res) => {
          successState(res)
          resolve(res)
        }).catch((response) => {
          errorState(response)
          reject(response)
        })
    })
  }

  export default apiAxios;