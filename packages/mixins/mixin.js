//Fchat 
import FChat from '../fonlineconsultation/handler';
export default {
    data() {
        return {
            messageString: ""
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
        leftIcon: {
            type: String,
            default: "iconfont icon-weixinyuyin"
        },
        rightIconLeft: {
            type: String,
            default: "iconfont icon-picture"
        },
        rightIconRight: {
            type: String,
            default: "iconfont icon-fasong"
        },
        leftIconSize: {
            type: Number,
            default: 18
        },
        rightIconSize: {
            type: Number,
            default: 18
        },
        leftIconColor: {
            type: String,
            default: "#000"
        },
        rightIconColor: {
            type: String,
            default: "#000"
        },
        sendMessage: {
            type: String,
            default: ""
        }
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
            new Promise(( resolve ) => {
                this.$refs.onlineContentAll.style.height = this.contentHeight ||
                    height - (
                        (this.$refs.onlineHeader.offsetHeight || 0) +
                        (this.$refs.onlineInput.offsetHeight || 0)
                    ) + "px";
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
            setTimeout(() => {
                /**
                 * 由于行数变换的瞬间高度变化 整体高度发生变化导致window.innerHeight变为整体页面高度
                 * ，故保存刚获取焦点时的正常高度用作换行相应的处理
                 * 
                 * */
                console.log("触发"+handler,window.innerHeight , this.innerHeight);  
                this.changContentHeight(window.innerHeight);
                this.innerHeight = window.innerHeight; 
            }, 450)
            /** 
             * 焦点获得 - - - 锁定滚动
             * 失去焦点 - - - 解开滚动
            */
            if (handler === 'blur') {
                this.controlScroll(document.body, true);
            }
            if (handler === 'focus') {
                this.controlScroll(document.body, false);
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
            let tex = this.$refs.msgInput,
                ChiReg = /[\u4e00-\u9fa5]/,
                values = tex.value.split(''),
                addNum = 0,
                cols = tex.cols;
            values.forEach((e) => {
                // 中英文
                if (ChiReg.test(e)) {
                    addNum += 2;
                } else {
                    addNum += 1;
                }
                // 换行相应 -- 暂不开启 
                // if (e.indexOf('\n') != -1) {
                //     addNum = addNum + cols;
                // }
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
        // 方法可定 通过this.$ref.emit()调用
        leftHandlerClick() {
        },
        rightHandlerClick() { },
        // 消息发出
        messageHandler() {
            let tex = this.$refs.msgInput;
            FChat.addMessage(tex.value).then(() => {
                setTimeout(() => { this.initInput(); }, 0)
            });
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
        window.addEventListener('resize', this.controlHeight());
    },
    watch: {
        // 监听行数变化 响应高度
        controlRows(val) {
            console.log('变化')
            setTimeout(() => {
                this.changContentHeight(this.innerHeight);
            }, 0)
        }
    }
}