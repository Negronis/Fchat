export default {
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
        leftHandlerClick() { },
        rightHandlerClick() { },
        messageHandler() {
            let { sendMessage } = this;
            if (sendMessage) this.$refs.sendMessage();
            else {
                console.log(123);
            }
        },
        controlRow() {
            let tex = this.$refs.msgInput;
            let ChiReg = /[\u4e00-\u9fa5]/;
            let values = tex.value.split('');
            let addNum = 0;
            values.forEach((e) => {
                if (ChiReg.test(e)) {
                    addNum += 2;
                } else {
                    addNum += 1;
                }
            })
            if (this.controlRows < 3 && addNum != 0) {
                this.controlRows = Math.ceil(addNum / 24);
            }
            if (this.controlRows >= 3  && addNum) {
                this.controlRows = Math.ceil(addNum / 24) > 3 ? 3 : Math.ceil(addNum / 24);
            } 
            if(addNum == 0){
                this.controlRows = 1;
            } 
        }
    },
    mounted() {
        // content
        this.$nextTick(() => {
            this.authorHeight =
                (document.getElementById("onlineHeader").offsetHeight || 0) +
                (document.getElementById("onlineInput").offsetHeight || 0);
        });
    },
}