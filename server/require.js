const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const {getSign , getAudio} = require('./wechat'); 
// 创建application/json 解析器
var jsonParser = bodyParser.json()
// 创建 application/x-www-form-urlencoded 解析器 
router.get('/getMessage', (req, res) => {
   let sendData = [
      { "content": "雾里看花解放啦空数据阿斯利康", "type": "message", "pos": "right" },
      { "content": "雾里看花解放啦空数据阿斯利康", "type": "message", "pos": "left" },
      { "content": "未结案维拉克斯福建烤老鼠的", "type": "message", "pos": "right" },
      { "content": "未结案维拉克斯福建烤老鼠的", "type": "message", "pos": "left" },
      { "content": "热武器奥若群无若群w", "type": "message", "pos": "right" }
      , { "content": "热武器奥若群无若群w", "type": "message", "pos": "left" },
      { "content": "三顿饭拉克丝都费劲拉开始搭建发拉丝", "type": "message", "pos": "right" },
      { "content": "三顿饭拉克丝都费劲拉开始搭建发拉丝", "type": "message", "pos": "left" },
      { "content": "阿萨德阿萨德", "type": "message", "pos": "right" },
      { "content": "http://192.168.1.4:8080/img.png", "type": "image", "pos": "right" },
      { "content": "阿萨德阿萨德", "type": "message", "pos": "left" },
      { "content": "阿萨德", "type": "message", "pos": "right" },
      { "content": "阿萨德", "type": "message", "pos": "left" },
      { "content": "", "type": "audio", "pos": "left" ,"duration":1},
      { "content": "", "type": "audio", "pos": "right" }


   ];
   res.json(sendData);
})
router.post('/sendMessage', jsonParser, (req, res) => {
   let sendData = {};
   var { type } = req.body;
   if (type === 'message') {
      if (req.body) sendData = (req.body);
      res.json(sendData);
   }
   if (type === 'image') {
      let imgData = req.body.content;
      let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = new Buffer.from(base64Data, 'base64');
      fs.writeFile("img.png", dataBuffer, function (err) {
         if (err) {
            res.send(err);
         } else {
            fs.readFile('./img.png', function (err, data) {
               if (err) {
                  throw err;
               } else {
                  sendData = req.body;
                  sendData['content'] = 'http://192.168.1.4:8080/img.png';
                  res.json(sendData)
               }
            })
         }
      })
   }
   if (type === 'video') {
      let imgData = req.body.content;
      let base64Data = imgData.replace(/^data:video\/\w+;base64,/, "");
      let dataBuffer = new Buffer.from(base64Data, 'base64');
      fs.writeFile("video.mp4", dataBuffer, function (err) {
         if (err) {
            res.send(err);
         } else {
            fs.readFile('./video.mp4', function (err, data) {
               if (err) {
                  throw err;
               } else {
                  sendData = req.body;
                  sendData['content'] = 'http://192.168.1.4:8080/video.mp4';
                  res.json(sendData)
               }
            })
         }
      })
   }
});
// 微信接口
router.post('/getSign', jsonParser, (req, res) => {
   console.log('收到请求 ....');
   let { url, action ,  mediaID} = req['body'];
   // console.log('拿到参数 ...' + url + action + JSON.stringify(req['body']));
   if (action && action == 'sign') {
      getSign(url, res);
   } 
   if(action && action == 'wxdown'){
      getAudio(mediaID,res)
   }
})
//签名
module.exports = router;
