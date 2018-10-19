<template>
    <div class="box-card message-card">
        <div id="messageWrap">
            <div slot="header" class="header clearfix">
                <span class="title" v-show="verifyResult === true">您的邮箱激活成功!!</span>
                <span class="title" v-show="verifyResult === false">您的邮箱激活失败!!</span>
                <span class="title" v-show="verifyResult === ''">您的邮箱正在验证中，请稍等～</span>
            </div>
            <div class="text item">
                <el-form class="demo-ruleForm">
                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="login()" id="commentBtn" v-show="verifyResult === true">登录</el-button>
                        <el-button type="info" id="commentBtn" v-show="verifyResult === ''" disabled loading>验证中</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                verifyResult:''
            };
        },
        methods: {
            login() {
                this.$router.push('/login');
            }
        },
        mounted: function () {
            let _this = this;
            this.$post('/auth/validate-email', {emailCode:this.$route.params.code})
                .then(response => {
                    if(response.code == 1){
                        _this.verifyResult = true;
                    }else{
                        _this.verifyResult = false;
                    }
                });
        }
    }
</script>
<style scoped>
    .header{
        margin-bottom: 30px;
    }
    .title{
        color: #000;
        font-size: 18px;
    }
    .message-card{
        text-align: left !important;
        width: auto !important;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    #messageWrap{
        margin-bottom: 50px;
    }
    #commentBtn{
        width: 100%;
    }
</style>