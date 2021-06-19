## pets
基于react, axios, antd, pubsub-js, react-router-dom的SPA，能够通过搜索关键字和点击分类来获得相关宠物的信息，包含猫咪、犬类、爬行动物、小动物、水族类等宠物的生活习性、喂养方法、价格、祖籍、体态特点和图片等信息。
## 运行方式
- 首先clone本仓库到本地：git clone https://github.com/pangqianjin/pets.git
- 然后进入目录,并执行以下命令
  - yarn install
- 然后可以在开发环境中运行
  - yarn start
  - 打开浏览器 localhost:3000
- 或者打包后运行
  - yarn build
  - npm install -g serve
  - serve -S build
  - 打开浏览器 localhost:5000
### 整体布局
![image](https://user-images.githubusercontent.com/49555245/122512597-abdd7f80-d03b-11eb-9761-efbcb742a1c6.png)
### 通过关键字搜索
![image](https://user-images.githubusercontent.com/49555245/122512643-bdbf2280-d03b-11eb-8c61-ac409ed9a0c4.png)
### 通过导航栏选择
![image](https://user-images.githubusercontent.com/49555245/122513782-789bf000-d03d-11eb-943b-66cd991ca09a.png)
### 滑动到底部显示 “返回顶部按钮”和“分页器”
![image](https://user-images.githubusercontent.com/49555245/122627727-f0245a80-d0e3-11eb-8da8-f19236aff34c.png)

### 左侧导航栏可折叠
![image](https://user-images.githubusercontent.com/49555245/122514001-bdc02200-d03d-11eb-932b-899a82300257.png)

### 后端接口地址
- 接口地址：http://api.tianapi.com/txapi/pet/index 
- 请求示例：http://api.tianapi.com/txapi/pet/index?key=APIKEY 
- 支持协议：HTTP/HTTPS
- 请求方式：GET/POST
- 返回格式：UTF8 JSON
### 请求参数
post请求时，enctype应为application/x-www-form-urlencoded

请求参数中有url或特殊字符时，应该对值urlencode编码下
![image](https://user-images.githubusercontent.com/49555245/122512186-1215d280-d03b-11eb-8c59-eeb285092804.png)
### 返回示例
```json
{
"code":200,
"msg":"success",
"newslist":[
{
"pettype":1,
"name":"哈士奇",
"engName":"SiberianHuskiy",
"characters":"聪明机灵、极度热情、神经质",
"nation":"俄罗斯",
"easyOfDisease":"肠胃疾病",
"life":"9-15年",
"price":"2000-4000元",
"desc":"　　西伯利亚",
"feature":"　　西伯利亚雪橇犬是一种原始的古老犬种，因它的独特嘶哑的叫声被称之为当今的哈士奇。很早前哈士奇是最原始的交通工具专门拉雪橇的，并用这种狗猎取和饲养驯鹿，或者繁殖这种狗，然后带出他们居住的冻土地，换取温饱。典型狼性犬。",
"characterFeature":"　　哈士奇的外表英俊潇洒，精致的五官和丰富的肢体语言充满了奇特的表现，无需复杂的交谈，就能轻易了解他的喜怒哀乐。哈士奇时常会有点神经质。",
"careKnowledge":"　　哈士奇虽然看着一副冷漠无情的样子，事实上，哈士奇对人很友好、温柔、热情的。喜欢与人交往是哈士奇的典型性格。通常不表现出护卫犬强烈的领地占有欲，不对陌生人过多的怀疑，也不会攻击其他犬类。因此有很多人喜欢哈士奇。他对主人非常忠诚，一条忠诚的小狗有一个健康的身体是非常重要的。",
"feedPoints":"　　哈士奇有着敏感的肠胃，因此在饮食上需要主人多加重视，喂食不当很容易",
"coverURL":"http://img.boqiicdn.com/Data/BK/P/imagick14371435571930.png"
}
]
}
```
### 返回参数
![image](https://user-images.githubusercontent.com/49555245/122512406-615c0300-d03b-11eb-853d-dce7c96e08bb.png)
