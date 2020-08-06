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
        // 获取焦点时的高度控制 -- 手机端兼容
        controlHeight(handler) {
            setTimeout(() => {
                this.$refs.onlineContentAll.style.height = this.contentHeight ||
                    window.innerHeight - this.authorHeight + "px";
                // 跳转到最顶和消息尾
                window.scrollTo(0, 0);
                FChat.scrollMessage();
            }, 150)
            /** 
             * 焦点获得 - - - 锁定滚动
             * 失去焦点 - - - 解开滚动
            */
            if (handler === 'blur') {
                this.controlScroll(document.body, true);
            } else {
                this.controlScroll(document.body, false);
            }
        },
        // 重置输入
        initInput() {
            this.messageString = "";
            this.controlRows = 1;
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
                console.log(this.controlRows);
            }
            if (this.controlRows >= 3 && addNum) {
                this.controlRows = Math.ceil(addNum / cols) > 3 ? 3 : Math.ceil(addNum / cols);
            }
            if (addNum == 0) {
                this.controlRows = 1;
            }
            // bug换行以后高度计算有问题
            setTimeout(() => {
                this.authorHeight =
                (this.$refs.onlineHeader.offsetHeight || 0) +
                (this.$refs.onlineInput.offsetHeight || 0); 
                window.scrollTo(0,0) 
            }, 0)
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

    },
    mounted() {
        // content
        this.$nextTick(() => {
            this.authorHeight =
                (this.$refs.onlineHeader.offsetHeight || 0) +
                (this.$refs.onlineInput.offsetHeight || 0);
            this.headerHeight = (this.$refs.onlineHeader.offsetHeight || 0);
        });
        const that = this;
        //绑定enter发送
        window.addEventListener('keydown', (e) => {
            let { keyCode } = e;
            if (keyCode === 13) {
                that.messageHandler();
            }
        })

    },
}