//Fchat 
import FChat from '../fonlineconsultation/handler';
export default {
    data() {
        return {
            messageString: "",
            controlFocus: true,
            loadingHeight: 0
        }
    },
    props: {
        // index
        height: {
            default: window.innerHeight,
        },
        // header
        username: {
            type: String,
            default: "暂无联系人"
        },
        // content
        contentHeight: {
            type: Number,
        },
        contentBg: {
            type: String,
            default: "#F5F5F5",
        },
        // input
        preventId:{
            default:"fonlineconsultation"
        },
        sendMessage: {
            default: ""
        },
        leftIcon: {
            type: String,
            default: "FiconFont icon-weixinyuyin"
        },
        // 音频切换
        leftIconChange:{
            type:String,
            default:"FiconFont icon-weixinjianpan"
        },
        rightIconLeft: {
            type: String,
            default: "FiconFont icon-picture"
        },
        rightIconRight: {
            type: String,
            default: "FiconFont icon-fasong"
        },
        leftIconSize: {
            type: Number,
            default: 23
        },
        rightIconSize: {
            type: Number,
            default: 20
        },
        leftIconColor: {
            type: String,
            default: "#000"
        },
        rightIconColor: {
            type: String,
            default: "#000"
        },
        // pop
    },
    computed: {
        // index 

        // header 

        // content 

        contentProp() {
            let { contentHeight, authorHeight, contentBg } = this;
            let retObj = {};
            retObj["style"] =
                "height:" +
                (contentHeight || window.innerHeight - authorHeight) +
                "px" +
                ";background:" + contentBg || "#f5f5f5";
            return retObj;
        },
        // input 

        // pop
    },
    methods: {
        // input 
        // 修改消息框(content)高度实现响应方法
        changContentHeight(height) {
            new Promise((resolve) => {
                this.$refs.onlineContentAll.style.height = this.contentHeight ||
                    height - (
                        (this.$refs.onlineHeader.offsetHeight || 0) +
                        (this.$refs.onlineInput.offsetHeight || 0)
                    ) + "px";
                this.loadingHeight = height + 'px';
                resolve();
            }).then(() => {
                this.scrollAll();
            }).catch(err => {
                throw new Error(err);
            })
        },
        // 跳转到页面最顶部，消息最底部滚动
        scrollAll() {
            window.scrollTo(0, 0);
            FChat.scrollMessage();
        },
        // 获取焦点时的高度和滚动控制 -- 手机端兼容
        controlHeight(handler) {
            /** 
             * 失去焦点 
             * 解开滚动 
             * 控制参数controlFocus 
             * 阻止重复获取focus bug
            */
            if (handler === 'blur') {
                this.controlScroll(document.body, true);
                this.controlFocus = true;
            }
            // 阻止重复获取focus bug
            if (this.controlFocus) {
                setTimeout(() => {
                    /**
                     * 由于行数变换的瞬间高度变化 整体高度发生变化
                     * 导致window.innerHeight变为整体页面高度
                     * 故保存刚获取焦点时的正常高度用作换行相应的处理 
                     * */
                    this.changContentHeight(window.innerHeight);
                    this.innerHeight = window.innerHeight;
                }, 450);
                /**  
                 * 焦点获得 
                 * 锁定滚动
                 * 设定controlFocus为false 
                 * 防止多次focus触发
                */
                if (handler === 'focus') {
                    this.controlScroll(document.body, false);
                    this.controlFocus = false;
                }
            }
        },
        // 重置输入
        initInput() {
            this.messageString = "";
            this.controlRows = 1;
        },
        // 禁止滚动与允许滚动
        scroll(event) {
            event.preventDefault();
        },
        // 控制是否锁定滚动方法
        controlScroll(dom, isScroll) {
            if (isScroll) {
                dom.removeEventListener('touchmove', this.scroll);
            } else {
                dom.addEventListener('touchmove', this.scroll, { passive: false });
            }
        },
        // textarea行数控制
        controlRow() {
            let tex = this.$refs.msgInput;
            let ChiReg = /[\u4e00-\u9fa5]/;
            let values = tex.value.split('');
            let addNum = 0,
                cols = tex.cols;
            values.forEach((e) => {
                // 中英文
                if (ChiReg.test(e)) {
                    addNum += 2;
                } else {
                    addNum += 1;
                }
                // 换行相应 -- 暂不开启 
                if (e.indexOf('\n') != -1) {
                    // addNum = addNum + cols;
                    // return;
                }
            })
            // 自动计算最大行数
            if (this.controlRows < 3 && addNum != 0) {
                this.controlRows = Math.ceil(addNum / cols);
            }
            if (this.controlRows >= 3 && addNum) {
                this.controlRows = Math.ceil(addNum / cols) > 3 ? 3 : Math.ceil(addNum / cols);
            }
            if (addNum == 0) {
                this.controlRows = 1;
            }
        },
        //默认录音方法 方法可定 通过this.$ref.emit()调用
        leftHandlerClick() {
            this.isVoice = !this.isVoice;
        },
        //发送图片
        rightHandlerClick() {
            this.$emit('sendImg', FChat.addImage());
        },
        // 消息发出
        messageHandler() {
            let tex = document.getElementById('msgInput');
            if (tex) {
                if (!FChat.getLoading()) {
                    this.$emit('send', FChat.addMessage(tex.value));
                }
            }
        },
        //声音方面
        startVoice(e) { 
            var that = this;
            clearTimeout(this.touchTimer);
            // 禁止页面选中 
            document.getElementById(this.preventId).style.userSelect = `none`; 
            // -webkit-touch-callout:none;
            // -webkit-user-select:none;
            // -khtml-user-select:none;
            // -moz-user-select:none;
            // -ms-user-select:none;
            // user-select:none;
            // 阻止页面滚动
            this.controlScroll(document.body, false);
            this.isCancel = false;
            this.touchTimer = 0;
            this.touchTimer = setTimeout(function () {
                console.log('长按执行');
                that.voiceContent = "正在录音...."
                that.voiceMsg = "松开结束";
                that.startVoiceBoolean = true;
                FChat.startVoice();
            }, 300);
            // 记录开始的位置
            this.voiceStartX= e['touches']['0']['pageX'];
            this.voiceStartY  =e['touches']['0']['pageY'];
        }, 
        moveVoice(e) {   
            // 清空一下定时器
            clearTimeout(this.touchTimer);
            var pageX  = e['touches']['0']['pageX'];
            var pageY  = e['touches']['0']['pageY']; 
            // 判断滑动位置 （top , bottom , right , left）
            var X = pageX - this.voiceStartX;
            var Y = pageY - this.voiceStartY; 
            function events(msg , isCancel){
                if(this.touchTimer!=0){
                    //这里写要执行的内容（尤如onclick事件） 
                      this.voiceContent = msg;
                      this.isCancel = isCancel;
                  }
            } 
            if ( Math.abs(Y) > Math.abs(X)+50 && Y < 0 ) {
                //   从下到上 
                events.call(this, "上滑取消录音" , true); 
            }else{
                events.call(this, "正在录音...." , false);
            }
            // if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
            //     //    从左到右
            // }
            // else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
            //     // 从右到左
            // }
            // else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
            //     // 从上到下 
            // }
            // else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
            //     //   从下到上 
            // }
            // else{ 
            // } 
        },
        endVoice() { 
            clearTimeout(this.touchTimer);//清除定时器
            // 允许页面滚动
            this.controlScroll(document.body, true);
            var that = this;
            setTimeout(function(){
                that.startVoiceBoolean = false;
                that.voiceMsg = "开始录音";
            },0)
            this.touchTimer = 0;
            if(this.isCancel){
                console.log('取消录音');
            }else{
                var sendObject = FChat.pauseVoice(); 
                this.$emit('sendVoice',sendObject);
            }
            document.getElementById(this.preventId).style.userSelect = "all";
            console.log('手指松开')
        }
    },
    //事件绑定/高度计算
    mounted() {
        // content
        this.$nextTick(() => {
            this.authorHeight =
                (this.$refs.onlineHeader.offsetHeight || 0) +
                (this.$refs.onlineInput.offsetHeight || 0);
        });
        //绑定enter发送
        window.addEventListener('keydown', (e) => {
            let { keyCode } = e;
            if (keyCode === 13) {
                this.messageHandler();
            }
        })
        // 监听页面高度变化 - 安卓收起输入法响应
        window.addEventListener('resize', () => {
            this.changContentHeight(window.innerHeight);
        });
    },
    watch: {
        // 监听行数变化 响应高度
        controlRows(val) {
            setTimeout(() => {
                this.changContentHeight(this.innerHeight);
            }, 0)
        }
    }
}