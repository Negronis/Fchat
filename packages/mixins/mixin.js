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
                ";background:" +
                contentBg || "#f5f5f5";
            return retObj;
        },
        // input

        // pop
    },
    methods: {
        // input
        // 重计算高度
        resizeInputHeight() {
            // this.authorHeight =
            //     (this.$refs.onlineHeader.offsetHeight || 0) +
            //     (this.$refs.onlineInput.offsetHeight || 0);
        },
        // 重置输入
        initInput() {
            this.messageString = "";
            this.controlRows = 1;
            setTimeout(() => {
                this.resizeInputHeight();
            }, 0)
        },
        // 方法可定 通过this.$ref.emit()调用
        leftHandlerClick() {

        },
        rightHandlerClick() { },
        messageHandler() {
            let tex = this.$refs.msgInput;
            FChat.addMessage(tex.value,'left');
            this.initInput();
        },
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
                // 换行相应
                if (e.indexOf('\n') != -1) {
                    addNum = addNum + cols;
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

            setTimeout(() => {
                this.resizeInputHeight();
            }, 0)
        }
    },
    mounted() {
        // content
        this.$nextTick(() => {
            this.authorHeight =
                (this.$refs.onlineHeader.offsetHeight || 0) +
                (this.$refs.onlineInput.offsetHeight || 0);
        });
    },
}