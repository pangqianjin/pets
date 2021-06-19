import axios from "axios";
import {notification} from 'antd'
import PubSub from 'pubsub-js'

export const reqPets = (dataObj)=>axios({
    method: 'POST',
    url: 'http://api.tianapi.com/txapi/pet/index',
    params: {
        'key': 'a101b3074c31fc043b930a7b39146408',
        ...dataObj
    }
})

export const showFeedback = (msg)=>notification.open({
        message: '温馨提示',
        description: msg,
        duration: 3
})

export const showResult = (data)=>{
    if(data.code!==200){
      showFeedback(data.msg)
    }else{
      PubSub.publish('result', data.newslist)
    }
  }
