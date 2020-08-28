##### FChat使用手册：

###### 目录

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [FChat使用手册：](#fchat%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C)
  - [目录](#%E7%9B%AE%E5%BD%95)
  - [简介](#%E7%AE%80%E4%BB%8B)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  - [数据结构](#%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
  - [可配置参数](#%E5%8F%AF%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0)
  - [插槽](#%E6%8F%92%E6%A7%BD)
  - [音频开启方法](#%E9%9F%B3%E9%A2%91%E5%BC%80%E5%90%AF%E6%96%B9%E6%B3%95)
  - [FChart类](#FChart类)
  - [Demo](#demo)
  - [注意](#%E6%B3%A8%E6%84%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

------

###### 简介

简易版的仿微信版移动端h5聊天插件，使用简单，兼容音频，高度定制化，ios/android兼容。

------

###### 安装

```javascript
npm i fonlineconsultation
```

------

###### 使用方法

<font color=#2d8cf0>main.js</font>

```javascript
import '../node_modules/fonlineconsultation/packages/styles/index.less';
import fonlineconsultation from 'fonlineconsultation';
Vue.use(fonlineconsultation);
//音频开启，参照下面音频章节
import '../node_modules/fonlineconsultation/packages/recorder.js';
```

<font color=#2d8cf0>x.vue</font>

```vue
<FonlineConsultation></FonlineConsultation>
```

------

###### 数据结构

```javascript
  {
         type:消息类型(message / image / video / audio),
         content:消息内容,
         pos:消息位置(left/right),
         ? topText: //头像上方的文字显示(可选)
         ? duration:"" //音频时间 仅音频存在
  }
```

------

###### 可配置参数

<font color=#2d8cf0>必要方法</font>

| 方法名    | 作用                                    |
| --------- | --------------------------------------- |
| send      | 获取普通消息回调，用来发送              |
| sendImg   | 获取图片/视频(可开关)信息回调，用来发送 |
| sendVoice | 获取音频消息回调，用来发送              |

<font color=#2d8cf0>如何使用？</font>

```javascript
<FonlineConsultation
    @send="sendMsg"
    @sendImg="sendImg"
    @sendVoice="senVoice"
></FonlineConsultation>
```

<font color="#2d8cf0">方法的定义</font>

```javascript
/*
*@ send
*/
sendMsg(sendObject){
    //sendObject 为消息对象
}
/*
*@ sendImg
*
*/
sendImg(pro){
   pro.then((sendObject)=>{
       //sendObject为图片消息对象
   })
}
/*
*@ sendVoice
*
*/
sendVoice(sendObject){
    //sendObject为消息对象
}
```

<font color=#2d8cf0>使用样例</font>

```javascript
/*
* sendMessage为服务器api
*/  
methods: {
    // 模拟一个复读机
    sendImg(cb) {
      cb.then((sendObj) => {
        this.$FChat.loading();
        sendMessage(sendObj).then((res) => {
          if (res.data) { 
            this.$FChat.cancelLoading();
            // 我方发送
            this.$FChat.sendMessage(sendObj);
            // 对方发送
            let { content, pos, type } = res.data;
            this.$FChat.sendMessage({
              content: content,
              type: type,
              pos: "left",
            });
          }
        });
      }).catch((err) => {
        alert(err);
      });
    },
    // 普通文本消息
    sendMsg(msgObject) {
      this.$FChat.loading();
      sendMessage(msgObject).then((res) => {
        if (res.data) { 
          this.$FChat.cancelLoading();
          // 己方发送
          this.$FChat.sendMessage(msgObject);
          // 服务器返回 - 格式拼接
          let { content, pos, type } = res.data;
          this.$FChat.sendMessage({
            content: content,
            type: type,
            pos: "left"
          });
        }
      });
    },
    //音频
    senVoice(msgObject) {
      sendMessage(msgObject).then((res) => {
        if (res.data) { 
          this.$FChat.cancelLoading();
          // 己方发送
          this.$FChat.sendMessage(msgObject);
          // 服务器返回 - 格式拼接
          let { content, pos, type, duration } = res.data;
          this.$FChat.sendMessage({
            content: content,
            type: type,
            pos: "left",
            duration: duration
          });
        }
      });
    },
  }
```

------

<font color=#2d8cf0>属性参数</font>

| 参数名         | 功能                                                         | 示例                            | 说明                                                         | 类型   |
| -------------- | ------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------ | ------ |
| username       | header头部的联系人                                           | :username="'admin'"             |                                                              | String |
| contentHeight  | 聊天区域高度                                                 | :contentHeight="200"            | 不建议修改，如果有header头可以修改FChat类的ToastTop，兼容性较好，而且请确认插件位于页面最低，防止出现输入法弹出高度问题 | Number |
| contentBg      | 聊天区域的背景颜色                                           | :contentBg="'#123456'"          |                                                              | String |
| preventId      | 控制音频长按时禁止选中的范围(防止长按选中导致失去焦点，详情见注意) | :preventId="'allContent'"       | 插件通过document.getElementById()获取                        | String |
| leftIcon       | 左侧的图标(音频)                                             | :leftIcon="'iconFont icon-xxx'" | 左侧图标(音频/键盘)切换时的音频图标                          | String |
| leftIconChange | 左侧图标(键盘)                                               | 同上                            | 左侧图标(音频/键盘)切换时的键盘图标                          | String |
| leftIconSize   | 左侧图标的大小，两个相同                                     |                                 | 默认大小23                                                   | Number |
| leftIconColor  | 左侧图标的颜色                                               | 十六进制/rgb颜色                | 默认为#000                                                   | String |
| rightIconLeft  | 右侧图标的最左侧图标(图片)                                   |                                 |                                                              | String |
| rightIconRight | 右侧图标的最左侧图标(发送)                                   |                                 |                                                              | String |
| rightIconSize  | 右侧图标的大小，两个相同                                     |                                 | 默认大小20                                                   | Number |
| rightIconColor | 右侧图标的颜色                                               | 十六进制/rgb颜色                |                                                              | String |
| popBg          | 聊天气泡颜色                                                 | 十六进制/rgb颜色                | 默认#6AEA9E                                                  | String |
| popSize        | 聊天气泡字号                                                 |                                 | 默认15                                                       | Number |
| popRightAva    | 聊天气泡右侧头像                                             | 图片链接                        |                                                              | String |
| popLeftAva     | 聊天气泡左侧头像                                             | 图片链接                        |                                                              | String |

------

###### 插槽

(如需自定义请重写方法)

| 名称       | 作用                                                         |
| ---------- | ------------------------------------------------------------ |
| leftIcon   | 左侧图标插槽(带有切换音频/文本方法)                          |
| centerText | 中间的输入框插槽(原框带仿微信文本换行功能，替换后如需要请自行实现) |
| rightIcon  | 右侧图标插槽(带有选择图片，发送文本方法[包含发送后动态宽高的计算]) |
| loading    | 图片loading(id为messageLoading，绑定着消息发送的loading方法) |
| header     | 整个header的插槽，注意要设置id为onlineHeader方便计算内容高度 |
| hLeft      | header左侧功能                                               |
| hCenter    | header中间整体                                               |
| hRight     | header右侧功能                                               |

------

<font color=#2d8cf0>单独气泡重写插槽</font>

| 插槽名称 | 说明                                  |
| -------- | ------------------------------------- |
| message  | 文字消息插槽                          |
| image    | 图片消息插槽                          |
| audio    | 音频消息插槽                          |
| video    | 视频消息插槽                          |
| topText  | 气泡上方文字(需数据结构中存在topText) |

该条消息的数据均可通过

```vue
//message
<template v-slot:message="message">
	{{message}}
</template>
//image
<template v-slot:image="image">
	{{image}}
</template>
//audio
<template v-slot:audio="audio">
	{{audio}}
</template>
//video
<template v-slot:voice="voice">
	{{voice}}
</template>
<template v-slot:topText ="item">
    {{item}}
</template>
```

来获取当前信息所对应的对象。

注：如果文本消息出现类似网址，则会渲染成a标签：

```javascript
content:"我是一个网址<a>http://www.baidu.com</a>"
```

------

<font color=#2d8cf0>整体聊天气泡重写插槽</font>

插槽名为：popList

你可以通过如下方式获取到消息列表：

```javascript
this.$FChat.getMessage()
//或者使用插槽的返回值,也可以拿到消息列表
<FonlineConsultation  @send="sendMsg" @sendImg="sendImg" @sendVoice="senVoice">
    <template v-slot:popList ="List">
        {{List}}
    </template>
</FonlineConsultation>    
```

------

###### 音频开启方法

为了多端兼容使用[Recorder.js](https://github.com/xiangyuecn/Recorder)插件，关于Vue使用Recorder.js的demo可参照[样例](https://github.com/Negronis/RecorderExample)

<font color=#2d8cf0>直接引入到main.js，可通过this.$Recorder调用相关api</font>

```javascript
import './node_modules/fonlineconsultation/packages/recorder.js';
```

<font color=#2d8cf0>在需要的.vue中调用此方法并键入微信授权/下载素材的url</font>

```vue
created(){
   this.$FChat.openVoice("https://fepic.natapp4.cc/api/getSign", true);
}
```

------

###### FChart类

<font color=#2d8cf0>可修改属性 - 通过setConfig修改</font>

- [x] maxSize - 图片最大大小(默认为2M)
- [x] onlyImg - 是否只允许发图片(默认为图片+视频都可以发送)
- [x] ToastTop - 如果该插件在你的项目中并非全屏显示，则需要传入该插件距顶部所差高度，用于响应式计算，请务必将插件置于页面最底，防止出现输入法弹出后的高度计算问题

```javascript
//比如项目上有个header,高度为100，则这样做即可
this.$FChat.setConfig('ToastTop',100);
```

------

<font color="#2d8cf0">方法一览(*为常用)</font>

| 方法            | 作用                                      | 参数                                                         |
| --------------- | ----------------------------------------- | ------------------------------------------------------------ |
| openVoice*      | 修改微信地址和授权                        | url - 服务器地址(微信授权+下载素材)<br />isPromise - 是否自动进行音频授权 |
| setConfig*      | 设置基本属性                              | key - 要修改的属性名<br />value - 修改为<br />config - 对象形式(和上面二选一) |
| getLoading      | 获取当前loading状态                       | null                                                         |
| loading*        | 显示全屏loading                           | time - 显示时长<br />loadingId - 自定义loading的id(display切换显示隐藏)，没有可不传texDisabled - 文本框在loading状态下是否disabled，默认false |
| cancelLoading*  | 取消loading状态                           | loadingId - 自定义loading的id(display切换显示隐藏)，没有可不传 |
| scrollMessage*  | 滚动到消息框最底部                        | null                                                         |
| delMessage      | 清空消息框(input)                         | null                                                         |
| setMessageList* | 渲染返回的消息列表(格式要为指定格式)      | arr - 消息列表<br />handleFuc - 可自定该如何处理(默认为直接渲染)<br /> |
| getMessage*     | 获取消息列表                              | null                                                         |
| addMessage      | 获取普通消息对象                          | msg - 内容<br />pos - 方位(left / right)                     |
| addImage        | 获取图片对象                              | pos - 方位                                                   |
| sendMessage*    | 发送图片/文字消息，渲染                   | FchatObj - 即消息对象                                        |
| playVoice*      | 开始录音，返回promise                     | null                                                         |
| pauseVoice*     | 停止录音，返回promise，包含blob和duration | null                                                         |
| sendVoice*      | 发送音频消息，渲染                        | content - blob对象/音乐网址等auto可以读取的<br />pos - 方位<br />duration - 音频持续时间 |
| playVoice*      | 播放音频                                  | src - 音频链接/blob等audio支持的格式<br />duration - 持续时间 |
| createToast*    | 创建提示框(顶部)                          | msg - 提示消息<br />timer - 持续时间                         |

------

###### Demo

[Vue样例](https://github.com/Negronis/FChatDemo)

------

###### 注意

由于<font color=#ff9900>h5本身自带的长按复制功能</font>，按钮长按后会出现选中文本导致失效，所以在长按事件中加入了禁止长按复制功能(松开后自动取消)，但仅仅限制了该插件的范围，可通过传入<font color=#ff9900>preventId</font>属性来增大限制范围防止误选中，主要使用user-select等属性进行控制。