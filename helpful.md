##### FChat使用手册：
###### 数据结构：
   ```javascript
      {
         type:消息类型(message / image / video / audio),
         content:消息内容,
         pos:消息位置(left/right)
      }
   ```
###### 普通消息发送方法：
   1. @send -> 回调：处理后的对象
###### 图片发送方法：
   1. @sendImg -> 回调：Promise，对象在.then(res)中
###### 通过插槽实现全自定义定制：
   1. slot="leftIcon"   左侧
   2. slot="rightIcon"  右侧
   3. slot="centerInput"   中间
###### FChart类：
   1. 发送消息需传入3个参数：msg, pos, Vue