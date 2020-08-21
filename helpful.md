##### FChat使用手册：
###### 数据结构：
   ```javascript
      {
         type:消息类型(message / image / video / audio),
         content:消息内容,
         pos:消息位置(left/right),
         ? duration:"" //音频时间 仅音频存在
      }
   ```
***

###### 音频开启方法：

为了多端兼容使用[Recorder.js](https://github.com/xiangyuecn/Recorder)插件，关于Vue使用Recorder.js的demo可参照[样例](https://github.com/Negronis/RecorderExample)

<font color="#2d8cf0">第一种，main.js中，可以通过this.$Recorder调用相关api</font>

<font color="#2d8cf0">第一种，直接引入到main.js，可通过this.$Recorder调用相关api</font>

```javascript
import './node_modules/fonlineconsultation/packages/recorder.js'
```

<font color="#2d8cf0">第二种，app.vue中，也可以通过this.$Recorder调用相关api</font>

```javascript
created(){
    //url为服务器微信授权/素材下载的地址(安卓不需要填) isPromise-是否需要加载完音频插件时自动授权
	this.$FChat.openVoice(url,isPromise);
}
```

***


###### 普通消息发送方法：
   1. @send -> 回调：处理后的对象
###### 图片发送方法：
   1. @sendImg -> 回调：Promise，对象在.then(res)中
###### 通过插槽实现全自定义定制：
   1. slot="leftIcon"   左侧
   2. slot="rightIcon"  右侧
   3. slot="centerInput"   中间
***

###### FChart类：
   1. 发送消息需传入3个参数：msg, pos, Vue

***

###### 注意：

由于<font color="#ff9900">h5本身自带的长按复制功能</font>，按钮长按后会出现选中文本导致失效，所以在长按事件中加入了禁止长按复制功能(松开后自动取消)，但仅仅限制了该插件的范围，可通过传入<font color="#ff9900">preventId</font>属性来增大限制范围防止误选中，主要使用user-select属性。